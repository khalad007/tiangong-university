"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { GraduationCap, Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
const links = [
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/research", label: "Research" },
  { href: "/campus-life", label: "Campus Life" },
  { href: "/international", label: "International" },
];
const roleRoutes: Record<string, string> = {
  ADMIN: "/admin",
  EDITOR: "/editor",
  TEACHER: "/teacher",
  STUDENT: "/portal",
};
export function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="relative z-30 bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:p-3"
      >
        Skip to content
      </a>
      <div className="border-b bg-surface">
        <div className="home-container flex h-8 items-center justify-between text-[10px] text-muted-foreground">
          <span className="hidden sm:inline">
            A tradition of excellence. A spirit of innovation.
          </span>
          <div className="flex items-center gap-5">
            <Link href="/news" className="hidden hover:text-primary sm:block">
              News & Events
            </Link>
            <Link
              href="/contact"
              className="hidden hover:text-primary sm:block"
            >
              Contact
            </Link>
            {session ? (
              <>
                <Link href={roleRoutes[session.user.role] ?? "/"}>
                  Dashboard
                </Link>
                <button onClick={() => signOut({ callbackUrl: "/" })}>
                  Sign out
                </button>
              </>
            ) : (
              <Link href="/login">Student Portal ↗</Link>
            )}
          </div>
        </div>
      </div>
      <div className="home-container flex h-23 items-center justify-between gap-5">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-full border-2 border-primary text-primary">
            <GraduationCap size={27} />
          </span>
          <span>
            <span className="block font-serif text-xl font-bold tracking-tight text-brand-dark">
              TIANGONG
            </span>
            <span className="block text-[10px] tracking-[0.28em] text-primary">
              UNIVERSITY
            </span>
          </span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 xl:flex"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="text-xs font-medium hover:text-primary aria-[current=page]:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button
            render={<Link href="/admissions" />}
            className="hidden h-10 rounded-md px-4 text-xs sm:inline-flex"
          >
            Apply Now
            <ArrowUpRight className="ml-2" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
            className="xl:hidden"
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full grid border-b bg-background px-6 py-4 shadow-lg xl:hidden"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded p-3 text-sm hover:bg-brand-tint"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admissions"
            onClick={() => setOpen(false)}
            className="p-3 font-semibold text-primary"
          >
            Apply Now ↗
          </Link>
        </nav>
      )}
    </header>
  );
}
