import { usePathname } from "next/navigation";
import { LinkProps } from "@/models/Nav";
import { Squares, Rocket } from "@/components/Icons";

export default function getLinks(): LinkProps[] {
  const pathname = usePathname();
  return [
    {
      name: "Dashboard",
      isActive:
        pathname === "/" ||
        pathname === "/analytics" ||
        pathname === "/settings",
      icon: <Squares isFilled={false} />,
      links: [
        { href: "/dashboard", name: "Dashboard", isActive: pathname === "/" },
        {
          href: "/analytics",
          name: "Analytics",
          isActive: pathname === "/analytics",
        },
        {
          href: "/settings",
          name: "Settings",
          isActive: pathname === "/settings",
        },
      ],
    },
    {
      href: "/about",
      name: "About",
      isActive: pathname === "/about",
      icon: <Rocket isFilled={false} />,
    },
    {
      href: "/contact",
      name: "Contact",
      isActive: pathname === "/contact",
      icon: <Rocket isFilled={false} />,
    },
  ];
}
