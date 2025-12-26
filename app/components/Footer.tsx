import { contactInfo } from "../data/contact";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-accent/20 bg-background/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-foreground/70 md:flex-row md:items-center md:justify-between">
        <div className="font-mono text-xs uppercase tracking-[0.3em]">
          Signal locked
        </div>
        <div className="flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-[0.3em]">
          <span>{contactInfo.email}</span>
          <span className="text-accent">{contactInfo.phone}</span>
        </div>
        <span className="text-xs uppercase tracking-[0.3em]">
          © 2025 Jonah Chan
        </span>
      </div>
    </footer>
  );
}
