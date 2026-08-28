import Link from "next/link";
import type { ReactNode } from "react";

interface LegalDocProps {
  title: string;
  updated: string;
  children: ReactNode;
}

export function LegalDoc({ title, updated, children }: LegalDocProps) {
  return (
    <div className="bg-saasy-dark min-h-screen">
      <nav className="border-b border-saasy-border/50 bg-saasy-dark/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold">
            <span className="accent-word">SaaSy</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-saasy-pink-soft hover:text-saasy-rose underline"
          >
            &larr; Back to home
          </Link>
        </div>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-14">
          <h1 className="text-white text-3xl font-bold">{title}</h1>
          <p className="mt-3 text-saasy-muted text-sm">Last updated: {updated}</p>
        </header>
        <div className="space-y-10">{children}</div>
      </div>
    </div>
  );
}

export function H({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-white text-xl font-semibold mt-10 mb-4">{children}</h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-saasy-muted leading-relaxed">{children}</p>;
}
