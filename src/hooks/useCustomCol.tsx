import { useState, useCallback, useEffect } from 'react';
import axiosInstance from '../utils/axios.config';
import * as gridFunctions from './../utils/gridFunctions';
import gridFunctionsEnum from '../models/gridFunctionsEnum';
const useCustomCol = (
  gridName,
  defColumns,
  handleEditClick = undefined,
  handleCustomAction = undefined,
  handleRemoveClick = undefined
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [columns, setColumns] = useState([]);
  const [tempColumns, setTempColumns] = useState([]);
  const [checkedItems, setChecedItems] = useState([]);

  const processColumns = (cols, injectOrder = false) => {
    return cols.map((col, index) => {
      const baseColumn = injectOrder
        ? { ...col, order: index, isActive: true }
        : { ...col };

      if (Object.keys(col).includes('renderType')) {
        let renderCell;

        if (col.renderType === gridFunctionsEnum.actionEditColumn) {
          renderCell = (params) =>
            gridFunctions.actionEditColumn(params, handleEditClick);
        } else if (
          col.renderType === gridFunctionsEnum.actionEditAndRemoveColumn
        ) {
          renderCell = (params) =>
            gridFunctions.actionEditAndRemoveColumn(
              params,
              handleEditClick,
              handleRemoveClick
            );
        } else if (col.renderType === gridFunctionsEnum.actionCustom) {
          renderCell = (params) =>
            gridFunctions.actionCustom(params, handleCustomAction);
        } else {
          renderCell = gridFunctions[col.renderType];
        }

        return { ...baseColumn, renderCell };
      }

      return baseColumn;
    });
  };

  const getColumns = useCallback(async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await axiosInstance.post(
        '/AccountCountroller/GetGridColumns',
        {
          userId: user.id,
          gridName,
        }
      );

      if (res?.data?.model) {
        const savedCols = JSON.parse(res.data.model.grigConfigs).sort(
          (a, b) => +a.order - +b.order
        );

        const processedColumns = processColumns(savedCols);
        setColumns(processedColumns.filter((c) => c.isActive));
        setTempColumns(processedColumns);
      } else {
        const processedColumns = processColumns(defColumns, true);
        setColumns(processedColumns.filter((c) => c.isActive));
        setTempColumns(processedColumns);
      }
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  }, [gridName, defColumns]);

  useEffect(() => {
    getColumns();
  }, [getColumns]);
  const handleShowModal = () => setIsShowModal(true);
  const handleCloseModal = () => setIsShowModal(false);
  const handleSaveColumnsChanges = async () => {
    setIsLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));

      const columnsForSaving = tempColumns.map((col) => {
        if (Object.keys(col).includes('renderCell')) {
          return { ...col, renderCell: col.renderCell.toString() };
        }
        return col;
      });

      const res = await axiosInstance.post(
        '/AccountCountroller/SaveGridColumn',
        {
          userId: user.id,
          gridName,
          gridConfigs: JSON.stringify(columnsForSaving),
        }
      );

      if (res?.data.model) {
        await getColumns();
        setIsShowModal(false);
      }
    } catch (error) {
      console.error('Error saving column configuration:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChangeCheckbox = (e, column) => {
    setTempColumns((prev) =>
      prev.map((col) =>
        col.field === column.field
          ? { ...col, isActive: !!e.target.checked }
          : col
      )
    );
  };
  const handleChangeSort = (mode, column) => {
    const currentColumn = tempColumns.find((col) => col.field === column.field);
    const currentOrder = +currentColumn.order;

    if (mode === 'up' && currentOrder > 0) {
      const targetColumn = tempColumns.find(
        (col) => +col.order === currentOrder - 1
      );

      setTempColumns((prev) =>
        prev.map((col) => {
          if (col.field === currentColumn.field)
            return { ...col, order: currentOrder - 1 };
          if (col.field === targetColumn.field)
            return { ...col, order: currentOrder };
          return col;
        })
      );
    }

    if (mode === 'down') {
      const targetColumn = tempColumns.find(
        (col) => +col.order === currentOrder + 1
      );

      if (targetColumn) {
        setTempColumns((prev) =>
          prev.map((col) => {
            if (col.field === currentColumn.field)
              return { ...col, order: currentOrder + 1 };
            if (col.field === targetColumn.field)
              return { ...col, order: currentOrder };
            return col;
          })
        );
      }
    }
  };
  const handleSelectAll = () => {
    const resetColumns = defColumns.map((column, index) => ({
      ...column,
      order: index,
      isActive: true,
    }));

    setTempColumns(processColumns(resetColumns, false));
  };

  return {
    isLoading,
    isShowModal,
    handleShowModal,
    columns,
    tempColumns,
    handleChangeCheckbox,
    handleChangeSort,
    handleCloseModal,
    handleSaveColumnsChanges,
    handleSelectAll,
  };
};

export default useCustomCol;
