import { TCategoryWithChild } from "@/components/common/combine/TreeNode";
import TreeView from "@/components/common/combine/TreeView";
import { TInputCreateCategory } from "@/server/scheme/categoryScheme";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

/**
 * Create new category modal component
 */
const SelectCategoryModal: React.FC<
  TModalProps & {
    categories: TCategoryWithChild[] | undefined;
    onClickConfirm: (data: TInputCreateCategory) => void;
    formControl: UseFormReturn<
      {
        name: string;
        comment: string | null;
        selectedId: string | null;
        parentId: string | null;
        parentName: string | null;
        parentDepth: number;
        isPromotion: boolean;
      },
      any,
      undefined
    >;
  }
> = ({
  formControl: { watch, setValue, handleSubmit },
  categories,
  isOpen,
  onClose,
  onClickConfirm,
}) => {
  const [data, setData] = useState<TInputCreateCategory | null>(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>Select category</Text>
        </ModalHeader>
        <ModalBody>
          <TreeView
            nodes={categories}
            selectedId={data?.parentId ?? null}
            onSelect={(id, depth, name) => {
              setData({
                parentId: id,
                parentDepth: depth + 1,
                name: name,
              });
            }}
          />
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button
              colorScheme="teal"
              onClick={() => {
                data && onClickConfirm(data);
              }}
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

export default SelectCategoryModal;
