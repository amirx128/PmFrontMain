import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const CustomizeGrid = ({
  showModal,
  handleClose,
  handleSelectAll,
  columns,
  handleChangeCheckbox,
  handleChangeSort,
  handleSave,
  isSaveLoading,
}) => {
  return (
    <Dialog open={showModal} onClose={handleClose} maxWidth={"lg"}>
      <DialogTitle>شخصی سازی ستون ها</DialogTitle>
      <DialogContent className=" mt-10 flex flex-col gap-12">
        <Button variant="outlined" color="secondary" onClick={handleSelectAll}>
          انتخاب همه
        </Button>
        <div className="grid grid-cols-2 gap-x-56 gap-y-6">
          {columns
            .sort((a, b) => +a.order - +b.order)
            .map((column) => (
              <div key={column.field} className="flex items-center text-center">
                <p>{column.order + 1}-</p>

                <p className="w-48">{column.headerName}</p>
                <Checkbox
                  checked={
                    columns.find((c) => c.field === column.field).isActive
                  }
                  onChange={(e) => handleChangeCheckbox(e, column)}
                />
                <div className="flex flex-col">
                  {column.order !== 0 && (
                    <IconButton
                      color="success"
                      onClick={() => {
                        handleChangeSort("up", column);
                      }}
                    >
                      <ArrowDropUpIcon />
                    </IconButton>
                  )}
                  {column.order !== columns.length - 1 && (
                    <IconButton
                      color="error"
                      onClick={() => handleChangeSort("down", column)}
                    >
                      <ArrowDropDownIcon />
                    </IconButton>
                  )}
                </div>
              </div>
            ))}
        </div>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant="outlined"
          color="success"
          onClick={handleSave}
          loading={isSaveLoading}
        >
          ذخیره
        </LoadingButton>
        <Button
          variant="outlined"
          color="error"
          disabled={isSaveLoading}
          onClick={handleClose}
        >
          انصراف
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomizeGrid;
