import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

async function check() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: 3306
    });

    try {
        const [jobsCols] = await pool.query('DESCRIBE jobs');
        const [adminsCols] = await pool.query('DESCRIBE admins');
        const [admins] = await pool.query('SELECT email FROM admins');

        const output = {
            jobs: jobsCols,
            adminsSchema: adminsCols,
            adminsEmails: admins
        };

        fs.writeFileSync('db_report.json', JSON.stringify(output, null, 2));
    } catch (e) {
        fs.writeFileSync('db_report.json', JSON.stringify({ error: e.message }, null, 2));
    } finally {
        await pool.end();
    }
}

check();
