import TreeView from "@/components/common/combine/TreeView";
import { trpc } from "@/utils/trpc";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

/**
 * Create new category modal component
 */
const SelectCategoryModal: React.FC<
  TModalProps & {
    onClickConfirm: (data: {
      name: string;
      id: string | null;
      depth: number;
    }) => void;
  }
> = ({ isOpen, onClose, onClickConfirm }) => {
  const { data: allCategories } = trpc.category.getCategories.useQuery();
  const [data, setData] = useState<{
    name: string;
    id: string | null;
    depth: number;
  } | null>(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>Select category</Text>
        </ModalHeader>
        <ModalBody>
          <Skeleton isLoaded={allCategories ? true : false}>
            <TreeView
              nodes={allCategories}
              selectedId={data?.id ?? null}
              onSelect={(id, depth, name) => {
                setData({
                  id,
                  depth: depth + 1,
                  name: name,
                });
              }}
            />
          </Skeleton>
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
