import React from "react";
import TreeNode, { TCategoryWithChild, TTreeNodeControl } from "./TreeNode";

type TTreeViewProps = {
  nodes?: TCategoryWithChild[];
} & TTreeNodeControl;

/** Tree component */
const TreeView: React.FC<TTreeViewProps> = ({
  nodes,
  selectedId,
  onSelect,
}) => {
  return (
    <div>
      {nodes
        ?.filter((node) => !node.parentId)
        .map((node) => (
          <TreeNode
            key={node.id}
            {...node}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        ))}
    </div>
  );
};

export default TreeView;
