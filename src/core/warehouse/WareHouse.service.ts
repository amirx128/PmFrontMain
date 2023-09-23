import axiosInstance from "../../utils/axios.config.ts";

export const GetWarehouseQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(`/warehouse/Warehose.GetWarehouseQ`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
  });
export const DownloadWarehouseQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(
    `/warehouse/Warehose.GetWarehouseQ`,
    {
      userId: userId,
      pageIndex,
      pageCount: 20,
      orderType,
      orderBy,
      fromDate: new Date(fromDate).toISOString().slice(0, 10),
      toDate: new Date(toDate).toISOString().slice(0, 10),
      exportExcell: true,
    },
    {
      responseType: "arraybuffer",
    }
  );

export const GetWarehouseOrderData = async (userId, warehouseOrderId) =>
  await axiosInstance.post(`/Warehouse/GetWarehouseOrderData`, {
    userId,
    warehouseOrderId,
  });
export const GetExitWarehouseOrderData = async (userId, exitWarehouseOrderId) =>
  await axiosInstance.post(`/Warehouse/GetExitWarehouseOrderData`, {
    userId,
    selectedItemId: exitWarehouseOrderId,
  });

export const WarehouseSentItem = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(`/warehouse/Warehose.GetWarehouseSentItems`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
  });
export const DownloadWarehouseSentItem = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(
    `/warehouse/Warehose.GetWarehouseSentItems`,
    {
      userId: userId,
      pageIndex,
      pageCount: 20,
      orderType,
      orderBy,
      fromDate: new Date(fromDate).toISOString().slice(0, 10),
      toDate: new Date(toDate).toISOString().slice(0, 10),
      exportExcell: true,
    },
    {
      responseType: "arraybuffer",
    }
  );
export const GetExitWareHouseQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(`/warehouse/Warehouse.GetExitWarehouseQ`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
  });
export const DownloadExitWareHouseQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(
    `/warehouse/Warehouse.GetExitWarehouseQ`,
    {
      userId: userId,
      pageIndex,
      pageCount: 20,
      orderType,
      orderBy,
      fromDate: new Date(fromDate).toISOString().slice(0, 10),
      toDate: new Date(toDate).toISOString().slice(0, 10),
      exportExcell: true,
    },
    {
      responseType: "arraybuffer",
    }
  );
export const ExitWarehouseSentItem = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(`/warehouse/Warehouse.GetExitWarehouseSentItems`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
  });
export const DownloadExitWarehouseSentItem = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(
    `/warehouse/Warehouse.GetExitWarehouseSentItems`,
    {
      userId: userId,
      pageIndex,
      pageCount: 20,
      orderType,
      orderBy,
      fromDate: new Date(fromDate).toISOString().slice(0, 10),
      toDate: new Date(toDate).toISOString().slice(0, 10),
      exportExcell: true,
    },
    {
      responseType: "arraybuffer",
    }
  );
export const SupplierAddDetailsToWarehouseOrder = async (
  userId,
  warehouseOrderId,
  sentCount
) =>
  await axiosInstance.post(`/Warehouse/Supplier.AddDetailsToWarehoseOrder`, {
    userId: userId,
    warehouseOrderId,
    sentCount,
  });
export const SupplierUpdateDetailsToWarehouseOrder = async (
  userId,
  id,
  sentCount
) =>
  await axiosInstance.post(`/Warehouse/Supplier.UpdateWarehoseOrderDetails`, {
    userId: userId,
    id,
    sentCount,
  });
export const WarehouseReceiveCommidity = async (
  userId,
  warehouseOrderId,
  warehouseOrderDetailsId,
  receiveCount
) =>
  await axiosInstance.post(`/Warehouse/Warehose.ReceiveCommodity`, {
    userId,
    warehouseOrderId,
    warehouseOrderDetailsId,
    receiveCount,
  });
export const WarehouseAddDetailsToExitFromWarehouse = async (
  userId,
  exitWarehouseOrderId,
  count,
  receiveIsOk
) =>
  await axiosInstance.post(
    `/Warehouse/Warehouse.AddDetailsToExitFromWarehouse`,
    {
      userId,
      exitWarehouseOrderId,
      count,
      receiveIsOk,
    }
  );
export const WarehouseUpdateDetailsToExitFromWarehouse = async (
  userId,
  id,
  count
) =>
  await axiosInstance.post(
    `/Warehouse/Warehouse.UpdateExitFromWarehouseDetails`,
    {
      userId,
      id,
      count,
    }
  );
export const WarehouseRequesterUserApproveReceive = async (
  userId,
  exitFromWarehouseDetailsId,
  count,
  receiveIsOk
) =>
  await axiosInstance.post(`/Warehouse/RequesterUser.ApproveReceive`, {
    userId,
    exitFromWarehouseDetailsId,
    count,
    receiveIsOk,
  });
