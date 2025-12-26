import Link from "next/link";
import type { ReactNode } from "react";

type IconLinkProps = {
  href: string;
  label: string;
  icon?: ReactNode;
  external?: boolean;
};

export default function IconLink({
  href,
  label,
  icon,
  external = false,
}: IconLinkProps) {
  const className =
    "inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-accent transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {icon ? <span aria-hidden="true">{icon}</span> : null}
        <span>{label}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      <span>{label}</span>
    </Link>
  );
}
