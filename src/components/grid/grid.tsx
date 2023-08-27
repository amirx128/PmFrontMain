import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridPaginationInitialState,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { GridWrapper } from "./style";
import { useTheme } from "@emotion/react";

// {
//     paginationModel: {
//         pageSize: 5,
//     },
// },
interface Iprops {
  columns: GridColDef[];
  rows: any[];
  loading?: boolean;
  rowIdFields?: string[];
  pagination: GridPaginationInitialState;
  onFilterCahnge?: (...args: any) => void;
  onSortModelChange: (...args: any) => void;
  onDoubleClick?: (...args: any) => void;
}
const Grid: React.FC<Iprops> = (props: Iprops) => {
  const theme = useTheme();
  console.log(props);
  return (
    <GridWrapper theme={theme}>
      <Box sx={{ height: "unset", width: "100%" }}>
        <DataGrid
          sx={{ ml: "auto", direction: "ltr" }}
          rows={props.rows.map((row, index) => ({ ...row }))}
          columns={props.columns}
          initialState={{
            pagination: {
              ...props.pagination,
              paginationModel: { pageSize: 30 },
            },
          }}
          pageSizeOptions={[30]}
          checkboxSelection
          filterMode="server"
          sortingMode="server"
          onRowDoubleClick={props.onDoubleClick}
          loading={!props.rows.length || props.loading}
          onSortModelChange={props.onSortModelChange}
          onFilterModelChange={props.onFilterCahnge}
          getRowId={(row) => row.id}
        />
      </Box>
    </GridWrapper>
  );
};
export default Grid;
