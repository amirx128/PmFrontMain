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
  MenuItem,
  Select,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { HighlightOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNewPerson,
  AddNewProject,
  UpdatePerson,
  UpdateProject,
} from "../../redux/features/definitionSlicer.ts";
import { toast } from "react-toastify";
import AutoCompleteComponent from "../AutoComplete/AutoCompleteComponent.tsx";

export const AddPerson = ({ addPersonsDialog, selectedPerson, onClose }) => {
  const theme = useTheme();
  const dispatch = useDispatch<any>();
  const mediumOrSmaller = useMediaQuery(theme.breakpoints.down("sm"));
  const [info, setInfo] = useState({
    firstName: selectedPerson?.firstName,
    lastName: selectedPerson?.lastName,
    nationalCode: selectedPerson?.nationalCode,
    mobileNumber: selectedPerson?.mobileNumber,
    phoneNumber: selectedPerson?.phoneNumber,
    address: selectedPerson?.address,
    otherDescriptions: selectedPerson?.otherDescriptions,
    businessRoles: selectedPerson?.businessRoles?.map((item) => item.id),
  });

  useEffect(() => {
    if (selectedPerson) {
      setInfo({
        firstName: selectedPerson?.firstName,
        lastName: selectedPerson?.lastName,
        nationalCode: selectedPerson?.nationalCode,
        mobileNumber: selectedPerson?.mobileNumber,
        phoneNumber: selectedPerson?.phoneNumber,
        address: selectedPerson?.address,
        otherDescriptions: selectedPerson?.otherDescriptions,
        businessRoles: selectedPerson?.businessRoles?.map((item) => item.id),
      });
    } else {
      setInfo({
        firstName: "",
        lastName: "",
        nationalCode: "",
        mobileNumber: "",
        phoneNumber: "",
        address: "",
        otherDescriptions: "",
        businessRoles: [],
      });
    }
  }, [selectedPerson]);
  const { businessRoles } = useSelector((state: any) => state.definition);

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target?.name]: e.target?.value,
    });
  };

  const onSubmit = () => {
    if (selectedPerson) {
      dispatch(UpdatePerson({ id: selectedPerson?.id, ...info }));
    } else {
      dispatch(AddNewPerson({ ...info }));
    }
    onClose();
  };
  return (
    <Dialog
      open={addPersonsDialog}
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
        {selectedPerson ? "ویرایش شخص" : "افزودن شخص"}
        <IconButton color={"error"} onClick={onClose}>
          <HighlightOff />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          value={info?.firstName}
          name={"firstName"}
          onChange={handleChange}
          label={"نام"}
          fullWidth={true}
          sx={{ mt: 2 }}
        />
        <TextField
          value={info?.lastName}
          name={"lastName"}
          onChange={handleChange}
          label={"نام خانوادگی"}
          fullWidth={true}
          sx={{ mt: 2 }}
        />
        <TextField
          value={info?.nationalCode}
          name={"nationalCode"}
          onChange={handleChange}
          label={"کد ملی"}
          fullWidth={true}
          sx={{ mt: 2 }}
        />
        <TextField
          value={info?.phoneNumber}
          name={"phoneNumber"}
          onChange={handleChange}
          label={"شماره تماس"}
          fullWidth={true}
          sx={{ mt: 2 }}
        />
        <TextField
          value={info?.mobileNumber}
          name={"mobileNumber"}
          onChange={handleChange}
          label={"شماره موبایل"}
          fullWidth={true}
          sx={{ mt: 2 }}
        />
        <TextField
          value={info?.address}
          name={"address"}
          onChange={handleChange}
          label={"آدرس"}
          fullWidth={true}
          sx={{ mt: 2 }}
        />
        <TextField
          value={info?.otherDescriptions}
          name={"otherDescriptions"}
          onChange={handleChange}
          label={"توضیحات"}
          fullWidth={true}
          sx={{ mt: 2 }}
        />
        <AutoCompleteComponent
          sx={{ mt: 2 }}
          options={businessRoles?.data}
          id="businessRoles"
          label="نقش تجاری"
          changeHandler={(value) =>
            setInfo((prev) => ({ ...prev, businessRoles: value }))
          }
          value={info?.businessRoles || []}
          multiple={true}
        />
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} color={"success"} onClick={onSubmit}>
          {businessRoles?.addState ? <CircularProgress /> : "ثبت"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
