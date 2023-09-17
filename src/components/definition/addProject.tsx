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
import { HighlightOff, Label } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNewProject,
  UpdateProject,
  GetAllCommodities,
} from "../../redux/features/definitionSlicer.ts";
import { toast } from "react-toastify";

export const AddProject = ({ addProjectDialog, selectedProject, onClose }) => {
  const theme = useTheme();
  const dispatch = useDispatch<any>();
  const mediumOrSmaller = useMediaQuery(theme.breakpoints.down("sm"));
  const [info, setInfo] = useState({
    name: selectedProject?.name,
    commodities: selectedProject?.commodities,
  });

  const { projects, commodities } = useSelector(
    (state: any) => state.definition
  );
  useEffect(() => {
    if (selectedProject) {
      setInfo({
        name: selectedProject?.name,
        commodities: selectedProject?.commodities,
      });
    } else {
      setInfo({
        name: "",
        commodities: [],
      });
    }
  }, [selectedProject]);
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
    if (selectedProject) {
      dispatch(
        UpdateProject({
          id: selectedProject?.id,
          name: info.name,
          commodities: info.commodities,
        })
      );
    } else {
      dispatch(
        AddNewProject({ newName: info.name, commodities: info.commodities })
      );
    }
    onClose();
  };
  return (
    <Dialog
      open={addProjectDialog}
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
        {selectedProject ? "ویرایش پروژه" : "افزودن پروژه"}
        <IconButton color={"error"} onClick={onClose}>
          <HighlightOff />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          value={info?.name}
          name={"name"}
          onChange={handleChange}
          label={"نام پروژه"}
          fullWidth={true}
          sx={{ mt: 2 }}
        />
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
