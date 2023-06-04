import TreeView from "@/components/common/combine/TreeView";
import { TInputCreateCategory } from "@/server/scheme/categoryScheme";
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
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

/**
 * Create new category modal component
 */
const CreateCategoryModal: React.FC<
  TModalProps & {
    onClickConfirm: (
      { name }: TInputCreateCategory,
      { onSuccess }: TCallback
    ) => void;
  }
> = ({ isOpen, onClose, onClickConfirm }) => {
  /** form data control */
  const { register, handleSubmit, reset, setValue, watch } = useForm<{
    name: string;
    parentId: string | null;
    parentDepth: number;
  }>({
    defaultValues: {
      parentId: null,
      parentDepth: 0,
    },
  });

  /** TRPC get categories */
  const { data, refetch } = trpc.category.getCategories.useQuery();

  /** form data reset when modal is closed */
  const onCloseWithReset = () => {
    /** close the modal */
    onClose();
    /** form data reset */
    reset();
    /** retrieve categtory datas  */
    refetch();
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseWithReset}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>Create new category</Text>
        </ModalHeader>
        <ModalBody>
          <TreeView
            nodes={data}
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
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button
              colorScheme="teal"
              onClick={handleSubmit((data) => {
                onClickConfirm(
                  {
                    name: data.name,
                    parentId: data.parentId,
                    parentDepth: data.parentDepth,
                  },
                  {
                    onSuccess: () => onCloseWithReset(),
                  }
                );
              })}
            >
              Create
            </Button>
            <Button onClick={onCloseWithReset}>Cancel</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCategoryModal;
