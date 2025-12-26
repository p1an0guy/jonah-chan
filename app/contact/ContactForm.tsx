"use client";

import { useState } from "react";
import { formEndpoint } from "../config/site";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("company")) {
      setState("success");
      form.reset();
      return;
    }

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Form submission failed.");
      }

      setState("success");
      form.reset();
    } catch (error) {
      setState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <label className="block text-xs uppercase tracking-[0.3em] text-foreground/60">
        Name
        <input
          required
          name="name"
          type="text"
          className="mt-2 w-full rounded-xl border border-accent/30 bg-background/80 px-3 py-2 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
      </label>
      <label className="block text-xs uppercase tracking-[0.3em] text-foreground/60">
        Email
        <input
          required
          name="email"
          type="email"
          className="mt-2 w-full rounded-xl border border-accent/30 bg-background/80 px-3 py-2 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
      </label>
      <label className="block text-xs uppercase tracking-[0.3em] text-foreground/60">
        Message
        <textarea
          required
          name="message"
          rows={4}
          className="mt-2 w-full rounded-xl border border-accent/30 bg-background/80 px-3 py-2 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
      </label>
      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded-full border border-accent/50 bg-accent px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-black transition hover:shadow-[0_0_20px_var(--accent-glow)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "submitting" ? "Sending" : "Send message"}
      </button>
      <div className="min-h-[1.5rem] text-xs uppercase tracking-[0.3em] text-foreground/60">
        {state === "success" ? "Message sent. I will reply soon." : null}
        {state === "error" ? errorMessage : null}
      </div>
    </form>
  );
}
