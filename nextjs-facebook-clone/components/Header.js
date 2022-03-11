import React from "react";
import Image from "next/image";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";

import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";

import HeaderIcon from "./HeaderIcon";
import { signOut, useSession } from "next-auth/react";

const centerIcons = [
  HomeIcon,
  FlagIcon,
  PlayIcon,
  ShoppingCartIcon,
  UserGroupIcon,
];
const rightIcons = [ViewGridIcon, ChatIcon, BellIcon, ChevronDownIcon];
const Header = () => {
  const { data: session } = useSession();
  return (
    <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
      {/* left */}
      <div className="flex items-center">
        <Image
          src="https://links.papareact.com/5me"
          width={40}
          height={40}
          layout="fixed"
        />
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            className="flex hidden md:inline-flex ml-2 items-center bg-transparent 
            flex-shrink outline-none placeholder-gray-500"
            type={"text"}
            placeholder="Search Facebook"
          />
        </div>
      </div>
      {/* center */}
      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
          {centerIcons.map((icon, index) => (
            <HeaderIcon key={index} Icon={icon} active={index === 0} />
          ))}
        </div>
      </div>

      {/* right */}
      <div className="flex items-center sm:space-x-2 justify-end">
        {/* Profile pic  */}
        <Image
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
          className="rounded-full cursor-pointer"
          onClick={signOut}
        />
        <p className="font-semibold pr-3 whitespace-nowrap">
          {session.user.name}
        </p>
        {rightIcons.map((Icon) => (
          <>
            <Icon className="icon" />
          </>
        ))}
      </div>
    </div>
  );
};

export default Header;
