const Footer = () => {
  const links = [
    { label: "Photography", href: "#photography" },
    { label: "Videography", href: "#videography" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="border-t border-border">
      <div className="accent-line" />
      <div className="container-max section-padding py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-heading font-bold text-lg text-foreground">
              OPAL<span className="text-primary"> Media</span>
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              © {new Date().getFullYear()} OPAL Media. All rights reserved.
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
