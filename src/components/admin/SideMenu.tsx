import { IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {
  BsBarChart,
  BsBell,
  BsBoxSeam,
  BsClipboardCheck,
} from "react-icons/bs";
import { BiCategory, BiDotsHorizontalRounded, BiUser } from "react-icons/bi";

type TSideMenuProps = {
  opened: boolean;
  onToggle: () => void;
};

type TSideMenuItemProps = {
  // Display title
  title: string;
  // Link destination
  href: string;
  // side menu opened state
  opened: boolean;
  // side menu icon
  icon: React.ReactElement;
};

/**
 * Side menu item component
 */
const SideMenuItem: React.FC<TSideMenuItemProps> = ({
  title,
  href,
  opened,
  icon,
}) => {
  const router = useRouter();

  return (
    <Link href={href}>
      {opened ? (
        <p
          className={`p-1 ${
            router.pathname !== href ? "hover:bg-teal-50 hover:text-black" : ""
          }  rounded-lg flex justify-start font-semibold ${
            router.pathname === href ? "bg-teal-600 text-white" : ""
          }`}
        >
          {title}
        </p>
      ) : (
        <IconButton
          aria-label=""
          size="sm"
          variant={router.pathname === href ? "solid" : "outline"}
          colorScheme="teal"
        >
          {icon}
        </IconButton>
      )}
    </Link>
  );
};

/**
 * Admin page side menu component
 */
const SideMenu = ({ opened, onToggle }: TSideMenuProps) => {
  return (
    <div
      className={`hidden sm:block p-3 ${
        opened ? "w-sidemenu-opened" : "w-sidemenu-closed"
      } transition-all`}
    >
      <div className={`flex ${opened ? "justify-end" : "justify-center"}`}>
        <IconButton
          aria-label=""
          size="sm"
          variant="ghost"
          colorScheme="teal"
          onClick={onToggle}
        >
          {opened ? <AiOutlineClose /> : <AiOutlineMenu />}
        </IconButton>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <SideMenuItem
          title="Dashboard"
          href="/admin"
          opened={opened}
          icon={<BsBarChart />}
        />
        <SideMenuItem
          title="Orders"
          href="/admin/order"
          opened={opened}
          icon={<BsClipboardCheck />}
        />
        <SideMenuItem
          title="Products"
          href="/admin/product"
          opened={opened}
          icon={<BsBoxSeam />}
        />
        <SideMenuItem
          title="Categories"
          href="/admin/category"
          opened={opened}
          icon={<BiCategory />}
        />
        <SideMenuItem
          title="Users"
          href="/admin/user"
          opened={opened}
          icon={<BiUser />}
        />
        <SideMenuItem
          title="Notices"
          href="/admin/notice"
          opened={opened}
          icon={<BsBell />}
        />
        <SideMenuItem
          title="General"
          href="/admin/general"
          opened={opened}
          icon={<BiDotsHorizontalRounded />}
        />
      </div>
    </div>
  );
};

export default SideMenu;
