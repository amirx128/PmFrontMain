import {
  Button,
  CircularProgress,
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
  GetUsabilityDataAction,
  UpdateUsabilityAction,
} from "../../redux/features/qcSlicer.ts";
import AutoCompleteComponent from "../AutoComplete/AutoCompleteComponent.tsx";

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
  const { selectedUsability: usaSelected } = useSelector(
    (state: any) => state.qc
  );
  const getUsabilityData = useCallback(async () => {
    if (selectedUsability) {
      await dispatch(
        GetUsabilityDataAction({ selectedItemId: selectedUsability.id })
      );
    }
  }, [selectedUsability]);
  useEffect(() => {
    if (!selectedUsability) {
      setInfo({
        usablityName: "",
        units: [selectedUsability?.id],
        code: "",
      });
    }
  }, [selectedUsability, selectedUnit, getUsabilityData]);
  useEffect(() => {
    if (usaSelected.data) {
      setInfo({
        usablityName: usaSelected?.data.usablityName,
        units: usaSelected?.data.units?.map((u) => u.id),
        code: usaSelected?.data.code,
      });
    }
  }, [usaSelected]);

  useEffect(() => {
    getUsabilityData();
  }, [selectedUsability, getUsabilityData]);
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
        {usaSelected.pending && <CircularProgress />}
        {!usaSelected.pending && (
          <>
            {" "}
            <TextField
              value={info?.usablityName}
              name={"usablityName"}
              onChange={handleChange}
              label={"نام"}
              sx={{ mt: 2, width: "50%" }}
            />
            <FormControl sx={{ mt: 2, width: "50%" }}>
              <AutoCompleteComponent
                sx={{ mt: 2 }}
                options={units?.data}
                id="units"
                label="واحد"
                changeHandler={(value) =>
                  setInfo((prev) => ({ ...prev, units: value }))
                }
                value={info?.units || []}
                multiple={true}
              />
            </FormControl>
            <TextField
              value={info?.code}
              name={"code"}
              onChange={handleChange}
              label={"کد"}
              sx={{ mt: 2, width: "50%" }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} color={"success"} onClick={onSubmit}>
          ثبت
        </Button>
      </DialogActions>
    </Dialog>
  );
};
