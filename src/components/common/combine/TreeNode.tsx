import { IconButton, useDisclosure } from "@chakra-ui/react";
import { Category } from "@prisma/client";
import React, { useMemo } from "react";
import { BsCaretDown, BsCaretRight } from "react-icons/bs";

export type TCategoryWithChild = Category & { child: TCategoryWithChild[] };
export type TTreeNodeControl = {
  selectedId: string | null;
  onSelect: (id: string | null, depth: number) => void;
};

type TTreeNodeProps = TCategoryWithChild & TTreeNodeControl;

const DEPTH_PADDING = 40;

/** Tree node component */
const TreeNode: React.FC<TTreeNodeProps> = ({
  id,
  child,
  name,
  depth,
  selectedId,
  onSelect,
}) => {
  /** child tree node open control */
  const { isOpen, onOpen, onClose } = useDisclosure();
  /** A flag last node */
  const isLeaf = useMemo(() => (child.length === 0 ? true : false), [child]);

  return (
    <div className="mt-1 mb-1 cursor-pointer">
      <div
        className={`flex items-center p-2 rounded-md ${
          selectedId === id ? "bg-teal-600" : "hover:bg-teal-50"
        } transition-all`}
        style={{
          paddingLeft: `${depth ? depth * DEPTH_PADDING : 8}px`,
        }}
        onClick={() => {
          if (selectedId === id) {
            onSelect && onSelect(null, 0);
          } else {
            onSelect && onSelect(id, depth);
          }
        }}
      >
        {!isLeaf ? (
          <IconButton
            aria-label=""
            onClick={isOpen ? onClose : onOpen}
            colorScheme={selectedId === id ? "whiteAlpha" : "teal"}
            variant="outline"
            size="xs"
          >
            {isOpen ? <BsCaretDown /> : <BsCaretRight />}
          </IconButton>
        ) : null}
        <p
          className={`ml-2 ${
            selectedId === id ? "text-white" : ""
          } font-semibold`}
        >
          {name}
        </p>
      </div>
      <div className={`${isOpen ? "block" : "hidden"}`}>
        {child.map((node) => (
          <TreeNode
            key={node.id}
            {...node}
            depth={node.depth}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default TreeNode;
