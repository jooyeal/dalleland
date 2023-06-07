import { TCategoryWithChild } from "@/components/common/combine/TreeNode";
import TreeView from "@/components/common/combine/TreeView";
import useCustomToast from "@/hooks/useCustomToast";
import { trpc } from "@/utils/trpc";
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
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

/**
 * Create new category modal component
 */
const CreateCategoryModal: React.FC<
  TModalProps & {
    categories: TCategoryWithChild[] | undefined;
    onClickConfirm: () => void;
  }
> = ({ categories, isOpen, onClose, onClickConfirm }) => {
  /** Toast message */
  const toast = useCustomToast();

  /** create category form data control */
  const { watch, setValue, register, handleSubmit, reset } = useForm<{
    name: string;
    parentId: string | null;
    parentDepth: number;
  }>({
    defaultValues: {
      parentId: null,
      parentDepth: 0,
    },
  });

  /** TRPC create category */
  const { mutate } = trpc.category.createCategory.useMutation({
    /** The callback function when category is created successfully */
    onSuccess: () => {
      toast({
        title: "New category is created successfully",
      });
      reset();
      onClose();
      onClickConfirm();
    },
    /** The callback function when category creating is failed */
    onError: (error) => {
      toast({
        status: "error",
        title: error.message,
      });
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>Create new category</Text>
        </ModalHeader>
        <ModalBody>
          <Skeleton isLoaded={categories ? true : false}>
            <TreeView
              nodes={categories}
              selectedId={watch("parentId")}
              onSelect={(id, depth) => {
                setValue("parentId", id);
                setValue("parentDepth", depth);
              }}
            />
            <Input
              {...register("name")}
              placeholder="please input category name"
            />
          </Skeleton>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button
              colorScheme="teal"
              onClick={handleSubmit((data) => {
                mutate(data);
              })}
            >
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCategoryModal;
