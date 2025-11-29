'use client';

import { useState } from 'react';

export default function Contribute() {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // We submit to /__forms.html to bypass Next.js middleware/SSR and hit Netlify's form handler directly
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });
      setStatus('success');
      form.reset();
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-text-primary border-b border-border-color pb-4">
        Contribute
      </h1>

      <div className="prose prose-lg max-w-none text-text-secondary mb-8">
        <p>
          We accept original articles on technical writing, UX writing, API documentation, and related tools.
          Share your expertise with the Ukrainian community!
        </p>
      </div>

      <div className="bg-card p-8 rounded-xl shadow-sm border border-border-color">
        {status === 'success' ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Thank you! </strong>
            <span className="block sm:inline">We have received your submission and will be in touch shortly.</span>
          </div>
        ) : (
          <form
            name="contribute"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Hidden fields for Netlify Forms */}
            <input type="hidden" name="form-name" value="contribute" />
            <div className="hidden">
              <label>
                Don’t fill this out if you're human: <input name="bot-field" />
              </label>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="w-full px-4 py-2 rounded-md border border-border-color bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="Ivan Franko"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full px-4 py-2 rounded-md border border-border-color bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="ivan@example.com"
              />
            </div>

            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-text-primary mb-2">
                Article Topic / Title
              </label>
              <input
                type="text"
                name="topic"
                id="topic"
                required
                className="w-full px-4 py-2 rounded-md border border-border-color bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="e.g., Getting Started with Docs-as-Code"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                Short Description or Link to Draft
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                required
                className="w-full px-4 py-2 rounded-md border border-border-color bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                placeholder="Tell us briefly about your article or paste a link to a Google Doc/Gist..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-md transition-colors duration-200"
            >
              Send Proposal
            </button>

            {status === 'error' && (
              <p className="text-red-600 text-sm mt-2">
                Something went wrong. Please try again later.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}