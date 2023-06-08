import { Modal, ModalContent, ModalOverlay, Spinner } from "@chakra-ui/react";
import React, { createContext, useState } from "react";

type TLoadingContext = {
  setLoading: (status: boolean) => void;
};
export const LoadingContext = createContext<TLoadingContext | null>(null);

const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setLoading = (status: boolean) => setIsLoading(status);
  return (
    <LoadingContext.Provider value={{ setLoading }}>
      <Modal isOpen={isLoading} onClose={() => {}} size="full">
        <ModalOverlay />
        <ModalContent>
          <Spinner size="xl" />
        </ModalContent>
      </Modal>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
