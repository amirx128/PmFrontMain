import axiosInstance from '../../utils/axios.config.ts';

export const GetApproveQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = 'desc',
  orderBy = 'CreateDate',
  approveStateId = 3
) =>
  await axiosInstance.post(`/Support/ApproveQ`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
    approveStateId,
  });
export const DownloadApproveQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = 'desc',
  orderBy = 'CreateDate',
  approveStateId = 3
) =>
  await axiosInstance.post(
    `/Support/ApproveQ`,
    {
      userId: userId,
      pageIndex,
      pageCount: 20,
      orderType,
      orderBy,
      fromDate: new Date(fromDate).toISOString().slice(0, 10),
      toDate: new Date(toDate).toISOString().slice(0, 10),
      approveStateId,
      exportExcell: true,
    },
    {
      responseType: 'arraybuffer',
    }
  );
export const GetApproveStates = async (userId) =>
  await axiosInstance.post(`/Support/GetApproveStates`, {
    userId: userId,
  });

export const GetFinalApproveQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = 'desc',
  orderBy = 'CreateDate',
  approveStateId = 3
) =>
  await axiosInstance.post(`/support/FinalApproveQ`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
    approveStateId,
  });
export const DownloadFinalApproveQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = 'desc',
  orderBy = 'CreateDate',
  approveStateId = 3
) =>
  await axiosInstance.post(
    `/support/FinalApproveQ`,
    {
      userId: userId,
      pageIndex,
      pageCount: 20,
      orderType,
      orderBy,
      fromDate: new Date(fromDate).toISOString().slice(0, 10),
      toDate: new Date(toDate).toISOString().slice(0, 10),
      approveStateId,
      exportExcell: true,
    },
    {
      responseType: 'arraybuffer',
    }
  );
export const SupportGetRequestDetails = async (userId, requestId) =>
  await axiosInstance.post(`/Support/GetRequestDetails`, {
    userId,
    requestId,
  });
export const SupportDownloadFiles = async (userId, fileID) =>
  await axiosInstance.post(`/Support/DownloadFiles`, {
    userId,
    fileID,
  });
