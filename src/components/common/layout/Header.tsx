import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BiCart, BiHeart, BiMenu, BiSearch, BiUser } from "react-icons/bi";
import SearchModal from "./SearchModal";
import { signOut, useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import BurgerMenu from "./BurgerMenu";

/**
 * Header component
 */
const Header: React.FC = () => {
  const searchModalControl = useDisclosure();
  const burgerMenuControl = useDisclosure();
  const { status, data } = useSession();
  const { data: userData } = trpc.user.getUserByEmail.useQuery({
    email: data?.user?.email || "",
  });

  return (
    <div className="sticky top-0 h-16 flex justify-between items-center pl-6 pr-6 shadow-sm bg-white z-50">
      {/* Menu Icon */}
      <BiMenu
        className="text-2xl sm:hidden"
        onClick={burgerMenuControl.onOpen}
      />
      {/* Logo */}
      <span
        className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-teal-500 relative inline-block"
        aria-hidden="true"
      >
        <Link href="/" className="font-black text-2xl italic relative">
          Dalleland
        </Link>
      </span>
      {/* Search Bar */}
      <div
        className="hidden sm:flex shadow-md h-12 w-2/5 rounded-md p-4 cursor-pointer items-center gap-4"
        onClick={searchModalControl.onOpen}
      >
        <BiSearch className="text-xl text-zinc-400" />
        <Text className="text-zinc-400">Search products</Text>
      </div>
      {/* Other Icons */}
      <div className="hidden sm:block">
        <div className="flex items-center gap-2">
          {/* WishList */}
          <Link href="/wishlist">
            <BiHeart className="text-2xl" />
          </Link>
          {/* Cart */}
          <Link href="/cart">
            <BiCart className="text-2xl" />
          </Link>
          {/* User Menu */}

          <Menu>
            <MenuButton>
              <BiUser className="text-2xl" />
            </MenuButton>
            <MenuList>
              {status === "authenticated" ? (
                <>
                  {/* Profile */}
                  <Link href="/profile">
                    <MenuItem>Profile</MenuItem>
                  </Link>
                  {/* Admin */}
                  {userData?.isAdmin && (
                    <Link href="/admin">
                      <MenuItem>Admin</MenuItem>
                    </Link>
                  )}
                  {/* Logout */}
                  <MenuItem onClick={() => signOut()}>Logout</MenuItem>
                </>
              ) : (
                <Link href="/signin">
                  <MenuItem>Sign in</MenuItem>
                </Link>
              )}
            </MenuList>
          </Menu>
        </div>
      </div>
      <SearchModal
        isOpen={searchModalControl.isOpen}
        onClose={searchModalControl.onClose}
      />
      <BurgerMenu
        isAdmin={userData?.isAdmin}
        isOpen={burgerMenuControl.isOpen}
        onClose={burgerMenuControl.onClose}
      />
    </div>
  );
};

export default Header;
