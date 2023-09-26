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
  AddNewPerson, AddNewProducer,
  AddNewProject,
  UpdatePerson, UpdateProducerInfo,
  UpdateProject,
} from "../../redux/features/definitionSlicer.ts";
import { toast } from "react-toastify";

export const AddProducer = ({ addProducerDialog, selectedProducer, onClose }) => {
  const theme = useTheme();
  const dispatch = useDispatch<any>();
  const mediumOrSmaller = useMediaQuery(theme.breakpoints.down("sm"));
  const [info, setInfo] = useState({
    name: selectedProducer?.mobileNumber,
    mobileNumber: selectedProducer?.mobileNumber,
    phoneNumber: selectedProducer?.phoneNumber,
    address: selectedProducer?.address,
    descriptions: selectedProducer?.descriptions,
    businessRoles: selectedProducer?.businessRoles?.map((item) => item.id),
  });

  useEffect(() => {
    if (selectedProducer) {
      setInfo({
        name: selectedProducer?.name,
        mobileNumber: selectedProducer?.mobileNumber,
        phoneNumber: selectedProducer?.phoneNumber,
        address: selectedProducer?.address,
        descriptions: selectedProducer?.descriptions,
        businessRoles: selectedProducer?.businessRoles?.map((item) => item.id),
      });
    } else {
      setInfo({
        name: "",
        mobileNumber: "",
        phoneNumber: "",
        address: "",
        descriptions: "",
        businessRoles: [],
      });
    }
  }, [selectedProducer]);
  const { businessRoles } = useSelector((state: any) => state.definition);

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target?.name]: e.target?.value,
    });
  };

  const onSubmit = () => {
    if (selectedProducer) {
      dispatch(UpdateProducerInfo({ id: selectedProducer?.id, ...info }));
    } else {
      dispatch(AddNewProducer({ ...info }));
    }
    onClose();
  };
  return (
    <Dialog
      open={addProducerDialog}
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
        {selectedProducer ? "ویرایش تولید کننده" : "افزودن تولید کننده"}
        <IconButton color={"error"} onClick={onClose}>
          <HighlightOff />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          value={info?.name}
          name={"name"}
          onChange={handleChange}
          label={"نام"}
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
          value={info?.descriptions}
          name={"descriptions"}
          onChange={handleChange}
          label={"توضیحات"}
          fullWidth={true}
          sx={{ mt: 2 }}
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
