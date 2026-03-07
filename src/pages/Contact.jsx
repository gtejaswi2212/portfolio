import { ArrowUpRight, Github, Linkedin, Loader2, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/button';
import { socialLinks } from '../data/socialLinks';

const contactItems = [
  { label: 'Email', href: socialLinks.email, icon: Mail },
  { label: 'LinkedIn', href: socialLinks.linkedin, icon: Linkedin },
  { label: 'GitHub', href: socialLinks.github, icon: Github },
];

const inputClasses =
  'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20';

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [message, setMessage] = useState('');
  const formspreeEndpoint = socialLinks.formspreeFormId
    ? `https://formspree.io/f/${socialLinks.formspreeFormId}`
    : null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formspreeEndpoint) {
      setMessage('Add your Formspree form ID in src/data/socialLinks.js to receive messages.');
      setStatus('error');
      return;
    }
    setStatus('sending');
    setMessage('');
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        setMessage('Thanks! Your message has been sent.');
        form.reset();
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again or email me directly.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again or email me directly.');
    }
  }

  return (
    <PageWrapper>
      <section className="container-shell py-20">
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-semibold sm:text-5xl">
          Contact
        </motion.h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        Interested in collaborating with teams building intelligent systems. Open to roles in AI/ML Engineering , and Data Science/Analyst.
        </p>
      </section>

      <section className="container-shell pb-20">
        <div className="grid gap-8 rounded-3xl border border-border bg-card/70 p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Send a message</h2>
              <p className="mt-2 text-muted-foreground">
                Fill out the form and I’ll get back to you as soon as I can.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className={inputClasses}
                  disabled={status === 'sending'}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className={inputClasses}
                  disabled={status === 'sending'}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Your message..."
                  className={`${inputClasses} resize-y min-h-[100px]`}
                  disabled={status === 'sending'}
                />
              </div>
              {message ? (
                <p className={`text-sm ${status === 'error' ? 'text-red-600 dark:text-red-400' : 'text-primary'}`}>{message}</p>
              ) : null}
              <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === 'sending'}>
                {status === 'sending' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send message'
                )}
              </Button>
            </form>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Let’s connect</h2>
            <p className="text-muted-foreground">
              I am interested in opportunities where I can contribute to production ML systems, retrieval architectures,
              and scalable data platforms with measurable impact.
            </p>
            <p className="text-sm text-muted-foreground">
              If your team is hiring for AI, machine learning, or data engineering roles, I’d be glad to connect.
            </p>
            <div className="space-y-3 pt-2">
              {contactItems.map((item) => (
                <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="block cursor-hover">
                  <Button className="w-full justify-between" size="lg" variant={item.label === 'Email' ? 'default' : 'secondary'}>
                    <span className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
