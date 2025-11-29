'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

const Footer = () => {
  const params = useParams();
  const currentYear = new Date().getFullYear();
  const lang = (params?.lang as string) || 'en';

  const content = {
    en: {
      standWithUkraine: "We stand with Ukraine.",
      donateText: "You can support Ukraine by donating to this",
      fundName: "trustworthy fund",
      followUs: "Follow us on",
      rights: "Ukrainian Writers' Space. All rights reserved."
    },
    uk: {
      standWithUkraine: "Ми з України.",
      donateText: "Підтримайте Україну, зробивши пожертву в цей",
      fundName: "надійний фонд",
      followUs: "Слідкуйте за нами в",
      rights: "Ukrainian Writers' Space. Усі права застережено."
    }
  };

  const t = content[lang as keyof typeof content] || content.en;

  return (
    <footer className="bg-card border-t border-border-color mt-12 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          
          {/* Support Ukraine Section */}
          <div className="space-y-2">
            <p className="text-text-primary font-medium">
              {t.standWithUkraine}
            </p>
            <p className="text-text-secondary">
              {t.donateText}{' '}
              <a 
                href="https://savelife.in.ua/en/" 
                target="_blank" 
                rel="noreferrer noopener"
                className="text-primary hover:text-primary-dark underline underline-offset-4 decoration-1 transition-colors"
              >
                {t.fundName}
              </a>.
            </p>
          </div>

          {/* Social Links */}
          <div>
            <p className="text-text-secondary">
              {t.followUs}{' '}
              <a 
                href="https://t.me/uawriters" 
                target="_blank" 
                rel="noreferrer noopener"
                className="text-primary hover:text-primary-dark underline underline-offset-4 decoration-1 transition-colors"
              >
                Telegram
              </a>.
            </p>
          </div>

          {/* Copyright */}
          <div className="pt-6 text-sm text-text-secondary opacity-75">
            <p>© {currentYear} {t.rights}</p>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;