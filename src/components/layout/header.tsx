"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/admissions", label: "Admissions" },
  { href: "/academics", label: "Academics" },
  { href: "/research", label: "Research" },
  { href: "/campus-life", label: "Campus Life" },
  { href: "/international", label: "International" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

const roleRoutes: Record<string, string> = {
  ADMIN: "/admin",
  EDITOR: "/editor",
  TEACHER: "/teacher",
  STUDENT: "/portal",
};

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="border-b">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4">
        <Link href="/" className="font-bold text-lg">
          Tiangong University
        </Link>
        <nav className="flex items-center gap-4 flex-wrap text-sm">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          {session ? (
            <>
              <Link href={roleRoutes[session.user.role] ?? "/"}>Dashboard</Link>
              <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}