"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Dialog } from "@base-ui/react/dialog";
import { GraduationCap, Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
const links = [
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
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
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-primary/10 bg-background/95 backdrop-blur-md">
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
          className="hidden items-center gap-4 xl:flex"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href || pathname.startsWith(`${link.href}/`) ? "page" : undefined}
              className="rounded-md px-1 py-2 text-xs font-medium transition-colors hover:bg-brand-tint hover:text-primary aria-[current=page]:bg-brand-tint aria-[current=page]:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button
            render={<Link href={session ? roleRoutes[session.user.role] ?? "/" : "/login"} />}
            className="hidden h-10 rounded-md px-4 text-xs sm:inline-flex"
          >
            {session ? "Dashboard" : "Login"}
            <ArrowUpRight className="ml-2" />
          </Button>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger render={<Button variant="ghost" size="icon" className="xl:hidden" />} aria-label="Open navigation"><Menu /></Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop className="fixed inset-0 z-40 bg-brand-dark/50 xl:hidden" />
              <Dialog.Popup className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto bg-background p-6 shadow-xl xl:hidden">
                <div className="flex items-center justify-between border-b pb-5"><Dialog.Title className="font-serif text-xl font-semibold text-primary">Tiangong University</Dialog.Title><Dialog.Close render={<Button variant="ghost" size="icon" />} aria-label="Close navigation"><X /></Dialog.Close></div>
                <Dialog.Description className="sr-only">University navigation and account links</Dialog.Description>
                <nav aria-label="Mobile navigation" className="mt-5 grid gap-1">{links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={pathname === link.href || pathname.startsWith(link.href + "/") ? "page" : undefined} className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-brand-tint hover:text-primary aria-[current=page]:bg-brand-tint aria-[current=page]:text-primary">{link.label}</Link>)}</nav>
                <div className="mt-6 grid gap-3 border-t pt-6">{session ? <><Button render={<Link href={roleRoutes[session.user.role] ?? "/"} onClick={() => setOpen(false)} />} className="h-11">Dashboard</Button><Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })} className="h-11">Sign out</Button></> : <Button render={<Link href="/login" onClick={() => setOpen(false)} />} className="h-11">Login<ArrowUpRight /></Button>}</div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
