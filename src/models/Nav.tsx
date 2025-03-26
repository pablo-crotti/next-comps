interface LinkProps {
  href?: string;
  name: string;
  isActive: boolean;
  icon: React.ReactNode;
  links?: { href: string; name: string; isActive: boolean }[];
}

export type { LinkProps };
