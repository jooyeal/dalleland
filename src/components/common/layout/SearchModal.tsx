import {
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import React, { ChangeEvent } from "react";
import Link from "next/link";
import { debounce } from "@/utils/commonFunc";

const samplePosts = [
  { id: "1", name: "product1" },
  { id: "2", name: "product2" },
  { id: "3", name: "product3" },
  { id: "4", name: "product4" },
  { id: "5", name: "product5" },
  { id: "6", name: "product6" },
  { id: "7", name: "product7" },
  { id: "8", name: "product8" },
];

/**
 * Search modal component props
 */
type SearchModalProps = {
  /** Modal open flag */
  isOpen: boolean;
  /** Callback function when modal is closed */
  onClose: () => void;
};

/**
 * Search result item component props
 */
type SearchItemProps = {
  /** Product id */
  id: string;
  /** Product name */
  name: string;
};

/**
 * Search result item component
 */
const SearchItem: React.FC<SearchItemProps> = ({ id, name }) => {
  return (
    <Link
      href={`/product/${id}`}
      className="h-12 p-4 font-bold flex items-center rounded-lg bg-zinc-100 hover:bg-teal-500 hover:text-white"
    >
      {name}
    </Link>
  );
};

/**
 * Search modal component
 */
const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  /** Change event handler of search input */
  const onChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <InputGroup>
            <InputLeftElement>
              <BiSearch />
            </InputLeftElement>
            <Input
              variant="flushed"
              focusBorderColor="black"
              onChange={onChange}
            />
          </InputGroup>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-2">
            {samplePosts.map((post) => (
              <SearchItem key={post.id} {...post} />
            ))}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
