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

const InputAdditionalInfoModal: React.FC<
  TModalProps & {
    onClickConfirm: ({
      name,
      content,
    }: {
      name: string;
      content: string;
    }) => void;
  }
> = ({ isOpen, onClose, onClickConfirm }) => {
  const { register, handleSubmit } = useForm<{
    name: string;
    content: string;
  }>();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>Input additional information</Text>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-2">
            <Input
              {...register("name", { required: true })}
              placeholder="Please input additional info name"
            />
            <Input
              {...register("content", { required: true })}
              placeholder="Please input additional info content"
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

export default InputAdditionalInfoModal;
