"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { mainNavLinks, solutionLinks, siteConfig } from "@/lib/site";

const LOCALES = [
  { code: "en", label: "EN" },
  { code: "nl", label: "NL" },
  { code: "fr", label: "FR" },
  { code: "de", label: "DE" },
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

// Header height in px, must match .nav-inner's min-height in globals.css.
const HEADER_HEIGHT = 68;

export function SiteHeader() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Header");
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const solutionsCloseTimer = useRef<number | null>(null);
  const submenuCloseTimer = useRef<number | null>(null);

  const prefix = locale === "en" ? "" : `/${locale}`;

  // Homepage only: three phases as you scroll down.
  // "video"  - over the hero, before #clients-and-quotes reaches the header
  //            line: a flat solid dark purple (never shows the real hero
  //            video/logos through it).
  // "strip"  - once #clients-and-quotes has reached the header line: the
  //            header paints the *same* gradient as that section, sized to
  //            that section's real height and offset by its current
  //            scroll position (a CSS custom property updated every
  //            frame) - so the header's gradient is always showing
  //            exactly the slice that section's own gradient would show
  //            at that scroll position, "scrolling" in lockstep with it,
  //            without ever revealing the section's actual content (logos)
  //            through a transparent header.
  // "light"  - once #lm-band (the first white section) reaches the header
  //            line: back to the normal light chrome.
  // Not one-time triggers - scrolling back up restores earlier phases too.
  const navRef = useRef<HTMLElement>(null);
  const isHome = pathname === "/" || LOCALES.some(({ code }) => pathname === `/${code}`);
  // /solutions has no hero video to transition off of - it's just always
  // the same flat dark purple as the homepage's "video" phase.
  const isAlwaysDark = pathname === "/solutions" || LOCALES.some(({ code }) => pathname === `/${code}/solutions`);
  const [headerPhase, setHeaderPhase] = useState<"video" | "strip" | "light">(isHome || isAlwaysDark ? "video" : "light");

  useEffect(() => {
    if (isAlwaysDark) {
      setHeaderPhase("video");
      return;
    }
    if (!isHome) {
      setHeaderPhase("light");
      return;
    }
    const lmBand = document.getElementById("lm-band");
    const stripStart = document.getElementById("clients-and-quotes");
    if (!lmBand || !stripStart) {
      setHeaderPhase("light");
      return;
    }
    let ticking = false;
    const update = () => {
      const stripTop = stripStart.getBoundingClientRect().top;
      if (lmBand.getBoundingClientRect().top <= HEADER_HEIGHT) {
        setHeaderPhase("light");
      } else if (stripTop <= HEADER_HEIGHT) {
        setHeaderPhase("strip");
        // Position and size the header's gradient to exactly match
        // #clients-and-quotes's own gradient at this scroll position.
        navRef.current?.style.setProperty("--strip-height", `${stripStart.offsetHeight}px`);
        navRef.current?.style.setProperty("--strip-bg-y", `${stripTop}px`);
      } else {
        setHeaderPhase("video");
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome, isAlwaysDark, pathname]);

  const darkHeader = headerPhase !== "light";

  const clearSolutionsCloseTimer = () => {
    if (solutionsCloseTimer.current !== null) {
      window.clearTimeout(solutionsCloseTimer.current);
      solutionsCloseTimer.current = null;
    }
  };

  useEffect(() => {
    setMenuOpen(false);
    setSolutionsOpen(false);
    setOpenSubmenu(null);
  }, [pathname]);

  useEffect(() => {
    return () => { clearSolutionsCloseTimer(); clearSubmenuCloseTimer(); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [menuOpen]);

  const closeMenus = () => {
    clearSolutionsCloseTimer();
    clearSubmenuCloseTimer();
    setMenuOpen(false);
    setSolutionsOpen(false);
    setOpenSubmenu(null);
  };

  // Hover-intent opening is a desktop-only affordance (mobile relies on the
  // explicit toggle buttons below). Gating on window width, not
  // PointerEvent.pointerType, matters here: a real mouse still fires real
  // "mouse" pointer events at a narrow window width (e.g. someone testing
  // mobile by just resizing their desktop browser, not an actual
  // touchscreen), so pointerType alone can't tell the two cases apart -
  // only the viewport width can, matching the CSS breakpoint below.
  const isDesktopViewport = () =>
    typeof window !== "undefined" && window.matchMedia("(min-width: 992px)").matches;

  const openSolutionsMenu = () => {
    if (!isDesktopViewport()) return;
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

  const clearSubmenuCloseTimer = () => {
    if (submenuCloseTimer.current !== null) {
      window.clearTimeout(submenuCloseTimer.current);
      submenuCloseTimer.current = null;
    }
  };

  const openSubmenuFor = (href: string) => {
    if (!isDesktopViewport()) return;
    clearSubmenuCloseTimer();
    setOpenSubmenu(href);
  };

  const toggleSubmenuFor = (href: string) => {
    clearSubmenuCloseTimer();
    setOpenSubmenu((current) => (current === href ? null : href));
  };

  const scheduleSubmenuClose = () => {
    clearSubmenuCloseTimer();
    submenuCloseTimer.current = window.setTimeout(() => {
      setOpenSubmenu(null);
      submenuCloseTimer.current = null;
    }, 140);
  };

  return (
    <nav
      id="site-nav"
      ref={navRef}
      className={darkHeader ? `header-dark${headerPhase === "video" ? " header-solid-purple" : ""}${headerPhase === "strip" ? " header-strip" : ""}` : ""}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container">
        <div className="nav-inner">
          <Link className="nav-logo" href={`${prefix}/`} aria-label="Pearstop home" onClick={closeMenus}>
            <img
              className="nav-logo-image"
              src={darkHeader ? siteConfig.assets.logoInverse : siteConfig.assets.logo}
              alt={siteConfig.name}
              width={160}
              height={48}
            />
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
                {solutionLinks.map((link) =>
                  link.children && link.children.length > 0 ? (
                    <li
                      key={link.href}
                      className={`nav-subitem-wrap ${openSubmenu === link.href ? "open" : ""}`}
                      onPointerEnter={() => openSubmenuFor(link.href)}
                      onPointerLeave={scheduleSubmenuClose}
                    >
                      <div className="nav-subitem-row">
                        <Link href={`${prefix}${link.href}`} onClick={closeMenus}>
                          {SOLUTION_NAV_KEYS[link.href] ? t(`nav.${SOLUTION_NAV_KEYS[link.href]}`) : link.label}
                        </Link>
                        <button
                          type="button"
                          className="nav-subitem-toggle"
                          onClick={() => toggleSubmenuFor(link.href)}
                          aria-label={`${openSubmenu === link.href ? t("closeMenu") : t("openMenu")}: ${link.label}`}
                          aria-expanded={openSubmenu === link.href}
                        >
                          <span aria-hidden="true">›</span>
                        </button>
                      </div>
                      <ul className="nav-submenu">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link href={`${prefix}${child.href}`} onClick={closeMenus}>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li key={link.href}>
                      <Link href={`${prefix}${link.href}`} onClick={closeMenus}>
                        {SOLUTION_NAV_KEYS[link.href] ? t(`nav.${SOLUTION_NAV_KEYS[link.href]}`) : link.label}
                      </Link>
                    </li>
                  )
                )}
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
            <Link className="btn-pearstop-nav" href={`${prefix}/book-a-demo`} onClick={closeMenus}>
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
