import React from "react";
import { useSession } from "next-auth/react";
import {
  ChevronDownIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";

import {
  CalendarIcon,
  ClockIcon,
  DesktopComputerIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import SidebarRow from "./SidebarRow";
const icons = [
  {
    Icon: UsersIcon,
    title: "Friends",
  },
  {
    Icon: UserGroupIcon,
    title: "Groups",
  },
  {
    Icon: ShoppingBagIcon,
    title: "MarketPlace",
  },
  {
    Icon: DesktopComputerIcon,
    title: "Watch",
  },
  {
    Icon: CalendarIcon,
    title: "Events",
  },
  {
    Icon: ClockIcon,
    title: "Memories",
  },
  {
    Icon: ChevronDownIcon,
    title: "See More",
  },
];

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className="p-2 mt-5 max-w-[600px] xl:min-w-[300px]">
      <SidebarRow src={session.user.image} title={session.user.name} />
      {icons.map((icon, index) => (
        <SidebarRow {...icon} />
      ))}
    </div>
  );
};

export default Sidebar;
