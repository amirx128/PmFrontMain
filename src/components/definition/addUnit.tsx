import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { HighlightOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNewUnit,
  getAllFloors,
  UpdateUnit,
  GetAllCommodities,
} from "../../redux/features/definitionSlicer.ts";

export const AddUnit = ({
  addUnitDialog,
  selectedUnit,
  onClose,
  currentProject,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch<any>();
  const mediumOrSmaller = useMediaQuery(theme.breakpoints.down("sm"));
  const [info, setInfo] = useState({
    unitName: selectedUnit?.name,
    projectId: currentProject?.id,
    projectfloorId: selectedUnit?.projectfloorId,
    code: selectedUnit?.code,
    commodities: selectedUnit?.commodities,
  });
  const { projects, units, floors, commodities } = useSelector(
    (state: any) => state.definition
  );

  useEffect(() => {
    if (currentProject) {
      dispatch(getAllFloors(currentProject?.id));
      setInfo({ ...info, projectId: currentProject?.id });
    }
  }, [currentProject]);

  useEffect(() => {
    if (selectedUnit) {
      setInfo({
        unitName: selectedUnit?.name,
        projectId: currentProject?.id,
        projectfloorId: selectedUnit?.projectfloorId,
        code: selectedUnit?.code,
        commodities: selectedUnit?.commodities,
      });
    } else {
      setInfo({
        unitName: "",
        projectId: currentProject?.id ?? null,
        projectfloorId: null,
        code: "",
        commodities: [],
      });
    }
  }, [selectedUnit]);
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
    if (selectedUnit) {
      dispatch(
        UpdateUnit({
          id: selectedUnit?.id,
          unitName: info.unitName,
          projectfloorId: info.projectfloorId,
          code: info.code,
          projectId: currentProject?.id,
          commodities: info.commodities,
        })
      );
    } else {
      dispatch(
        AddNewUnit({
          unitName: info.unitName,
          projectfloorId: info.projectfloorId,
          code: info.code,
          projectId: currentProject?.id,
          commodities: info.commodities,
        })
      );
    }
    onClose();
  };
  return (
    <Dialog
      open={addUnitDialog}
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
        {selectedUnit ? "ویرایش واحد" : "افزودن واحد"}
        <IconButton color={"error"} onClick={onClose}>
          <HighlightOff />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          value={info?.unitName}
          name={"unitName"}
          onChange={handleChange}
          label={"نام واحد"}
          fullWidth={true}
          sx={{ mt: 2 }}
        />
        <TextField
          value={info?.code}
          name={"code"}
          onChange={handleChange}
          label={"کد واحد"}
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
        <Select
          value={info?.projectfloorId}
          fullWidth={true}
          name={"projectfloorId"}
          label={"طبقه"}
          onChange={handleChange}
          sx={{ mt: 2 }}
        >
          {floors?.data?.map((item) => (
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
          {units?.addState ? <CircularProgress /> : "ثبت"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
