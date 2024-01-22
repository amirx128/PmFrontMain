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
import AutoCompleteComponent from "../AutoComplete/AutoCompleteComponent.tsx";

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
            <AutoCompleteComponent
              sx={{ mt: 2 }}
              options={commodities?.data}
              id="relatedCommodities"
              label="کالا ها"
              changeHandler={(value) =>
                setInfo((prev) => ({ ...prev, relatedCommodities: value }))
              }
              dataLabel="serchableName"
              value={info?.relatedCommodities || []}
              multiple={true}
            />
          </FormControl>
          <FormControl fullWidth={true}>
            <AutoCompleteComponent
              sx={{ mt: 2 }}
              options={projects?.data}
              id="projects"
              label="پروژه ها"
              changeHandler={(value) =>
                setInfo((prev) => ({ ...prev, projects: value }))
              }
              value={info?.projects || []}
              multiple={true}
            />
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
