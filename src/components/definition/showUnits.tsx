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
  ListItem,
  ListItemButton,
  ListItemText,
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

export const ShowUnits = ({
  showUnitsDialog,
  selectedFloor,
  onClose,
  setAddFloorDialog,
  setSelectedUnit,
  setAddUnitDialog,
  setShowUsabilitiesDialog,
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
        projectId: null,
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
  const handleEditUnit = (unit) => {
    setSelectedUnit({ ...unit, projectfloorId: selectedFloor.id });
    setAddUnitDialog(true);
  };
  return (
    <Dialog
      open={showUnitsDialog}
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
        واحد ها
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            variant="outlined"
            color="info"
            onClick={() => setAddFloorDialog(true)}
          >
            ویرایش طبقه {selectedFloor?.name}
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => {
              setSelectedUnit(null);
              setAddUnitDialog(true);
            }}
          >
            افزودن واحد
          </Button>
        </div>
      </DialogTitle>
      {selectedFloor && (
        <DialogContent>
          <ListItem>
            {!!selectedFloor.projectUnit.length || <p>واحدی وجود ندارد</p>}
            {selectedFloor.projectUnit?.map((unit) => (
              <ListItemButton
                sx={{
                  "&:hover": {
                    backgroundColor: "lightblue",
                  },
                }}
                key={unit.id}
                onClick={() => {
                  // handleEditUnit(unit)
                  setSelectedUnit(unit);
                  setShowUsabilitiesDialog(true);
                }}
              >
                {`-`}
                <ListItemText primary={unit.name} />
              </ListItemButton>
            ))}
          </ListItem>
        </DialogContent>
      )}
      <DialogActions>
        <Button variant="outlined" color="error" onClick={onClose}>
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  );
};
