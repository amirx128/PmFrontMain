import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetManyUnitUsabilityAction } from "../../redux/features/definitionSlicer.ts";

export const ShowUsability = ({
  showUsabilityDialog,
  selectedUnit,
  setSelectedUsability,
  onClose,
  setAddUnitDialog,
  setAddUsabilityDialog,
}) => {
  const dispatch = useDispatch<any>();
  const { manyUnitUsability } = useSelector((state: any) => state?.definition);

  const getUnitsUsabilitis = useCallback(async () => {
    await dispatch(GetManyUnitUsabilityAction({ ids: [selectedUnit.id] }));
  }, [dispatch, selectedUnit]);

  useEffect(() => {
    getUnitsUsabilitis();
  }, [getUnitsUsabilitis]);

  const handleEditUsability = (usability) => {
    setSelectedUsability(usability);
    setAddUsabilityDialog(true);
  };
  return (
    <Dialog
      open={showUsabilityDialog}
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
        کاربری ها
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            variant="outlined"
            color="info"
            onClick={() => setAddUnitDialog(true)}
          >
            ویرایش واحد {selectedUnit?.name}
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => {
              setSelectedUsability(null);
              setAddUsabilityDialog(true);
            }}
          >
            افزودن کاربری
          </Button>
        </div>
      </DialogTitle>
      {manyUnitUsability && (
        <DialogContent>
          <ListItem className="grid grid-cols-4">
            {!!manyUnitUsability?.data?.length || <p>کاربری وجود ندارد</p>}
            {manyUnitUsability?.data.map((usability) => (
              <ListItemButton
                sx={{
                  "&:hover": {
                    backgroundColor: "lightblue",
                  },
                }}
                key={usability.id}
                onClick={() => handleEditUsability(usability)}
              >
                {`-`}
                <ListItemText primary={usability.usablityName} />
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
