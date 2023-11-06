import React, { useState, useCallback, useEffect } from 'react';
import axiosInstance from '../utils/axios.config';
import * as gridFunctions from './../utils/gridFunctions';
import gridFunctionsEnum from '../models/gridFunctionsEnum';
const useCustomCol = (
  gridName,
  defColumns,
  handleEditClick = undefined,
  handleCustomAction = undefined
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [columns, setColumns] = useState([]);
  const [tempColumns, setTempColumns] = useState([]);

  const getColumns = useCallback(async () => {
    const res = await axiosInstance.post('/AccountCountroller/GetGridColumns', {
      userId: JSON.parse(localStorage.getItem('user')).id,
      gridName,
    });
    if (res?.data?.model) {
      const cols = JSON.parse(res.data.model.grigConfigs).sort(
        (a, b) => +a.order - +b.order
      );
      setColumns(
        cols
          .map((c) =>
            Object.keys(c).includes('renderType')
              ? c.renderType === gridFunctionsEnum.actionEditColumn
                ? {
                    ...c,
                    renderCell: (params) =>
                      gridFunctions.actionEditColumn(params, handleEditClick),
                  }
                : c.renderType === gridFunctionsEnum.actionCustom
                ? {
                    ...c,
                    renderCell: (params) =>
                      gridFunctions.actionCustom(params, handleCustomAction),
                  }
                : { ...c, renderCell: gridFunctions[c.renderType] }
              : c
          )
          .filter((c) => c.isActive)
      );
      setTempColumns(
        cols.map((c) =>
          Object.keys(c).includes('renderType')
            ? c.renderType === gridFunctionsEnum.actionEditColumn
              ? {
                  ...c,
                  renderCell: (params) =>
                    gridFunctions.actionEditColumn(params, handleEditClick),
                }
              : c.renderType === gridFunctionsEnum.actionCustom
              ? {
                  ...c,
                  renderCell: (params) =>
                    gridFunctions.actionCustom(params, handleCustomAction),
                }
              : { ...c, renderCell: gridFunctions[c.renderType] }
            : c
        )
      );
    } else {
      setColumns(
        defColumns.map((d, index) =>
          Object.keys(d).includes('renderType')
            ? d.renderType === gridFunctionsEnum.actionEditColumn
              ? {
                  ...d,
                  order: index,
                  isActive: true,
                  renderCell: (params) =>
                    gridFunctions.actionEditColumn(params, handleEditClick),
                }
              : d.renderType === gridFunctionsEnum.actionCustom
              ? {
                  ...d,
                  order: index,
                  isActive: true,
                  renderCell: (params) =>
                    gridFunctions.actionCustom(params, handleCustomAction),
                }
              : {
                  ...d,
                  order: index,
                  isActive: true,
                  renderCell: gridFunctions[d.renderType],
                }
            : {
                ...d,
                order: index,
                isActive: true,
              }
        )
      );
      setTempColumns(
        defColumns.map((d, index) =>
          Object.keys(d).includes('renderType')
            ? d.renderType === gridFunctionsEnum.actionEditColumn
              ? {
                  ...d,
                  order: index,
                  isActive: true,
                  renderCell: (params) =>
                    gridFunctions.actionEditColumn(params, handleEditClick),
                }
              : d.renderType === gridFunctionsEnum.actionCustom
              ? {
                  ...d,
                  order: index,
                  isActive: true,
                  renderCell: (params) =>
                    gridFunctions.actionCustom(params, handleCustomAction),
                }
              : {
                  ...d,
                  order: index,
                  isActive: true,
                  renderCell: gridFunctions[d.renderType],
                }
            : {
                ...d,
                order: index,
                isActive: true,
              }
        )
      );
    }
  }, []);

  useEffect(() => {
    getColumns();
  }, [getColumns, gridName]);
  const handleShowModal = () => {
    setIsShowModal(true);
  };
  const handleCloseModal = () => {
    setIsShowModal(false);
  };
  const handleSaveColumnsChanges = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(
        '/AccountCountroller/SaveGridColumn',
        {
          userId: JSON.parse(localStorage.getItem('user')).id,
          gridName,
          gridConfigs: JSON.stringify(
            tempColumns.map((t) =>
              Object.keys(t).includes('renderCell')
                ? { ...t, renderCell: t.renderCell.toString() }
                : t
            )
          ),
        }
      );
      if (res?.data.model) {
        await getColumns();
        setIsShowModal(false);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChangeCheckbox = (e, column) => {
    setTempColumns((prev) =>
      prev.map((p) =>
        p.field === column.field ? { ...p, isActive: !!e.target.checked } : p
      )
    );
  };
  const handleChangeSort = (mode, column) => {
    const el = tempColumns.find((temp) => temp.field === column.field);
    if (mode === 'up') {
      const oldEl = tempColumns.find((temp) => +temp.order === +el.order - 1);
      setTempColumns((prev) =>
        prev.map((p) =>
          p.field === el.field
            ? { ...p, order: p.order - 1 }
            : p.field === oldEl.field
            ? { ...p, order: +p.order + 1 }
            : p
        )
      );
    }
    if (mode === 'down') {
      const oldEl = tempColumns.find((temp) => +temp.order === +el.order + 1);
      setTempColumns((prev) =>
        prev.map((p) =>
          p.field === el.field
            ? { ...p, order: +p.order + 1 }
            : p.field === oldEl.field
            ? { ...p, order: +p.order - 1 }
            : p
        )
      );
    }
  };
  const handleSelectAll = () => {
    setTempColumns(
      defColumns.map((column, index) => ({
        ...column,
        order: index,
      }))
    );
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
