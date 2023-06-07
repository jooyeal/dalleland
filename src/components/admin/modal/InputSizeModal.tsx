import {
  Button,
  ButtonGroup,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

const InputSizeModal: React.FC<
  TModalProps & {
    onClickConfirm: ({ name, stock }: { name: string; stock: number }) => void;
  }
> = ({ isOpen, onClose, onClickConfirm }) => {
  const { register, handleSubmit } = useForm<{
    name: string;
    stock: number;
  }>();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>Input size information</Text>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-2">
            <Input
              {...register("name", { required: true })}
              placeholder="Please input size name"
            />
            <Input
              {...register("stock", { required: true })}
              placeholder="Please input this size's stock"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button
              colorScheme="teal"
              onClick={handleSubmit((data) => {
                onClickConfirm(data);
              })}
            >
              Ok
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InputSizeModal;
