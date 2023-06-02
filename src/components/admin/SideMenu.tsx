import { IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";

type TSideMenuItem = {
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
const SideMenuItem: React.FC<TSideMenuItem> = ({
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
          variant={router.pathname === href ? "solid" : "ghost"}
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
const SideMenu = () => {
  const [opened, setOpened] = useState<boolean>(true);
  return (
    <div
      className={`hidden sm:block p-3 ${
        opened ? "w-52" : "w-14"
      } transition-all`}
    >
      <div className={`flex ${opened ? "justify-end" : "justify-center"}`}>
        <IconButton
          aria-label=""
          size="sm"
          variant="ghost"
          colorScheme="teal"
          onClick={() => setOpened((prev) => !prev)}
        >
          {opened ? <AiOutlineClose /> : <AiOutlineMenu />}
        </IconButton>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <SideMenuItem
          title="Dashboard"
          href="/admin"
          opened={opened}
          icon={<RxDashboard />}
        />
        <SideMenuItem
          title="Orders"
          href="/order"
          opened={opened}
          icon={<RxDashboard />}
        />
        <SideMenuItem
          title="Products"
          href="/product"
          opened={opened}
          icon={<RxDashboard />}
        />
        <SideMenuItem
          title="Categories"
          href="/category"
          opened={opened}
          icon={<RxDashboard />}
        />
        <SideMenuItem
          title="Users"
          href="/user"
          opened={opened}
          icon={<RxDashboard />}
        />
        <SideMenuItem
          title="Notices"
          href="/notice"
          opened={opened}
          icon={<RxDashboard />}
        />
        <SideMenuItem
          title="General"
          href="/general"
          opened={opened}
          icon={<RxDashboard />}
        />
      </div>
    </div>
  );
};

export default SideMenu;
