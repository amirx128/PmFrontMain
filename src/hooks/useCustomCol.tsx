import { useState, useCallback, useEffect } from "react";
import axiosInstance from "../utils/axios.config";

const useCustomCol = (gridName, defColumns) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [columns, setColumns] = useState([]);
  const [tempColumns, setTempColumns] = useState([]);

  const getColumns = useCallback(async () => {
    const res = await axiosInstance.post("/AccountCountroller/GetGridColumns", {
      userId: JSON.parse(localStorage.getItem("user")).id,
      gridName,
    });
    if (res?.data?.model) {
      const cols = JSON.parse(res.data.model.grigConfigs).sort(
        (a, b) => +a.order - +b.order
      );
      setColumns(
        cols
          .map((c) =>
            Object.keys(c).includes("renderCell")
              ? { ...c, renderCell: eval("(" + c.renderCell + ")") }
              : c
          )
          .filter((c) => c.isActive)
      );
      setTempColumns(
        cols.map((c) =>
          Object.keys(c).includes("renderCell")
            ? { ...c, renderCell: eval("(" + c.renderCell + ")") }
            : c
        )
      );
    } else {
      setColumns(
        defColumns.map((d, index) => ({
          ...d,
          order: index,
          isActive: true,
        }))
      );
      setTempColumns(
        defColumns.map((d, index) => ({
          ...d,
          order: index,
          isActive: true,
        }))
      );
    }
  }, []);

  useEffect(() => {
    getColumns();
  }, [getColumns]);
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
        "/AccountCountroller/SaveGridColumn",
        {
          userId: JSON.parse(localStorage.getItem("user")).id,
          gridName,
          gridConfigs: JSON.stringify(
            tempColumns.map((t) =>
              Object.keys(t).includes("renderCell")
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
    if (mode === "up") {
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
    if (mode === "down") {
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
