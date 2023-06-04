import { UseToastOptions, useToast } from "@chakra-ui/react";

const useCustomToast = () => {
  const toast = useToast();
  return (options?: UseToastOptions) =>
    toast({
      duration: 5000,
      status: "success",
      isClosable: true,
      ...options,
    });
};

export default useCustomToast;
