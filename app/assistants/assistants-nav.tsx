"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/assistants", label: "Home" },
  { href: "/assistants/about", label: "About" },
  { href: "/assistants/bootcamp", label: "The bootcamp" },
];

export function AssistantsNav() {
  const pathname = usePathname();

  return (
    <nav className="site">
      <Link className="brand" href="/assistants">
        Pearstop
      </Link>
      {LINKS.map((link) => (
        <Link
          key={link.href}
          className={`link ${pathname === link.href ? "on" : ""}`}
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
