import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border-color mt-12 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          
          {/* Support Ukraine Section */}
          <div className="space-y-2">
            <p className="text-text-primary font-medium">
              We stand with Ukraine.
            </p>
            <p className="text-text-secondary">
              You can support Ukraine by donating to this{' '}
              <a 
                href="https://savelife.in.ua/en/" 
                target="_blank" 
                rel="noreferrer noopener"
                className="text-primary hover:text-primary-dark underline underline-offset-4 decoration-1 transition-colors"
              >
                trustworthy fund
              </a>.
            </p>
          </div>

          {/* Social Links */}
          <div>
            <p className="text-text-secondary">
              Follow us on{' '}
              <a 
                href="https://t.me/+VpNHhFrInNOeWkDD" 
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
            <p>© {currentYear} Ukrainian Writers&apos; Space. All rights reserved.</p>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;