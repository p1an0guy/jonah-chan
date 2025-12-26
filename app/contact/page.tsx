import Button from "../components/Button";
import ContactForm from "./ContactForm";
import CopyToClipboard from "../components/CopyToClipboard";
import IconLink from "../components/IconLink";
import Section from "../components/Section";
import TerminalPanel from "../components/TerminalPanel";

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <Section
        anchor="contact"
        title="Contact"
        subtitle="Send a signal or open a collaboration channel."
      >
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <TerminalPanel title="contact.channel" status="ready">
            <div className="text-sm text-foreground/70">
              <p>
                Interested in building tooling for high-tempo teams? Reach out and
                we will sync on timing, scope, and the best channel to deploy.
              </p>
            </div>
            <div className="mt-6 space-y-4 font-mono text-xs uppercase tracking-[0.3em] text-foreground/70">
              <div className="space-y-3">
                <CopyToClipboard label="Email" text="hello@terminal.ai" />
                <CopyToClipboard label="Phone" text="+01 404 001 0110" />
              </div>
              <p>San Francisco, CA</p>
              <div className="flex flex-wrap gap-3">
                <Button href="mailto:hello@terminal.ai" size="sm">
                  Send Email
                </Button>
                <Button
                  href="https://calendar.google.com"
                  variant="outline"
                  size="sm"
                  external
                >
                  Book Call
                </Button>
              </div>
            </div>
          </TerminalPanel>
          <TerminalPanel title="contact.form">
            <ContactForm />
          </TerminalPanel>
        </div>
        <div className="mt-10 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-foreground/60">
          <span>Response window: 24h</span>
          <IconLink href="/projects" label="View projects" />
        </div>
      </Section>
    </div>
  );
}
