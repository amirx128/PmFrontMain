import axiosInstance from "../../utils/axios.config.ts";

export const GetLogisticsQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(`/Purchase/Logistics.Q`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
  });
export const DownloadLogisticsQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(
    `/Purchase/Logistics.Q`,
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
export const GetPurchaseOrderData = async (userId, purchaseOrderId) =>
  await axiosInstance.post(`/Purchase/GetPurchaseOrderData`, {
    userId,
    purchaseOrderId,
  });
export const DownloadPurchaseOrderData = async (userId, purchaseOrderId) =>
  await axiosInstance.post(
    `/Purchase/GetPurchaseOrderData`,
    {
      userId,
      purchaseOrderId,
      exportExcell: true,
    },
    {
      responseType: "arraybuffer",
    }
  );

export const GetPurchaseOrderDetailsData = async (userId, purchaseOrderId) =>
  await axiosInstance.post(`/Purchase/GetPurchaseOrderDetailsData`, {
    userId: userId,
    purchaseOrderId,
  });

export const AddDetailsToPurchaseOrder = async (
  userId,
  body: {
    supporterId: string;
    purchaseOrderId: number;
    BaravordFeeKala: number;
    BaravordkolMandeh: number;
    files: any;
  }
) =>
  await axiosInstance.post(
    `/Purchase/Logistics.AddDetailsToPurchaseOrder`,
    {
      userId: userId,
      ...body,
    },
    { headers: { "Content-Type": "multipart/form-data" } }
  );
export const UpdateDetailsToPurchaseOrder = async (
  userId,
  body: {
    supporterId: string;
    PurchaseOrderDetailsId: number;
    BaravordFeeKala: number;
    BaravordkolMandeh: number;
    files: any;
  }
) =>
  await axiosInstance.post(
    `Purchase/Logistics.UpdateDetails`,
    {
      userId: userId,
      ...body,
    },
    { headers: { "Content-Type": "multipart/form-data" } }
  );

export const LogisticsSendItems = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(`/Purchase/Logistics.SendItems`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
  });
export const DownloadLogisticsSendItems = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(
    `/Purchase/Logistics.SendItems`,
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

export const GetFinancialQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(`/Purchase/Financial.Q`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
  });
export const DownloadFinancialQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(
    `/Purchase/Financial.Q`,
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

export const FinancialUpdateDetails = async (
  userId,
  mablaghEtebar,
  purchaseOrderDetailsId
) =>
  await axiosInstance.post(`/Purchase/Financial.UpdateDetails`, {
    userId: userId,
    mablaghEtebar,
    purchaseOrderDetailsId,
  });

export const FinancialSendItems = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(`/Purchase/Financial.SendItems`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
  });
export const DownloadFinancialSendItems = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(
    `/Purchase/Financial.SendItems`,
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

export const GetApproveQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(`/Purchase/Approve.Q`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
  });
export const DownloadApproveQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(
    `/Purchase/Approve.Q`,
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

export const ApproveUpdateDetails = async (
  userId,
  count,
  ApproveStateId,
  purchaseOrderDetailsId
) =>
  await axiosInstance.post(`/Purchase/Approve.UpdateDetails`, {
    userId: userId,
    count,
    ApproveStateId,
    purchaseOrderDetailsId,
  });

export const ApproveSendItems = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(`/Purchase/Approve.SendItems`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
  });
export const DownloadApproveSendItems = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(
    `/Purchase/Approve.SendItems`,
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
