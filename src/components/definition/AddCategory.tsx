import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Add, HighlightOff, Search } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNewCommodity,
  UpdateCommodityDetails,
  GetAllCommodityOnTree,
} from "../../redux/features/definitionSlicer.ts";
import TreeView from "@mui/lab/TreeView";
import { makeTree } from "../../utils/tree.ts";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export const AddCategory = ({ addCategoryDialog, onClose, parent }) => {
  const theme = useTheme();
  const dispatch = useDispatch<any>();
  const mediumOrSmaller = useMediaQuery(theme.breakpoints.down("sm"));
  const [info, setInfo] = useState({
    name: "",
    unit: "",
    description: "",
    descriptions: "",
    garanti: "",
    props: [],
    useInProjectsUnitsIds: [],
    useInProjectsIds: [],
    useInProjectsFloorIds: [],
    businessRoleIds: [],
    producerId: 0,
    parentId: parent ? parseInt(parent) : null ?? 0,
  });

  const {
    businessRoles,
    pleaseOfUse,
    commodities,
    suppliers,
    producers,
    commoditiesOnTree,
    selectedCommodity,
  } = useSelector((state: any) => state.definition);

  useEffect(() => {
    if (selectedCommodity) {
      setInfo({
        ...selectedCommodity,
        producerId: selectedCommodity?.producerId
          ? selectedCommodity?.producerId
          : 0,
        // supplierId: selectedCommodity?.supplierId
        //   ? selectedCommodity?.supplierId
        //   : 0,
        useInProjectsFloorIds: selectedCommodity?.placeOfUseFloor?.map(
          (item) => item?.id
        ),
        useInProjectsIds: selectedCommodity?.placeOfUseProject?.map(
          (item) => item?.id
        ),
        useInProjectsUnitsIds: selectedCommodity?.placeOfUseUnit?.map(
          (item) => item?.id
        ),
        businessRoleIds: selectedCommodity?.businessRoles?.map(
          (item) => item?.id
        ),
      });
    } else {
      setInfo({
        name: "",
        unit: "",
        description: "",
        descriptions: "",
        garanti: "",
        props: [],
        useInProjectsUnitsIds: [],
        useInProjectsIds: [],
        useInProjectsFloorIds: [],
        businessRoleIds: [],
        producerId: 0,
        parentId: parent ? parseInt(parent) : null ?? 0,
      });
    }
  }, [selectedCommodity, parent]);

  const [term, setTerm] = useState("");

  const getProjects = () => {
    return pleaseOfUse?.data?.filter((item) => item.type === "Project");
  };

  const getFloors = () => {
    return pleaseOfUse?.data?.filter((item) => item.type === "floor");
  };

  const getUnits = () => {
    return pleaseOfUse?.data?.filter((item) => item.type === "unit");
  };

  const handleChange = (e) => {
    if (e.target?.name === "description") {
      setInfo({
        ...info,
        [e.target?.name]: e.target?.value,
        descriptions: e.target?.value,
      });
    }
    if (e.target?.name === "producerId") {
      setInfo({
        ...info,
        [e.target?.name]: e.target?.value ?? 0,
      });
    } else {
      setInfo({
        ...info,
        [e.target?.name]: e.target?.value,
      });
    }
  };

  const onSubmit = async () => {
    if (selectedCommodity) {
      await dispatch(
        UpdateCommodityDetails({ ...info, id: selectedCommodity?.id })
      );
      await dispatch(
        GetAllCommodityOnTree({
          commodityName: "",
          code: "",
          projectId: undefined,
        })
      );
    } else {
      await dispatch(AddNewCommodity({ ...info, isCategory: true }));
      await dispatch(
        GetAllCommodityOnTree({
          commodityName: "",
          code: "",
          projectId: undefined,
        })
      );
    }
    onClose();
  };

  const generateTree = (item, isTree: boolean = true) => {
    if (item?.children && isTree) {
      return (
        <TreeItem
          sx={{ color: "rgb(62, 104, 168)" }}
          nodeId={item?.id}
          label={item?.serchableName}
        >
          {item?.children?.map((subItem) => generateTree(subItem))}
        </TreeItem>
      );
    } else {
      return (
        <TreeItem
          sx={{ color: "rgb(62, 104, 168)" }}
          nodeId={item?.id}
          label={item?.serchableName}
        />
      );
    }
  };

  const getTreeDate = useCallback(() => {
    let datas = commoditiesOnTree?.data?.filter((item) =>
      item?.serchableName?.includes(term)
    );
    let theTree = makeTree(datas);
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

  const [showTreeDialog, setShowTreeDialog] = useState(false);

  return (
    <>
      <Dialog
        open={addCategoryDialog}
        onClose={onClose}
        fullWidth={true}
        maxWidth={"md"}
        fullScreen={mediumOrSmaller}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {selectedCommodity ? "ویرایش کتگوری" : "افزودن کتگوری"}
          <IconButton color={"error"} onClick={onClose}>
            <HighlightOff />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid spacing={1} container>
            <Grid item xs={12} sm={12} md={12}>
              <Typography sx={{ mt: 2 }}>نام</Typography>
              <TextField
                value={info?.name}
                name={"name"}
                onChange={handleChange}
                fullWidth={true}
                sx={{ mt: 2 }}
              />
              <FormControl fullWidth={true}>
                <Typography sx={{ mt: 2 }}>شاخه ی کالا</Typography>
                <Button
                  sx={{ mt: 2 }}
                  fullWidth={true}
                  color={"primary"}
                  variant={"contained"}
                  onClick={() => setShowTreeDialog(true)}
                >
                  {info?.parentId
                    ? commoditiesOnTree?.data?.filter(
                        (item) => item?.id === info?.parentId
                      ).length
                      ? commoditiesOnTree?.data?.filter(
                          (item) => item?.id === info?.parentId
                        )[0].serchableName
                      : "انتخاب شاخه"
                    : "انتخاب شاخه"}
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant={"contained"} color={"success"} onClick={onSubmit}>
            {businessRoles?.addState ? <CircularProgress /> : "ثبت"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showTreeDialog}
        onClose={() => setShowTreeDialog(false)}
        fullWidth={true}
        maxWidth={"md"}
        fullScreen={mediumOrSmaller}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          انتخاب شاخه کالا
          <IconButton color={"error"} onClick={() => setShowTreeDialog(false)}>
            <HighlightOff />
          </IconButton>
        </DialogTitle>
        <DialogContent>
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
            placeholder={"جستجو در شاخه ها"}
            sx={{ my: 1 }}
          />
          <TreeView
            onNodeSelect={(e, ids) =>
              handleChange({ target: { value: ids, name: "parentId" } })
            }
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronLeftIcon />}
            sx={{ flexGrow: 1 }}
          >
            {commoditiesOnTree?.data?.length && getTreeDate()}
          </TreeView>
        </DialogContent>
        <DialogActions>
          <Button
            color={"secondary"}
            variant={"contained"}
            fullWidth={true}
            onClick={() => setShowTreeDialog(false)}
          >
            تایید
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
