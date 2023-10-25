import { Autocomplete, TextField } from "@mui/material";

const AutoCompleteComponent = ({
  disablePortal = true,
  id,
  options,
  label,
  changeHandler,
  value,
  dataId = "id",
  dataLabel = "name",
  multiple = false,
  sx = {},
}) => {
  return (
    <Autocomplete
      disablePortal={disablePortal}
      id={id}
      value={
        multiple
          ? options
              ?.map((op) => ({ id: op[dataId], label: op[dataLabel] }))
              ?.filter((op) => value?.includes(op[dataId])) || []
          : options
              ?.map((op) => ({ id: op[dataId], label: op[dataLabel] }))
              ?.find((op) => op[dataId] == value) || []
      }
      options={options?.map((op) => ({ id: op[dataId], label: op[dataLabel] }))}
      onChange={(e, value: any) =>
        multiple
          ? changeHandler?.(value.map((v) => v?.id))
          : changeHandler?.(value?.id)
      }
      renderInput={(params) => <TextField {...params} label={label} />}
      sx={sx}
      multiple={multiple}
      defaultValue={
        multiple
          ? [
              {
                id: 0,
                label: "",
              },
            ]
          : {
              id: 0,
              label: "",
            }
      }
    />
  );
};

export default AutoCompleteComponent;
