import Link from "next/link";

interface UserMenuLinkProps {
  href: string;
  name: string;
}

export default function UserMenuLink({
  href,
  name,
}: Readonly<UserMenuLinkProps>) {
  return (
    <li>
      <Link
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        href={href}
      >
        {name}
      </Link>
    </li>
  );
}
