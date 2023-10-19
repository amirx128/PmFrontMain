import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { HighlightOff } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUnits } from "../../redux/features/definitionSlicer.ts";
import {
  AddNewUsabilityAction,
  UpdateUsabilityAction,
} from "../../redux/features/qcSlicer.ts";

export const AddUsability = ({
  addUsabilityDialog,
  onClose,
  selectedUsability,
  selectedUnit,
}) => {
  const dispatch = useDispatch<any>();
  const [info, setInfo] = useState({
    usablityName: selectedUsability?.usablityName,
    units: selectedUsability?.units?.map((u) => u.id),
    code: selectedUsability?.code,
  });
  const { units } = useSelector((state: any) => state.definition);

  useEffect(() => {
    if (selectedUsability) {
      setInfo({
        usablityName: selectedUsability?.usablityName,
        units: selectedUsability?.units?.map((u) => u.id),
        code: selectedUsability?.code,
      });
    } else {
      setInfo({
        usablityName: "",
        units: [selectedUnit?.id],
        code: "",
      });
    }
  }, [selectedUsability, selectedUnit]);

  const getAllUnitsFn = useCallback(async () => {
    await dispatch(getAllUnits({ projectId: 0, floorId: 0 }));
  }, [dispatch]);

  useEffect(() => {
    getAllUnitsFn();
  }, [getAllUnitsFn]);

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target?.name]: e.target?.value,
    });
  };

  const onSubmit = () => {
    if (selectedUsability) {
      dispatch(
        UpdateUsabilityAction({
          id: +selectedUsability.id,
          code: info?.code,
          units: info?.units,
          usabilityName: info.usablityName,
        })
      );
    } else {
      dispatch(
        AddNewUsabilityAction({
          usabilityName: info.usablityName,
          code: info.code,
          units: info.units,
        })
      );
    }
    onClose();
  };

  return (
    <Dialog
      open={addUsabilityDialog}
      onClose={onClose}
      fullWidth={true}
      maxWidth={"md"}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {selectedUsability ? "ویرایش کاربری" : "افزودن کاربری"}
        <IconButton color={"error"} onClick={onClose}>
          <HighlightOff />
        </IconButton>
      </DialogTitle>
      <DialogContent className="flex flex-col gap-6">
        <TextField
          value={info?.usablityName}
          name={"usablityName"}
          onChange={handleChange}
          label={"نام"}
          sx={{ mt: 2, width: "50%" }}
        />
        <FormControl sx={{ mt: 2, width: "50%" }}>
          <InputLabel>واحد</InputLabel>
          <Select
            multiple
            value={info?.units}
            fullWidth={true}
            name={"units"}
            label="واحد"
            onChange={handleChange}
          >
            {units?.data?.map((item) => (
              <MenuItem value={item.id} key={item?.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          value={info?.code}
          name={"code"}
          onChange={handleChange}
          label={"کد"}
          sx={{ mt: 2, width: "50%" }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} color={"success"} onClick={onSubmit}>
          ثبت
        </Button>
      </DialogActions>
    </Dialog>
  );
};
