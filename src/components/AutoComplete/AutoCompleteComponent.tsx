import { Autocomplete, TextField } from '@mui/material';
import { boolean } from 'yup';
interface IAutoCompleteProps {
  disablePortal?: boolean;
  id: string;
  options: any;
  label: string;
  changeHandler: any;
  value: any;
  dataId?: string;
  dataLabel?: string | string[];
  multiple?: boolean;
  sx?: any;
  disabled?: boolean;
}
const AutoCompleteComponent = ({
  disablePortal = false,
  id,
  options,
  label,
  changeHandler,
  value,
  dataId = 'id',
  dataLabel = 'name',
  multiple = false,
  sx = {},
  disabled = false,
}: IAutoCompleteProps) => {
  return (
    <Autocomplete
      disablePortal={disablePortal}
      id={id}
      value={
        multiple
          ? options
              ?.map((op) => ({
                id: op[dataId],
                label: op[dataLabel as string],
              }))
              ?.filter((op) => value?.includes(op[dataId])) || []
          : options
              ?.map((op) => ({
                id: op[dataId],
                label: Array.isArray(dataLabel)
                  ? `${op[dataLabel[0]]} ${op[dataLabel[1]]}`
                  : op[dataLabel],
              }))
              ?.find((op) => op[dataId] == value) || {
              id: 0,
              label: '',
            }
      }
      options={
        options?.map((op) => ({
          id: op[dataId],
          label: Array.isArray(dataLabel)
            ? `${op[dataLabel[0]]} ${op[dataLabel[1]]}`
            : op[dataLabel],
        })) || []
      }
      onChange={(e, value: any) =>
        multiple
          ? changeHandler?.(value.map((v) => v?.id))
          : changeHandler?.(value?.id)
      }
      renderInput={(params) => <TextField {...params} label={label} />}
      sx={sx}
      multiple={multiple}
      disabled={disabled}
      defaultValue={
        multiple
          ? [
              {
                id: 0,
                label: '',
              },
            ]
          : {
              id: 0,
              label: '',
            }
      }
    />
  );
};

export default AutoCompleteComponent;
