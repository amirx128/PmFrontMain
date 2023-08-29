import axiosInstance from "../../utils/axios.config.ts";

export const GetSupplierQ = async (
  userId,
  pageIndex = 1,
  fromDate = "",
  toDate = ""
) =>
  await axiosInstance.post(`/warehouse/Supplier.GetSupplierQ`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType: "desc",
    orderBy: "requestCaseCreateDate",
    fromDate,
    toDate,
  });

export const SupplierSentItem = async (
  userId,
  pageIndex = 1,
  fromDate = "",
  toDate = ""
) =>
  await axiosInstance.post(
    `/warehouse/Supplier.SentItems
  `,
    {
      userId: userId,
      pageIndex,
      pageCount: 20,
      orderType: "desc",
      orderBy: "requestCaseCreateDate",
      fromDate,
      toDate,
    }
  );
