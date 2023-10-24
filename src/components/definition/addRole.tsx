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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { HighlightOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNewBusinessRole,
  AddNewProject,
  UpdateBusinessRole,
  UpdateProject,
} from "../../redux/features/definitionSlicer.ts";
import { toast } from "react-toastify";
import AutoCompleteComponent from "../AutoComplete/AutoCompleteComponent.tsx";

export const AddRole = ({ addRolesDialog, selectedRole, onClose }) => {
  const theme = useTheme();
  const dispatch = useDispatch<any>();
  const mediumOrSmaller = useMediaQuery(theme.breakpoints.down("sm"));
  const [info, setInfo] = useState({
    name: selectedRole?.name,
    title: selectedRole?.title,
    projectId: selectedRole?.projectId,
  });

  useEffect(() => {
    if (selectedRole) {
      setInfo({
        name: selectedRole?.name,
        title: selectedRole?.title,
        projectId: selectedRole?.projectId,
      });
    } else {
      setInfo({
        name: "",
        title: "",
        projectId: "",
      });
    }
  }, [selectedRole]);
  const { businessRoles, projects } = useSelector(
    (state: any) => state.definition
  );
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target?.name]: e.target?.value,
    });
  };

  const onSubmit = () => {
    if (selectedRole) {
      dispatch(UpdateBusinessRole({ id: selectedRole?.id, ...info }));
    } else {
      dispatch(AddNewBusinessRole(info));
    }
    onClose();
  };
  return (
    <Dialog
      open={addRolesDialog}
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
        {selectedRole ? "ویرایش نقش تجاری" : "افزودن نقش تجاری"}
        <IconButton color={"error"} onClick={onClose}>
          <HighlightOff />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          value={info?.name}
          name={"name"}
          onChange={handleChange}
          label={"نام نقش"}
          fullWidth={true}
          sx={{ mt: 2 }}
        />
        <TextField
          value={info?.title}
          name={"title"}
          onChange={handleChange}
          label={"عنوان نقش"}
          fullWidth={true}
          sx={{ mt: 2 }}
        />
        <AutoCompleteComponent
          sx={{ mt: 2 }}
          options={projects?.data}
          id="projectId"
          label="پروژه"
          changeHandler={(value) =>
            setInfo((prev) => ({ ...prev, projectId: value }))
          }
          value={info?.projectId}
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
