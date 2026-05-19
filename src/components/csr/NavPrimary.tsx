import Link from "next/link";
import { LinkButton } from "@/components/layout/LinkButton";

type NavPrimaryProps = {
  href: string;
  children: React.ReactNode;
  highlight?: boolean;
  className?: string;
};

export function NavPrimary({ href, children, highlight = true, className }: NavPrimaryProps) {
  if (highlight) {
    return (
      <LinkButton href={href} variant="primary" size="sm" className={className}>
        {children}
      </LinkButton>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
