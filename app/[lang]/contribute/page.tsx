'use client';

import { useState } from 'react';

export default function Contribute({ params: { lang } }: { params: { lang: string } }) {
  const [status, setStatus] = useState<string | null>(null);
  
  // Content dictionaries
  const content = {
    en: {
      title: "Contribute",
      intro: "We accept original articles on technical writing, UX writing, API documentation, and related tools. Share your expertise with the Ukrainian community!",
      successTitle: "Thank you!",
      successMessage: "We have received your submission and will be in touch shortly.",
      error: "Something went wrong. Please try again later.",
      labels: {
        name: "Your Name",
        namePlaceholder: "Ivan Franko",
        email: "Email Address",
        emailPlaceholder: "ivan@example.com",
        topic: "Article Topic / Title",
        topicPlaceholder: "e.g., Getting Started with Docs-as-Code",
        message: "Short Description or Link to Draft",
        messagePlaceholder: "Tell us briefly about your article or paste a link to a Google Doc/Gist...",
        submit: "Send Proposal",
        botLabel: "Don’t fill this out if you're human:"
      }
    },
    uk: {
      title: "Запропонуйте статтю",
      intro: "Маєте ідею для статті? Ми будемо раді її почути! Заповніть форму нижче, щоб зв'язатися з нами.",
      successTitle: "Дякуємо!",
      successMessage: "Ми отримали вашу пропозицію і скоро зв'яжемося з вами.",
      error: "Щось пішло не так. Будь ласка, спробуйте пізніше.",
      labels: {
        name: "Ваше ім'я",
        namePlaceholder: "Іван Франко",
        email: "Електронна пошта",
        emailPlaceholder: "ivan@example.com",
        topic: "Тема статті / Заголовок",
        topicPlaceholder: "напр., Початок роботи з Docs-as-Code",
        message: "Короткий опис або посилання на матеріал",
        messagePlaceholder: "Розкажіть коротко про вашу статтю або вставте посилання на Google Doc/Gist...",
        submit: "Надіслати пропозицію",
        botLabel: "Не заповнюйте це, якщо ви людина:"
      }
    }
  };

  const t = lang === 'uk' ? content.uk : content.en;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
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
        {t.title}
      </h1>

      <div className="prose prose-lg max-w-none text-text-secondary mb-8">
        <p>{t.intro}</p>
      </div>

      <div className="bg-card p-8 rounded-xl shadow-sm border border-border-color">
        {status === 'success' ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">{t.successTitle} </strong>
            <span className="block sm:inline">{t.successMessage}</span>
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
            <input type="hidden" name="form-name" value="contribute" />
            <div className="hidden">
              <label>
                {t.labels.botLabel} <input name="bot-field" />
              </label>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                {t.labels.name}
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="w-full px-4 py-2 rounded-md border border-border-color bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder={t.labels.namePlaceholder}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                {t.labels.email}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full px-4 py-2 rounded-md border border-border-color bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder={t.labels.emailPlaceholder}
              />
            </div>

            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-text-primary mb-2">
                {t.labels.topic}
              </label>
              <input
                type="text"
                name="topic"
                id="topic"
                required
                className="w-full px-4 py-2 rounded-md border border-border-color bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder={t.labels.topicPlaceholder}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                {t.labels.message}
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                required
                className="w-full px-4 py-2 rounded-md border border-border-color bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                placeholder={t.labels.messagePlaceholder}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-md transition-colors duration-200"
            >
              {t.labels.submit}
            </button>

            {status === 'error' && (
              <p className="text-red-600 text-sm mt-2">
                {t.error}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}