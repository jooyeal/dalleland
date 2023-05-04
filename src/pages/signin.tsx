import Layout from "@/components/common/layout/Layout";
import { Button, Divider, FormLabel, Input, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import React from "react";
import { signIn } from "next-auth/react";

const SignIn: React.FC = () => {
  return (
    <Layout>
      <div className="h-full flex justify-center items-center">
        <div className="shadow-lg w-80 sm:w-96 md:w-[28rem] lg:w-[32rem] xl:w-[36rem] flex flex-col justify-center items-center p-4">
          <Text className="font-extrabold text-2xl">Welcome to Dalleland!</Text>
          <Text className="font-extrabold text-2xl">Please sign in</Text>
          <form className="mt-10 w-full flex flex-col gap-4">
            <div>
              <FormLabel>Email</FormLabel>
              <Input
                className="w-full"
                placeholder="Please enter your email address"
              />
            </div>
            <div>
              <FormLabel>Password</FormLabel>
              <Input
                className="w-full"
                placeholder="Please enter your password"
              />
            </div>
            <Button colorScheme="teal">Sign in</Button>
          </form>
          <Divider className="h-6 mb-6" />
          <div>
            <Button
              variant="outline"
              leftIcon={<FcGoogle />}
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Sign in with google
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
