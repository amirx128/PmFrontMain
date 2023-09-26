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

export const AddCommodity = ({ addCommodityDialog, onClose, parent }) => {
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
    businessRoleIds: [],
    suppliersIds: [],
    producerId: 0,
    parentId: parent ? parseInt(parent) : null ?? 0,
    warehouses: [],
  });

  const {
    businessRoles,
    pleaseOfUse,
    commodities,
    suppliers,
    producers,
    commoditiesOnTree,
    selectedCommodity,
    warehouses,
  } = useSelector((state: any) => state.definition);

  useEffect(() => {
    if (selectedCommodity) {
      setInfo({
        name: selectedCommodity?.name,
        unit: selectedCommodity?.unit,
        description: selectedCommodity?.description,
        descriptions: selectedCommodity?.descriptions,
        garanti: selectedCommodity?.garanti,
        props: selectedCommodity?.props,
        parentId: parent ? parseInt(parent) : null ?? 0,
        producerId: selectedCommodity?.producerId
          ? selectedCommodity?.producerId
          : 0,
        suppliersIds: selectedCommodity?.suppliers,
        businessRoleIds: selectedCommodity?.businessRoles?.map(
          (item) => item?.id
        ),
        warehouses: selectedCommodity?.warehouse,
      });
    } else {
      setInfo({
        name: "",
        unit: "",
        description: "",
        descriptions: "",
        garanti: "",
        props: [],
        businessRoleIds: [],
        suppliersIds: [],
        producerId: 0,
        parentId: parent ? parseInt(parent) : null ?? 0,
        warehouses: [],
      });
    }
  }, [selectedCommodity, parent]);

  const [term, setTerm] = useState("");

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
      console.log(info);
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
      await dispatch(AddNewCommodity({ ...info }));
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

  const [showAddProp, setShowAddProp] = useState(false);
  const [propVal, setPropVal] = useState({
    propName: "",
    propType: "integer",
    propValue: "",
  });
  const handleChangeProp = (e) => {
    setPropVal({
      ...propVal,
      [e.target?.name]: e.target?.value,
    });
  };

  const handleAddProp = () => {
    setInfo({
      ...info,
      props: [
        ...info?.props,
        {
          id: info?.props?.length + 1,
          ...propVal,
        },
      ],
    });
    setPropVal({
      propName: "",
      propType: "integer",
      propValue: "",
    });
  };

  const handleDeleteProp = (prop) => {
    setInfo({
      ...info,
      props: info?.props.filter((item) => item?.id !== prop?.id),
    });
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

  const [showTreeDialog, setShowTreeDialog] = useState(false);
  console.log(warehouses);
  return (
    <>
      <Dialog
        open={addCommodityDialog}
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
          {selectedCommodity ? "ویرایش کالا" : "افزودن کالا"}
          <IconButton color={"error"} onClick={onClose}>
            <HighlightOff />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid spacing={1} container>
            <Grid item xs={12} sm={6} md={4}>
              <Typography sx={{ mt: 2 }}>نام</Typography>
              <TextField
                value={info?.name}
                name={"name"}
                onChange={handleChange}
                fullWidth={true}
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography sx={{ mt: 2 }}>واحد</Typography>
              <TextField
                value={info?.unit}
                name={"unit"}
                onChange={handleChange}
                fullWidth={true}
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography sx={{ mt: 2 }}>توضیحات</Typography>
              <TextField
                value={info?.description}
                name={"description"}
                onChange={handleChange}
                fullWidth={true}
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography sx={{ mt: 2 }}>گارانتی</Typography>
              <TextField
                value={info?.garanti}
                name={"garanti"}
                onChange={handleChange}
                fullWidth={true}
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth={true}>
                <Typography sx={{ mt: 2 }}>تامین کننده ها</Typography>
                <Select
                  sx={{ mt: 2 }}
                  value={info?.suppliersIds ?? []}
                  labelId={"suppliersIds"}
                  fullWidth={true}
                  name={"suppliersIds"}
                  onChange={handleChange}
                  multiple
                >
                  {suppliers?.data?.map((item) => (
                    <MenuItem value={item.id} key={item?.id}>
                      {item?.supplierName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth={true}>
                <Typography sx={{ mt: 2 }}>تولید کننده</Typography>
                <Select
                  sx={{ mt: 2 }}
                  value={info?.producerId}
                  labelId={"producerId"}
                  fullWidth={true}
                  name={"producerId"}
                  onChange={handleChange}
                >
                  {producers?.data?.map((item) => (
                    <MenuItem value={item.id} key={item?.id}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth={true}>
                <Typography sx={{ mt: 2 }}>انبار ها</Typography>
                <Select
                  sx={{ mt: 2 }}
                  value={info?.warehouses}
                  labelId={"warehouses"}
                  fullWidth={true}
                  name={"warehouses"}
                  onChange={handleChange}
                  multiple
                >
                  {warehouses?.data?.map((item) => (
                    <MenuItem value={item.id} key={item?.id}>
                      {item?.warehouseName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
          <FormControl fullWidth={true}>
            <Typography sx={{ mt: 2, mb: 1 }}>نقش تجاری</Typography>
            <Select
              multiple
              value={info?.businessRoleIds}
              labelId={"businessRoleIds"}
              fullWidth={true}
              name={"businessRoleIds"}
              label={"نقش تجاری"}
              onChange={handleChange}
            >
              {businessRoles?.data?.map((item) => (
                <MenuItem value={item.id} key={item?.id}>
                  {item?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ width: "100%" }}>
            <Typography sx={{ mt: 2, mb: 1 }}>خصوصیات</Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                my: 1,
              }}
            >
              {info?.props?.map((item) => (
                <Chip
                  label={`${item?.propName} : ${item?.propValue}`}
                  onDelete={() => handleDeleteProp(item)}
                />
              ))}
            </Box>
            {showAddProp && (
              <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                  <TextField
                    value={propVal?.propName}
                    name={"propName"}
                    onChange={handleChangeProp}
                    placeholder={"نام خصوصیت"}
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Select
                    value={propVal?.propType}
                    placeholder="نوع خصوصیت"
                    fullWidth={true}
                    name={"propType"}
                    onChange={handleChangeProp}
                  >
                    <MenuItem value={"integer"}>عدد</MenuItem>
                    <MenuItem value={"string"}>رشته</MenuItem>
                    <MenuItem value={"date"}>تاریخ</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    value={propVal?.propValue}
                    name={"propValue"}
                    onChange={handleChangeProp}
                    placeholder={"مقدار خصوصیت"}
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    disabled={
                      !propVal?.propName ||
                      !propVal?.propType ||
                      !propVal?.propValue
                    }
                    fullWidth={true}
                    variant={"contained"}
                    color={"primary"}
                    onClick={handleAddProp}
                  >
                    تایید خصوصیت
                  </Button>
                </Grid>
              </Grid>
            )}
            <Button
              sx={{ my: 1 }}
              fullWidth={true}
              variant={"outlined"}
              startIcon={<Add />}
              onClick={() => setShowAddProp(true)}
            >
              افزودن خصوصیت
            </Button>
          </Box>
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
