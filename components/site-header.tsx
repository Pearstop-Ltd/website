"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNavLinks, solutionLinks, siteConfig } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenus = () => {
    setMenuOpen(false);
    setSolutionsOpen(false);
  };

  return (
    <nav id="site-nav" role="navigation" aria-label="Main navigation">
      <div className="container">
        <div className="nav-inner">
          <Link className="nav-logo" href="/" aria-label="Pearstop home" onClick={closeMenus}>
            <img className="nav-logo-image" src={siteConfig.assets.logo} alt={siteConfig.name} width={160} height={48} />
          </Link>

          <ul className={`nav-menu ${menuOpen ? "open" : ""}`} id="nav-menu">
            <li className={`nav-dropdown ${solutionsOpen ? "open" : ""}`}>
              <div className="nav-dropdown-header">
                <Link className={`nav-dropdown-toggle ${isActive(pathname, "/solutions") ? "active" : ""}`} href="/solutions" onClick={closeMenus}>
                  Solutions
                </Link>
                <button
                  type="button"
                  className="nav-dropdown-toggle-btn"
                  onClick={() => setSolutionsOpen((open) => !open)}
                  aria-label={solutionsOpen ? "Close solutions submenu" : "Open solutions submenu"}
                  aria-expanded={solutionsOpen}
                >
                  <span aria-hidden="true">{solutionsOpen ? "×" : "▾"}</span>
                </button>
              </div>
              <ul className="nav-dropdown-menu">
                <li>
                  <Link href="/solutions" onClick={closeMenus}>
                    All Solutions
                  </Link>
                </li>
                {solutionLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} onClick={closeMenus}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {mainNavLinks.slice(1).map((link) => (
              <li key={link.href}>
                <Link className={isActive(pathname, link.href) ? "active" : ""} href={link.href} onClick={closeMenus}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={`nav-right ${menuOpen ? "open" : ""}`} id="nav-right">
            <Link className="btn-pearstop-nav" href="/contact" onClick={closeMenus}>
              Request a demo
            </Link>
          </div>

          <button
            className={`nav-hamburger ${menuOpen ? "open" : ""}`}
            id="nav-hamburger"
            aria-label={menuOpen ? "Close navigation" : "Toggle navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}
