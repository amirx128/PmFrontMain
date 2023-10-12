import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import {
  clearSelectedCommodity,
  GetAllBusinessRoles,
  GetAllCommodities,
  GetAllCommodityOnTree,
  GetAllPleaseOfUse,
  GetAllProducers,
  GetAllSuppliers,
  getAllWarehouses,
  GetOneCommodityDetails,
} from "../../redux/features/definitionSlicer.ts";
import {
  Add,
  AddBox,
  BorderColor,
  Inventory,
  Search,
} from "@mui/icons-material";
import { AddCommodity } from "../../components/definition/addCommodity.tsx";
import { AddCategory } from "../../components/definition/AddCategory.tsx";
import { CommodityCard } from "../../components/definition/commodity.tsx";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TreeItem from "@mui/lab/TreeItem";
import { makeTree } from "../../utils/tree.ts";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TreeView from "@mui/lab/TreeView";
import { useNavigate } from "react-router-dom";

const Commodities = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<any>();
  const { commodities, commoditiesOnTree } = useSelector(
    (state: any) => state.definition
  );

  const [addCommodityDialog, setAddCommodityDialog] = useState<boolean>(false);
  const [selectedCommodity, setSelectedCommodity] = useState(null);
  const [expanded, setExpanded] = useState([]);

  const [addCategoryDialog, setAddCategoryDialog] = useState<boolean>(false);
  useEffect(() => {
    // @ts-ignore
    dispatch(GetAllCommodities());
    // @ts-ignore
    dispatch(GetAllBusinessRoles());
    // @ts-ignore
    dispatch(GetAllProducers());
    // @ts-ignore
    dispatch(GetAllSuppliers());
    // @ts-ignore
    dispatch(GetAllPleaseOfUse());
    // @ts-ignore
    dispatch(getAllWarehouses());
  }, [dispatch]);
  useEffect(() => {
    getAllCommiditiesOnTree();
  }, []);
  const getAllCommiditiesOnTree = async () => {
    await dispatch(
      GetAllCommodityOnTree({
        commodityName: "",
        code: "",
        projectId: undefined,
      })
    );
  };

  const commodityOnClose = () => {
    setAddCommodityDialog(false);
  };
  const CategoryOnClose = () => {
    setAddCategoryDialog(false);
  };

  useEffect(() => {
    if (selectedCommodity?.id) {
      dispatch(GetOneCommodityDetails(selectedCommodity?.id));
    }
  }, [selectedCommodity]);

  useEffect(() => {
    if (!addCommodityDialog) {
      //@ts-ignore
      dispatch(clearSelectedCommodity());
    }
  }, [addCommodityDialog]);

  useEffect(() => {
    if (!addCategoryDialog) {
      //@ts-ignore
      dispatch(clearSelectedCommodity());
    }
  }, [addCategoryDialog]);

  const [term, setTerm] = useState("");
  const generateTree = (item, isTree: boolean = true) => {
    if (item?.children && isTree) {
      return (
        <TreeItem
          key={item?.id}
          sx={{ color: "rgb(62, 104, 168)" }}
          nodeId={item?.id?.toString()}
          label={item?.serchableName}
        >
          {item?.children?.map((subItem) => generateTree(subItem))}
        </TreeItem>
      );
    } else {
      return (
        <TreeItem
          key={item?.id}
          sx={{ color: "rgb(62, 104, 168)" }}
          nodeId={item?.id?.toString()}
          label={item?.serchableName}
        />
      );
    }
  };

  const getTreeDate = useCallback(() => {
    const datas = commoditiesOnTree?.data?.filter((item) =>
      item?.serchableName?.includes(term)
    );
    const theTree = makeTree(datas);
    if (
      datas?.length > 1 &&
      theTree?.items?.length &&
      theTree?.items[0]?.children
    ) {
      return makeTree(datas).items.map((item) => generateTree(item));
    } else {
      return datas.map((item) => generateTree(item, false));
    }
  }, [term, commoditiesOnTree]);

  const [selectedNode, setSelectedNode] = useState(null);
  const [parent, setParent] = useState(null);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          sx={{
            borderRadius: 2,
            boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
            p: 2,
            width: "100%",
            mb: 2,
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={1}
          >
            <Typography sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Inventory />
              کالا ها
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                disabled={!selectedNode}
                size={"small"}
                startIcon={<BorderColor />}
                variant={"outlined"}
                color={"primary"}
                onClick={() => {
                  setParent(null);
                  const commidtyOnTree = commoditiesOnTree?.data?.find(
                    (com) => +com.id === +selectedNode
                  );

                  const find = commodities?.data?.find(
                    (item) => item?.id == selectedNode
                  );
                  if (commidtyOnTree.isCategory) {
                    setSelectedCommodity(commidtyOnTree);
                    setSelectedNode(null);
                    setAddCategoryDialog(true);
                    return;
                  }
                  if (find) {
                    setSelectedCommodity(find);
                    setSelectedNode(null);
                    setAddCommodityDialog(true);
                  }
                }}
              >
                ویرایش
              </Button>
              <Button
                size={"small"}
                startIcon={<Add />}
                disabled={!selectedNode}
                variant={"outlined"}
                color={"secondary"}
                onClick={() => {
                  setParent(selectedNode);
                  setSelectedNode(null);
                  setAddCommodityDialog(true);
                }}
              >
                افزودن
              </Button>
              <Button
                size={"small"}
                startIcon={<Add />}
                disabled={!selectedNode}
                variant={"outlined"}
                color={"secondary"}
                onClick={() => {
                  setParent(selectedNode);
                  setSelectedNode(null);
                  navigate("/CommodityTransactions/" + selectedNode);
                }}
              >
                سابقه انبار
              </Button>

              <Button
                size={"small"}
                startIcon={<Add />}
                disabled={!selectedNode}
                variant={"outlined"}
                color={"secondary"}
                onClick={() => {
                  setParent(selectedNode);
                  setSelectedNode(null);
                  setAddCategoryDialog(true);
                }}
              >
                اضافه کردن کتگوری
              </Button>
            </Box>
          </Box>
          <Box sx={{ textAlign: "left" }}>
            <TextField
              size={"small"}
              fullWidth={true}
              value={term}
              onChange={(e) => setTerm(e.target?.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              placeholder={"جستجو"}
              sx={{ my: 1 }}
            />
            <TreeView
              onNodeSelect={(event, nodeIds) => {
                setSelectedNode(nodeIds);
              }}
              expanded={expanded}
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronLeftIcon />}
              sx={{ flexGrow: 1 }}
              onNodeToggle={handleToggle}
            >
              {commoditiesOnTree?.data?.length > 0 && getTreeDate()}
            </TreeView>
          </Box>
        </Box>
      </Grid>
      <AddCommodity
        addCommodityDialog={addCommodityDialog}
        parent={parent}
        onClose={commodityOnClose}
      />
      <AddCategory
        addCategoryDialog={addCategoryDialog}
        parent={parent}
        onClose={CategoryOnClose}
      />
    </Grid>
  );
};
export default Commodities;
