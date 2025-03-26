import Image from "next/image";
import { User } from "@/components/Icons";
import UserMenuLink from "./UserMenuLink";

interface UserMenuProps {
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
}

export default function UserMenu({
  firstName,
  lastName,
  email,
  image,
}: Readonly<UserMenuProps>) {
  return (
    <div className="flex justify-end items-end ms-3">
      <div>
        <button
          className="flex items-center text-sm text-gray-800 rounded-full focus:ring-2 focus:ring-gray-300 gap-4"
          aria-expanded="false"
          data-dropdown-toggle="dropdown-user"
          type="button"
        >
          <span className="bg-gray-200 text-gray-600 rounded-full w-12 h-12 flex items-center justify-center">
            {image ? (
              <img
                className="w-12 h-12 rounded-full"
                src={image}
                alt="user photo"
              ></img>
            ) : (
              <User size="9" />
            )}
          </span>
        </button>
      </div>
      <div
        className="z-50 hidden left-full text-base list-none bg-gray-200 divide-y divide-gray-100 rounded-sm shadow-sm"
        id="dropdown-user"
      >
        <div className="px-4 py-3" role="none">
          <p className="text-sm " role="none">
            {firstName} {lastName}
          </p>
          <p className="text-sm font-medium" role="none">
            {email}
          </p>
        </div>
        <ul className="py-1" role="none">
          <UserMenuLink href="#" name="Profile" />
          <UserMenuLink href="#" name="Settings" />
          <UserMenuLink href="#" name="Earnings" />
          <UserMenuLink href="#" name="Sign out" />
        </ul>
      </div>
    </div>
  );
}
