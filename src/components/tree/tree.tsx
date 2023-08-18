import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

interface RenderTree {
  id: string;
  serchableName: string;
  children?: readonly RenderTree[];
}


export default function RichObjectTreeView({ treeData }) {
  const renderTree = (nodes: RenderTree) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.serchableName}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      {treeData.map((item) => renderTree(item))}
    </TreeView>
  );
}
