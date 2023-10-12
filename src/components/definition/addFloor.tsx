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
  Select,
  MenuItem,
  FormControl,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { HighlightOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNewFloor,
  AddNewProject,
  UpdateFloor,
  GetAllCommodities,
} from "../../redux/features/definitionSlicer.ts";
import { toast } from "react-toastify";

export const AddFloor = ({
  addFloorDialog,
  selectedFloor,
  onClose,
  setCurrentProject,
  currentProject,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch<any>();
  const mediumOrSmaller = useMediaQuery(theme.breakpoints.down("sm"));
  const [info, setInfo] = useState({
    floorName: selectedFloor?.name,
    projectId: selectedFloor?.projectId,
    code: selectedFloor?.code,
    commodities: selectedFloor?.commodities,
  });
  const { projects, commodities } = useSelector(
    (state: any) => state.definition
  );

  useEffect(() => {
    if (selectedFloor) {
      setInfo({
        floorName: selectedFloor?.name,
        projectId: selectedFloor?.projectId,
        code: selectedFloor?.code,
        commodities: selectedFloor?.commodities,
      });
    } else {
      setInfo({
        floorName: "",
        projectId: currentProject.id,
        code: "",
        commodities: [],
      });
    }
  }, [selectedFloor]);
  useEffect(() => {
    getAllCommodities();
  }, []);

  const getAllCommodities = async () => {
    await dispatch(GetAllCommodities());
  };
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target?.name]: e.target?.value,
    });
  };

  const onSubmit = () => {
    if (selectedFloor) {
      dispatch(
        UpdateFloor({
          id: selectedFloor?.id,
          floorName: info.floorName,
          code: info.code,
          projectId: info.projectId,
          commodities: info.commodities,
        })
      );
    } else {
      dispatch(
        AddNewFloor({
          floorName: info.floorName,
          code: info.code,
          projectId: info.projectId,
          commodities: info.commodities,
        })
      );
    }
    onClose();
  };
  return (
    <Dialog
      open={addFloorDialog}
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
        {selectedFloor ? "ویرایش طبقه" : "افزودن طبقه"}
        <IconButton color={"error"} onClick={onClose}>
          <HighlightOff />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          value={info?.floorName}
          name={"floorName"}
          onChange={handleChange}
          label={"نام طبقه"}
          fullWidth={true}
          sx={{ mt: 2 }}
        />
        <TextField
          value={info?.code}
          name={"code"}
          onChange={handleChange}
          label={"کد طبقه"}
          fullWidth={true}
          sx={{ mt: 2 }}
        />
        <Select
          value={info?.projectId}
          fullWidth={true}
          name={"projectId"}
          label={"پروژه"}
          onChange={handleChange}
          sx={{ mt: 2 }}
        >
          {projects?.data?.map((item) => (
            <MenuItem value={item.id} key={item?.id}>
              {item?.name}
            </MenuItem>
          ))}
        </Select>
        <FormControl fullWidth={true}>
          <Typography sx={{ mt: 2 }}>کالا ها</Typography>
          <Select
            sx={{ mt: 2 }}
            value={info?.commodities}
            labelId={"commodities"}
            fullWidth={true}
            name={"commodities"}
            onChange={handleChange}
            placeholder="کالا ها"
            multiple
          >
            {commodities?.data?.map((item) => (
              <MenuItem value={item?.id}>{item?.serchableName}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} color={"success"} onClick={onSubmit}>
          {projects?.addState ? <CircularProgress /> : "ثبت"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
