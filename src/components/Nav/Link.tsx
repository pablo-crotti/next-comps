import { default as NextLink } from "next/link";
import { Chevron } from "../Icons";
import React from "react";

import type { LinkProps } from "@/models/Nav";

export default function Link({
  href,
  name,
  isActive,
  icon,
  links,
}: Readonly<LinkProps>) {
  if (href) {
    return (
      <li>
        <NextLink
          href={href}
          className={`flex items-center font-bold px-4 py-2 rounded-lg ${
            isActive
              ? "bg-background text-primary"
              : "hover:bg-background hover:text-primary duration-500"
          }`}
        >
          {icon}
          <span className="ms-3">{name}</span>
        </NextLink>
      </li>
    );
  } else {
    return (
      <li>
        <button
          type="button"
          className={`flex items-center font-bold px-4 py-2 rounded-lg w-full ${
            isActive
              ? "bg-background text-primary"
              : "hover:bg-background hover:text-primary duration-500"
          }`}
          aria-controls="dropdown-example"
          data-collapse-toggle="dropdown-example"
        >
          {icon}
          <span className="w-full flex items-center justify-between">
            <span className="ms-3">{name}</span>
            <Chevron isFilled={false} size="4" />
          </span>
        </button>
        <ul id="dropdown-example" className="hidden py-2 space-y-2">
          {links?.map((link) => (
            <li key={link.name}>
              <NextLink
                href={link.href}
                className={`flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 group ${
                  link.isActive
                    ? "text-primary"
                    : "text-gray-900 hover:text-gray-600"
                }`}
              >
                {link.name}
              </NextLink>
            </li>
          ))}
        </ul>
      </li>
    );
  }
}
