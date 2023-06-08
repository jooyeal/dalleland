import {
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  TextProps,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const BurgerMenuItem: React.FC<TextProps & { children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <Text className="font-semibold text-xl uppercase" {...rest}>
      {children}
    </Text>
  );
};

const BurgerMenu: React.FC<TModalProps & { isAdmin?: boolean }> = ({
  isOpen,
  isAdmin,
  onClose,
}) => {
  const router = useRouter();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent className="p-10">
        <ModalCloseButton />
        <ModalBody>
          {router.pathname.includes("admin") ? (
            <div className="flex flex-col gap-4">
              <Link href="/admin">
                <BurgerMenuItem onClick={onClose}>dashboard</BurgerMenuItem>
              </Link>
              <Link href="/admin/order">
                <BurgerMenuItem onClick={onClose}>orders</BurgerMenuItem>
              </Link>
              <Link href="/admin/product">
                <BurgerMenuItem onClick={onClose}>products</BurgerMenuItem>
              </Link>
              <Link href="/admin/category">
                <BurgerMenuItem onClick={onClose}>categories</BurgerMenuItem>
              </Link>
              <Link href="/admin/user">
                <BurgerMenuItem onClick={onClose}>users</BurgerMenuItem>
              </Link>
              <Link href="/admin/notice">
                <BurgerMenuItem onClick={onClose}>notices</BurgerMenuItem>
              </Link>
              <Link href="/admin/general">
                <BurgerMenuItem onClick={onClose}>general</BurgerMenuItem>
              </Link>
            </div>
          ) : null}
        </ModalBody>
        <Divider />
        <div className="flex flex-col gap-4 mt-6">
          <Link href="/profile">
            <BurgerMenuItem onClick={onClose}>profile</BurgerMenuItem>
          </Link>
          {isAdmin ? (
            <Link href="/admin">
              <BurgerMenuItem onClick={onClose}>admin page</BurgerMenuItem>
            </Link>
          ) : null}
          {isAdmin ? (
            <BurgerMenuItem
              onClick={() => {
                signOut();
                onClose();
              }}
            >
              logout
            </BurgerMenuItem>
          ) : (
            <Link href="/signin">
              <BurgerMenuItem onClick={onClose}>sign in</BurgerMenuItem>
            </Link>
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};

export default BurgerMenu;
