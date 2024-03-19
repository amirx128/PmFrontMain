import { useState } from 'react';
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridColDef,
  GridPaginationInitialState,
  GridToolbar,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { GridWrapper } from './style';
import { useTheme } from '@emotion/react';

interface Iprops {
  columns: GridColDef[];
  rows: any[];
  loading?: boolean;
  rowIdFields?: string[];
  pagination?: GridPaginationInitialState;
  onFilterCahnge?: (...args: any) => void;
  onSortModelChange?: (...args: any) => void;
  onDoubleClick?: (...args: any) => void;
  checkboxSelection?: boolean;
  selectMode?: 'single' | 'multiple';
  onRowSelected?: (...args: any) => void;
  seletedRow?: any;
}
const Grid: React.FC<Iprops> = ({
  columns,
  rows,
  loading,
  rowIdFields,
  pagination = {},
  onFilterCahnge,
  onSortModelChange,
  onDoubleClick,
  selectMode = 'multiple',
  onRowSelected,
  seletedRow,
}: Iprops) => {
  const theme = useTheme();

  const [selectionMode, setSelectionMode] = useState([]);
  return (
    <GridWrapper theme={theme}>
      <Box sx={{ height: 'unset', width: '100%' }}>
        <DataGrid
          sx={{ ml: 'auto', direction: 'ltr' }}
          rows={rows.map((row, index) => ({ ...row }))}
          columns={columns}
          initialState={{
            pagination: {
              ...pagination,
              paginationModel: pagination.paginationModel,
            },
          }}
          pageSizeOptions={[5, 10, 15]}
          checkboxSelection
          filterMode="server"
          sortingMode="server"
          onRowDoubleClick={onDoubleClick}
          loading={!rows.length || loading}
          onSortModelChange={onSortModelChange}
          onFilterModelChange={onFilterCahnge}
          getRowId={(row) => row.id}
          onRowSelectionModelChange={(selectionModel) => {
            if (selectMode === 'single') {
              setSelectionMode((prev) =>
                selectionModel.filter((newId) => !prev.includes(newId))
              );
            } else if (selectMode === 'multiple') {
              setSelectionMode(selectionModel);
            }
            onRowSelected?.(selectionModel);
          }}
          rowSelectionModel={seletedRow || selectionMode}
        />
      </Box>
    </GridWrapper>
  );
};
export default Grid;
