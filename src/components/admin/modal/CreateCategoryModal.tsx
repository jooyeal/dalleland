import { TCategoryWithChild } from "@/components/common/combine/TreeNode";
import TreeView from "@/components/common/combine/TreeView";
import { TInputCreateCategory } from "@/server/scheme/categoryScheme";
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
import { UseFormReturn } from "react-hook-form";

/**
 * Create new category modal component
 */
const CreateCategoryModal: React.FC<
  TModalProps & {
    categories: TCategoryWithChild[] | undefined;
    onClickConfirm: (data: TInputCreateCategory) => void;
    formControl: UseFormReturn<
      {
        name: string;
        parentId: string | null;
        parentDepth: number;
      },
      any,
      undefined
    >;
    type?: "create" | "select";
  }
> = ({
  formControl: { watch, setValue, register, handleSubmit },
  categories,
  isOpen,
  onClose,
  onClickConfirm,
  type,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>
            {type === "select" ? "Select category" : "Create new category"}
          </Text>
        </ModalHeader>
        <ModalBody>
          <TreeView
            nodes={categories}
            selectedId={watch("parentId")}
            onSelect={(id, depth, name) => {
              setValue("parentId", id);
              setValue("parentDepth", depth);
              type === "select" && setValue("name", name);
            }}
          />
          <Input
            {...register("name")}
            placeholder="please input category name"
          />
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button
              colorScheme="teal"
              onClick={handleSubmit((data) => {
                onClickConfirm({
                  name: data.name,
                  parentId: data.parentId,
                  parentDepth: data.parentDepth,
                });
              })}
            >
              {type === "select" ? "Ok" : "Create"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCategoryModal;
