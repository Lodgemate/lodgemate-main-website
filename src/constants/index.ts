import { IoNotificationsOutline } from "react-icons/io5";
import { BsHouse } from "react-icons/bs";
import { BsPersonGear } from "react-icons/bs";
import { VscGitPullRequest } from "react-icons/vsc";
import { IoChatbubblesOutline } from "react-icons/io5";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { CiSaveDown1 } from "react-icons/ci";
import { TfiHelpAlt } from "react-icons/tfi";
import { BsGear } from "react-icons/bs";

export const navLinks = [
  {
    title: "Notifications",
    url: "/notification",
    Icon: IoNotificationsOutline,
  },

  {
    title: "List a lodge",
    url: "/lodges/list_lodge",
    Icon: BsHouse,
  },
  {
    title: "List your service",
    url: "/services_/list_service",
    Icon: BsPersonGear,
  },
  {
    title: "Request roomate",
    url: "/roommates/find_a_roommate",
    Icon: VscGitPullRequest,
  },
  {
    title: "Chats",
    url: "/chat",
    Icon: IoChatbubblesOutline,
  },
  {
    title: "Wishlist",
    url: "/wishlist",
    Icon: MdFormatListBulletedAdd,
  },
  {
    title: "Status & inventory",
    url: "/status_and_inventory",
    Icon: CiSaveDown1,
  },
  {
    title: "Help & Support",
    url: "/help_and_support",
    Icon: TfiHelpAlt,
  },
  {
    title: "Settings",
    url: "/settings",
    Icon: BsGear,
  },
];

export const navDemacators = ["Manage", "User Actions", "Settings"];
