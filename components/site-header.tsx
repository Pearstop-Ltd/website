"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { mainNavLinks, solutionLinks, siteConfig } from "@/lib/site";

const LOCALES = [
  { code: "en", label: "EN" },
  { code: "nl", label: "NL" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/" || pathname === "";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(next: string) {
    setOpen(false);
    // Set NEXT_LOCALE cookie so middleware respects explicit user choice over Accept-Language
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;SameSite=Lax`;
    startTransition(() => {
      let path = pathname;
      for (const { code } of LOCALES) {
        if (path.startsWith(`/${code}/`)) { path = path.slice(code.length + 1); break; }
        if (path === `/${code}`) { path = "/"; break; }
      }
      const target = next === "en" ? path || "/" : `/${next}${path === "/" ? "" : path}`;
      router.push(target);
    });
  }

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        type="button"
        className="lang-switcher-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label="Switch language"
        aria-expanded={open}
      >
        {locale.toUpperCase()}
        <span aria-hidden="true" style={{ marginLeft: 3, fontSize: "0.6em", opacity: 0.7 }}>▾</span>
      </button>
      {open && (
        <ul className="lang-switcher-menu" role="listbox" aria-label="Select language">
          {LOCALES.map(({ code, label }) => (
            <li key={code} role="option" aria-selected={code === locale}>
              <button
                type="button"
                onClick={() => switchLocale(code)}
                className={code === locale ? "active" : ""}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const NAV_LABEL_KEYS: Record<string, string> = {
  "/solutions": "solutions",
  "/industries": "industries",
  "/about-us": "about",
  "/blog": "blog",
  "/cases": "cases",
};

const SOLUTION_NAV_KEYS: Record<string, string> = {
  "/procurement-data-quality": "procurementDataQuality",
  "/asset-data-management": "assetDataManagement",
  "/data-quality": "dataQuality",
  "/fabric": "fabricReady",
  "/ai-readiness": "aiReadiness",
  "/unspsc": "unspsc",
};

export function SiteHeader() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Header");
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const solutionsCloseTimer = useRef<number | null>(null);

  const prefix = locale === "en" ? "" : `/${locale}`;

  const clearSolutionsCloseTimer = () => {
    if (solutionsCloseTimer.current !== null) {
      window.clearTimeout(solutionsCloseTimer.current);
      solutionsCloseTimer.current = null;
    }
  };

  useEffect(() => {
    setMenuOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => { clearSolutionsCloseTimer(); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [menuOpen]);

  const closeMenus = () => {
    clearSolutionsCloseTimer();
    setMenuOpen(false);
    setSolutionsOpen(false);
  };

  const openSolutionsMenu = () => {
    clearSolutionsCloseTimer();
    setSolutionsOpen(true);
  };

  const toggleSolutionsMenu = () => {
    clearSolutionsCloseTimer();
    setSolutionsOpen((open) => !open);
  };

  const scheduleSolutionsClose = () => {
    clearSolutionsCloseTimer();
    solutionsCloseTimer.current = window.setTimeout(() => {
      setSolutionsOpen(false);
      solutionsCloseTimer.current = null;
    }, 140);
  };

  return (
    <nav id="site-nav" role="navigation" aria-label="Main navigation">
      <div className="container">
        <div className="nav-inner">
          <Link className="nav-logo" href={`${prefix}/`} aria-label="Pearstop home" onClick={closeMenus}>
            <img className="nav-logo-image" src={siteConfig.assets.logo} alt={siteConfig.name} width={160} height={48} />
          </Link>

          <ul className={`nav-menu ${menuOpen ? "open" : ""}`} id="nav-menu">
            <li
              className={`nav-dropdown ${solutionsOpen ? "open" : ""}`}
              onPointerEnter={openSolutionsMenu}
              onPointerLeave={scheduleSolutionsClose}
            >
              <div className="nav-dropdown-header">
                <Link
                  className={`nav-dropdown-toggle ${isActive(pathname, `${prefix}/solutions`) ? "active" : ""}`}
                  href={`${prefix}/solutions`}
                  onClick={closeMenus}
                >
                  {t("solutions")}
                </Link>
                <button
                  type="button"
                  className="nav-dropdown-toggle-btn"
                  onClick={toggleSolutionsMenu}
                  aria-label={solutionsOpen ? t("closeMenu") : t("openMenu")}
                  aria-expanded={solutionsOpen}
                >
                  <span aria-hidden="true">{solutionsOpen ? "×" : "▾"}</span>
                </button>
              </div>
              <ul className="nav-dropdown-menu">
                <li>
                  <Link href={`${prefix}/solutions`} onClick={closeMenus}>
                    {t("allSolutions")}
                  </Link>
                </li>
                {solutionLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={`${prefix}${link.href}`} onClick={closeMenus}>
                      {SOLUTION_NAV_KEYS[link.href] ? t(`nav.${SOLUTION_NAV_KEYS[link.href]}`) : link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {mainNavLinks.slice(1).map((link) => (
              <li key={link.href}>
                <Link
                  className={isActive(pathname, `${prefix}${link.href}`) ? "active" : ""}
                  href={`${prefix}${link.href}`}
                  onClick={closeMenus}
                >
                  {NAV_LABEL_KEYS[link.href] ? t(NAV_LABEL_KEYS[link.href]) : link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={`nav-right ${menuOpen ? "open" : ""}`} id="nav-right">
            <LanguageSwitcher />
            <Link className="btn-pearstop-nav" href={`${prefix}/contact`} onClick={closeMenus}>
              {t("requestDemo")}
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
