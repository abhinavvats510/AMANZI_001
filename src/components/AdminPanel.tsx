import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    Briefcase,
    X,
    LogOut,
    Trash2,
    Edit,
    Plus,
    CheckCircle2,
    AlertCircle,
    UserPlus,
    Key
} from 'lucide-react';

export interface Job {
    id: string;
    title: string;
    company?: string;
    description: string;
    location: string;
    mode: string;
    date: string;
}

export const AdminPanel = ({ jobs, setJobs }: { jobs: Job[], setJobs: React.Dispatch<React.SetStateAction<Job[]>> }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('admin_session') === 'active');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAddingJob, setIsAddingJob] = useState(false);
    const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);

    const [newJob, setNewJob] = useState({
        title: '',
        company: 'Amanzi Group',
        description: '',
        location: '',
        mode: 'Remote'
    });

    const [newAdmin, setNewAdmin] = useState({
        email: '',
        password: ''
    });

    const [adminMsg, setAdminMsg] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setIsLoggedIn(true);
                localStorage.setItem('admin_session', 'active');
                setError('');
            } else {
                setError(data.error || 'Invalid admin credentials.');
            }
        } catch (err) {
            setError('Server connection failed. Is the backend running?');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('admin_session');
    };

    const handleCreateAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        setAdminMsg('');
        try {
            const res = await fetch('/api/admin/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAdmin)
            });
            if (res.ok) {
                setAdminMsg('Admin created successfully!');
                setNewAdmin({ email: '', password: '' });
                setTimeout(() => setIsCreatingAdmin(false), 2000);
            } else {
                setAdminMsg('Failed to create admin. Email might exist.');
            }
        } catch (err) {
            setAdminMsg('Error connecting to server.');
        }
    };

    const handleAddJob = async (e: React.FormEvent) => {
        e.preventDefault();
        const jobData = {
            ...newJob,
            date: new Date().toLocaleDateString()
        };

        try {
            const res = await fetch('/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jobData)
            });
            const data = await res.json();
            if (res.ok) {
                const job: Job = {
                    id: data.id.toString(),
                    ...jobData
                };
                setJobs([job, ...jobs]);
                setIsAddingJob(false);
                setNewJob({ title: '', company: 'Amanzi Group', description: '', location: '', mode: 'Remote' });
            }
        } catch (err) {
            console.error('Error adding job:', err);
        }
    };

    const deleteJob = async (id: string) => {
        try {
            const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setJobs(jobs.filter(j => j.id !== id));
            }
        } catch (err) {
            console.error('Error deleting job:', err);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/5 border border-white/10 p-8 rounded-[2rem] max-w-md w-full backdrop-blur-xl"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="text-white w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-display font-medium text-white">Admin Login</h2>
                        <p className="text-white/40 text-sm mt-2">Database-verified access only</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="Admin Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-accent text-sm"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Admin Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-accent text-sm"
                                required
                            />
                            {error && <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest mt-2 flex items-center gap-2 px-2">
                                <AlertCircle className="w-3 h-3" /> {error}
                            </p>}
                        </div>

                        <button className="w-full bg-accent text-white py-5 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-neon-blue transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)] mt-6">
                            Accredited Access
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-bg p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tighter">
                            Admin <span className="text-accent underline decoration-accent/10 underline-offset-8 italic">Dashboard</span>
                        </h2>
                        <p className="text-white/40 mt-2">Connected to panel {process.env.DB_NAME || ''}</p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => setIsAddingJob(true)}
                            className="bg-accent text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-neon-blue transition-all"
                        >
                            <Plus className="w-4 h-4" /> Create Opening
                        </button>
                        <button
                            onClick={() => setIsCreatingAdmin(true)}
                            className="bg-white/10 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-white/20 transition-all border border-white/10"
                        >
                            <UserPlus className="w-4 h-4" /> Add Admin
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-white/5 border border-white/10 text-white/70 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-red-500/10 hover:text-red-500 transition-all"
                        >
                            <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                    </div>
                </div>

                {/* Jobs List */}
                <div className="grid grid-cols-1 gap-6">
                    {jobs.length === 0 ? (
                        <div className="bg-white/5 border border-white/10 border-dashed rounded-[2rem] py-24 text-center">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-50">
                                <Briefcase className="text-white w-8 h-8" />
                            </div>
                            <p className="text-white/30 text-lg">No active openings published yet.</p>
                            <button
                                onClick={() => setIsAddingJob(true)}
                                className="text-accent text-xs font-bold uppercase tracking-widest mt-4 hover:underline"
                            >
                                Create your first opening
                            </button>
                        </div>
                    ) : (
                        jobs.map((job) => (
                            <motion.div
                                key={job.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/5 border border-white/10 p-8 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-8 group hover:border-white/20 transition-all"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">Active Mandarin</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{job.date}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
                                    <div className="flex gap-6 text-white/40 text-sm mb-4">
                                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent" /> {job.location}</span>
                                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent" /> {job.mode}</span>
                                        {job.company && <span className="flex items-center gap-1.5 opacity-50">@ {job.company}</span>}
                                    </div>
                                    <p className="text-white/50 text-sm line-clamp-2">{job.description}</p>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => deleteJob(job.id)}
                                        className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/5"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* Add Job Modal */}
            {isAddingJob && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-dark-bg/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#050a10] border border-white/10 p-8 md:p-12 rounded-[3rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-3xl font-display font-medium text-white">Create New Opening</h3>
                            <button
                                onClick={() => setIsAddingJob(false)}
                                className="p-2 bg-white/5 rounded-xl text-white/50 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleAddJob} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Job Title</label>
                                    <input
                                        required
                                        type="text"
                                        value={newJob.title}
                                        onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                                        placeholder="e.g. Senior Data Engineer"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-accent"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Company</label>
                                    <input
                                        required
                                        type="text"
                                        value={newJob.company}
                                        onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                                        placeholder="Client Name"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-accent"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Location</label>
                                    <input
                                        required
                                        type="text"
                                        value={newJob.location}
                                        onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                                        placeholder="e.g. London, UK"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-accent"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Work Mode</label>
                                    <select
                                        value={newJob.mode}
                                        onChange={(e) => setNewJob({ ...newJob, mode: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-accent appearance-none"
                                    >
                                        <option className="bg-dark-bg">Remote</option>
                                        <option className="bg-dark-bg">Hybrid</option>
                                        <option className="bg-dark-bg">On-site</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Deep Description</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={newJob.description}
                                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                                    placeholder="Strategic impact and role requirements..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-accent resize-none"
                                />
                            </div>

                            <button className="w-full bg-accent text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-neon-blue transition-all mt-4">
                                Create
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* Create Admin Modal */}
            {isCreatingAdmin && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-dark-bg/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#050a10] border border-white/10 p-8 rounded-[3rem] max-w-md w-full"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-display font-medium text-white flex items-center gap-3">
                                <UserPlus className="text-accent" /> New Admin
                            </h3>
                            <button onClick={() => setIsCreatingAdmin(false)} className="text-white/30 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateAdmin} className="space-y-4">
                            <input
                                required
                                type="email"
                                placeholder="Admin Email"
                                value={newAdmin.email}
                                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white text-sm focus:outline-none focus:border-accent"
                            />
                            <input
                                required
                                type="password"
                                placeholder="Access Password"
                                value={newAdmin.password}
                                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white text-sm focus:outline-none focus:border-accent"
                            />
                            {adminMsg && <p className="text-[10px] font-black uppercase text-accent px-2">{adminMsg}</p>}

                            <button className="w-full bg-white text-primary py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-accent hover:text-white transition-all mt-4">
                                Authorize Administrator
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};
