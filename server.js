import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import multer from 'multer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL Connection Pool (More stable for cPanel)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000
});

const db = pool.promise();

// Verification and Table Setup - Mapped to existing cPanel table structure
async function setupDB() {
    try {
        const connection = await pool.promise().getConnection();
        console.log("✅ Connected to cPanel MySQL database via Pool");
        connection.release();

        // Check if jobs table exists and has current structure
        // Table 'jobs' in cPanel has: id, job_title, company_name, location, job_type, experience_required, salary, skills_required, job_description, posted_date, application_deadline

        // Ensure admins table exists
        await db.query(`
            CREATE TABLE IF NOT EXISTS admins (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `);

        // Seed initial admin if none exists (admin@amanzigrp.com / admin123)
        const [admins] = await db.query('SELECT * FROM admins WHERE email = ?', ['admin@amanzigrp.com']);
        if (admins.length === 0) {
            await db.query('INSERT INTO admins (email, password) VALUES (?, ?)', ['admin@amanzigrp.com', 'admin123']);
            console.log("👤 Default admin account seeded.");
        }

    } catch (err) {
        console.error("❌ MySQL initialization error:", err);
    }
}

setupDB();

// API Routes

// Admin Login
app.post('/api/admin/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM admins WHERE email = ? AND password = ?', [email, password]);
        if (rows.length > 0) {
            res.json({ success: true, user: { email: rows[0].email } });
        } else {
            res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin Registration (Create Admin)
app.post('/api/admin/create', async (req, res) => {
    const { email, password } = req.body;
    try {
        await db.query('INSERT INTO admins (email, password) VALUES (?, ?)', [email, password]);
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ error: 'Email already exists or invalid data' });
    }
});

// GET all jobs
app.get('/api/jobs', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM jobs ORDER BY id DESC');
        // Map backend names to frontend expected names based on REAL cPanel structure
        const mappedResults = results.map(job => ({
            id: job.id.toString(),
            title: job.job_title,
            company: job.company_name,
            description: job.job_description || '',
            location: job.location || '',
            mode: job.job_type || 'Remote',
            date: job.posted_date ? new Date(job.posted_date).toLocaleDateString() : new Date().toLocaleDateString()
        }));
        res.json(mappedResults);
    } catch (err) {
        console.error("Error fetching jobs:", err);
        res.status(500).json({ error: err.message });
    }
});

// API endpoint for general enquiries (Contact Form)
app.post('/api/enquiry', async (req, res) => {
    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const mailOptions = {
            from: `"${name}" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL || 'info@amanzigrp.com',
            replyTo: email,
            subject: `New Business Enquiry: ${name} (${company || 'No Company'})`,
            text: `
                New business enquiry received:
                
                Name: ${name}
                Email: ${email}
                Company: ${company || 'N/A'}
                
                Message:
                ${message}
            `,
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Enquiry sent successfully' });
    } catch (err) {
        console.error("Error sending enquiry email:", err);
        res.status(500).json({ error: 'Failed to send enquiry', details: err.message });
    }
});

// ADD job
app.post('/api/jobs', async (req, res) => {
    const { title, company, description, location, mode } = req.body;
    // Mapped fields to REAL cPanel table structure:
    // job_title, company_name, job_description, location, job_type
    try {
        const sql = `
            INSERT INTO jobs (job_title, company_name, job_description, location, job_type)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(sql, [title, company, description, location, mode]);
        res.json({
            success: true,
            id: result.insertId
        });
    } catch (err) {
        console.error("Error adding job:", err);
        res.status(500).json({ error: err.message });
    }
});

// Multer setup for file uploads (resume)
const storage = multer.memoryStorage();
const upload = multer({
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    },
});

// Configure Nodemailer with cPanel SMTP
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// API endpoint for job applications
app.post('/api/apply', upload.single('resume'), async (req, res) => {
    const { name, email, message, jobTitle } = req.body;
    const resume = req.file;

    if (!name || !email || !jobTitle) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Prepare email options
        const mailOptions = {
            from: `"${name}" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL || 'info@amanzigrp.com', // Where applications are sent
            replyTo: email,
            subject: `New Job Application: ${jobTitle} - ${name}`,
            text: `
                New application received for: ${jobTitle}
                
                Name: ${name}
                Email: ${email}
                
                Message:
                ${message || 'No message provided.'}
            `,
            attachments: resume ? [
                {
                    filename: resume.originalname,
                    content: resume.buffer,
                }
            ] : [],
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'Application sent successfully' });
    } catch (err) {
        console.error("Error sending application email:", err);
        res.status(500).json({ error: 'Failed to send application', details: err.message });
    }
});

// DELETE job
app.delete('/api/jobs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM jobs WHERE id = ?', [id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Serve frontend if production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});