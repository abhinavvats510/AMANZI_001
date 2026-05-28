import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, CheckCircle2, ArrowRight, Phone, MapPin } from 'lucide-react';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/enquiry.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', company: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-white py-16 relative z-10 pointer-events-auto">
      <div className="section-container !py-0 grid lg:grid-cols-2 gap-10 relative z-20 pointer-events-auto">
        <div className="relative z-30 pointer-events-auto flex flex-col">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Let’s Start a Conversation.</h2>
          <p className="text-muted text-base mb-10 max-w-2xl">
            Whether you're looking to scale a team or secure a visionary leader, we're ready to help you navigate the talent landscape.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-50 pointer-events-auto isolate">
            <a
              href="mailto:info@amanzigroup.co.in"
              className="flex items-center gap-4 group cursor-pointer hover:no-underline"
            >
              <div className="w-12 h-12 bg-surface rounded-full flex-shrink-0 flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-0.5">Email Us</div>
                <div className="text-sm font-bold text-accent group-hover:text-accent/80 group-hover:underline transition-colors duration-300 truncate">info@amanzigroup.co.in</div>
              </div>
            </a>
 
            <a
              href="tel:+919773772609"
              className="flex items-center gap-4 group cursor-pointer hover:no-underline"
            >
              <div className="w-12 h-12 bg-surface rounded-full flex-shrink-0 flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-0.5">Call Us</div>
                <div className="text-sm font-bold text-accent group-hover:text-accent/80 group-hover:underline transition-colors duration-300 truncate">9773772609</div>
              </div>
            </a>
 
            <a
              href="https://www.linkedin.com/company/3787715/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group cursor-pointer hover:no-underline"
            >
              <div className="w-12 h-12 bg-surface rounded-full flex-shrink-0 flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                <Linkedin className="w-5 h-5 text-accent" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-0.5">Follow Us</div>
                <div className="text-sm font-bold text-accent group-hover:text-accent/80 group-hover:underline transition-colors duration-300 truncate">Connect with Us on LinkedIn</div>
              </div>
            </a>
 
            <a
              href="https://maps.google.com/?q=4U+Coworks+Meenakshi+Garden+New+Delhi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 group cursor-pointer hover:no-underline"
            >
              <div className="w-12 h-12 bg-surface rounded-full flex-shrink-0 flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300 mt-1">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-0.5">Visit Us</div>
                <div className="text-sm font-medium text-accent group-hover:text-accent/80 group-hover:underline transition-colors duration-300 leading-snug">
                  Amanzi Technologies , Gate no. 4, WZ-104, Second & Third Floor, above IDFC Bank, near Subhash Nagar metro station, Meenakshi Garden, New Delhi, Delhi 110018
                </div>
              </div>
            </a>
          </div>

          {/* Google Map */}
          <div className="mt-8 rounded-[2rem] overflow-hidden border border-black/5 shadow-lg h-72 relative group">
            {/* Address Overlay (Covers Google's Open in Maps) */}
            <a
              href="https://maps.google.com/?q=4U+Coworks+Meenakshi+Garden+New+Delhi"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-0 left-0 bg-white px-4 py-3 sm:px-5 sm:py-4 z-10 pointer-events-auto border-b border-r border-black/5 shadow-sm rounded-br-2xl hover:bg-slate-50/90 transition-colors duration-300 block hover:no-underline"
            >
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Office Address</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-primary max-w-[200px] sm:max-w-[260px] leading-tight">
                Amanzi Technologies , Gate no. 4, WZ-104, Second & Third Floor, above IDFC Bank, near Subhash Nagar metro station, Meenakshi Garden, New Delhi, Delhi 110018
              </p>
            </a>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.6577629175504!2d77.10198957533588!3d28.64001757566059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03a24822ea11%3A0x46544166e7e61ff9!2s4U%20Coworks!5e0!3m2!1sen!2sin!4v1779780027528!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="pointer-events-auto"
            ></iframe>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-surface p-6 md:p-8 rounded-[2rem] border border-black/5"
        >
          {isSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Message Received</h3>
              <p className="text-muted/60">We'll get back to you within 24 business hours.</p>
            </div>
          ) : (
            <form id="contact-form" className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted">Full Name</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted">Email Address</label>
                  <input
                    required
                    type="email"
                    className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted">Company</label>
                <input
                  type="text"
                  className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted">Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Tell us about your hiring needs..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <button
                disabled={isSubmitting}
                className="btn-primary w-full justify-center py-5 text-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'} <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
