import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "ghost";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: "sm" | "md";
  className?: string;
  external?: boolean;
  type?: "button" | "submit" | "reset";
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full text-xs font-semibold uppercase tracking-[0.3em] transition focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-accent/50 bg-accent text-black hover:shadow-[0_0_20px_var(--accent-glow)]",
  outline:
    "border border-accent/40 text-foreground/80 hover:border-accent hover:text-foreground",
  ghost: "text-foreground/70 hover:text-accent",
};

const sizeStyles = {
  sm: "px-4 py-2",
  md: "px-6 py-3",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  type = "button",
}: ButtonProps) {
  const classNames = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={classNames}
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classNames}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classNames}>
      {children}
    </button>
  );
}
