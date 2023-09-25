import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  useMediaQuery,
  DialogActions,
  Button,
  CircularProgress,
  FormControl,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { HighlightOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddWarehouse as AddNewWarehouse,
  AddNewProject,
  UpdateWarehouseInfo,
  UpdateProject,
} from "../../redux/features/definitionSlicer.ts";
import { toast } from "react-toastify";

export const AddWarehouse = ({
  addWarehouseDialog,
  selectedWarehouse,
  onClose,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch<any>();
  const mediumOrSmaller = useMediaQuery(theme.breakpoints.down("sm"));
  const [info, setInfo] = useState({
    name: selectedWarehouse?.warehouseName,
    desc: selectedWarehouse?.descriptions,
    relatedCommodities: selectedWarehouse?.relatedCommodities,
    projects: selectedWarehouse?.projects,
  });
  console.log(selectedWarehouse);
  const { projects, commodities } = useSelector(
    (state: any) => state.definition
  );

  useEffect(() => {
    if (selectedWarehouse) {
      setInfo({
        name: selectedWarehouse?.warehouseName,
        desc: selectedWarehouse?.descriptions,
        relatedCommodities: selectedWarehouse?.relatedCommodities,
        projects: selectedWarehouse?.projects,
      });
    } else {
      setInfo({
        name: "",
        desc: "",
        relatedCommodities: [],
        projects: [],
      });
    }
  }, [selectedWarehouse]);
  const { scheduledActivities } = useSelector((state: any) => state.definition);
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target?.name]: e.target?.value,
    });
  };

  const onSubmit = () => {
    const model = {
      ...info,
    };
    if (selectedWarehouse) {
      dispatch(UpdateWarehouseInfo({ ...model, id: selectedWarehouse?.id }));
    } else {
      dispatch(AddNewWarehouse(model));
    }
    onClose();
  };
  return (
    <Dialog
      open={addWarehouseDialog}
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
        {selectedWarehouse ? "ویرایش انبار" : "افزودن انبار"}
        <IconButton color={"error"} onClick={onClose}>
          <HighlightOff />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", gap: "5px" }}>
            <TextField
              value={info?.name}
              name={"name"}
              onChange={handleChange}
              label={"نام انبار"}
              fullWidth={true}
            />
          </div>
          <FormControl fullWidth={true}>
            <Typography sx={{ mt: 2 }}>کالا ها</Typography>
            <Select
              sx={{ mt: 2 }}
              value={info?.relatedCommodities}
              labelId={"relatedCommodities"}
              fullWidth={true}
              name={"relatedCommodities"}
              onChange={handleChange}
              placeholder="کالا ها"
              multiple
            >
              {commodities?.data?.map((item) => (
                <MenuItem value={item?.id}>{item?.serchableName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth={true}>
            <Typography sx={{ mt: 2 }}>پروژه ها</Typography>
            <Select
              sx={{ mt: 2 }}
              value={info?.projects}
              labelId={"projects"}
              fullWidth={true}
              name={"projects"}
              onChange={handleChange}
              placeholder="پروژه ها"
              multiple
            >
              {projects?.data?.map((item) => (
                <MenuItem value={item?.id}>{item?.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} color={"success"} onClick={onSubmit}>
          {scheduledActivities?.addState ? <CircularProgress /> : "ثبت"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
