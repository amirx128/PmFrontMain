import axiosInstance from "../../utils/axios.config.ts";

export const GetAllOriginalItems = async (userId) =>
  await axiosInstance.post(`/QC/GetAllOriginalItems`, {
    userId,
  });
export const GetOriginalItemsData = async (userId, selectedItemId) =>
  await axiosInstance.post(`/QC/GetOriginalItemsData`, {
    userId,
    selectedItemId,
  });
export const AddNewOriginalItem = async (userId, name, subItemsIds) =>
  await axiosInstance.post(`/QC/AddNewOriginalItem`, {
    userId,
    name,
    subItemsIds,
  });
export const UpdateOriginalItem = async (userId, id, name, subItemsIds) =>
  await axiosInstance.post(`/QC/UpdateOriginalItem`, {
    userId,
    id,
    name,
    subItemsIds,
  });

export const GetAllSubItems = async (userId) =>
  await axiosInstance.post(`/QC/GetAllSubItems`, {
    userId,
  });
export const GetSubItemsData = async (userId, selectedItemId) =>
  await axiosInstance.post(`/QC/GetSubItemsData`, {
    userId,
    selectedItemId,
  });
export const AddNewSubItem = async (userId, body) =>
  await axiosInstance.post(`/QC/AddNewSubItem`, {
    userId,
    ...body,
  });
export const UpdateSubItem = async (userId, id, body) =>
  await axiosInstance.post(`/QC/UpdateSubItem`, {
    userId,
    id,
    ...body,
  });

export const GetAllUsability = async (userId) =>
  await axiosInstance.post(`/Definition/GetAllUsability`, {
    userId,
  });
export const AddNewUsability = async (userId, units, usablityName, code) =>
  await axiosInstance.post(`/Definition/AddNewUsablity`, {
    userId,
    units,
    usablityName,
    code,
  });
export const UpdateUsability = async (userId, id, units, usablityName, code) =>
  await axiosInstance.post(`/Definition/UpdateUsablity`, {
    userId,
    id,
    units,
    usablityName,
    code,
  });
export const GetUsabilityData = async (userId, selectedItemId) =>
  await axiosInstance.post(`/Definition/QcManager.GetUsabilityData`, {
    userId,
    selectedItemId,
  });

export const GetAllCheckLists = async (userId) =>
  await axiosInstance.post(`/QC/GetAllCheckLists`, {
    userId,
  });
export const GetCheckListsData = async (userId, selectedItemId) =>
  await axiosInstance.post(`/QC/GetCheckListsData`, {
    userId,
    selectedItemId,
  });
export const UpdateCheckList = async (userId, name, subItemId, items, id) =>
  await axiosInstance.post(`/QC/UpdateCheckList`, {
    userId,
    name,
    subItemId,
    items,
    id,
  });
export const AddNewCheckList = async (userId, name, subItemId, items) =>
  await axiosInstance.post(`/QC/AddNewCheckList`, {
    userId,
    name,
    subItemId,
    items,
  });

export const AllActiveCheckLists = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "checkListTitle",
  checkListStateId = 0
) =>
  await axiosInstance.post(`/QC/QcManager.AllActiveCheckLists`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
    checkListStateId,
  });
export const GetCheckListStates = async (userId) =>
  await axiosInstance.post(`/QC/GetCheckListStates`, {
    userId: userId,
  });

export const CreateCheckListInstances = async (
  userId,
  contractorUserId,
  relatedProject,
  relatedFloor,
  relatedUnits,
  relatedUsability,
  relatedOrginalItems,
  relatedSubItems,
  relatedCheckLists
) =>
  await axiosInstance.post(`/QC/QcManager.CreateCheckListInstances`, {
    userId: userId,
    contractorUserId,
    relatedProject,
    relatedFloor,
    relatedUnits,
    relatedUsability,
    relatedOrginalItems,
    relatedSubItems,
    relatedCheckLists,
  });
export const GetDuplicated = async (userId, body) =>
  await axiosInstance.post(`/QC/QcManager.GetDuplicated`, {
    userId: userId,
    ...body,
  });

export const UpdateQcInstance = async (
  userId,
  instanceId,
  contractorUserId,
  relatedProjects,
  relatedFloor,
  relatedUnits,
  relatedUsability,
  relatedOrginalItems,
  relatedSubItems,
  relatedCheckLists
) =>
  await axiosInstance.post(`/QC/QcManager.UpdateQcInstance`, {
    userId: userId,
    instanceId,
    contractorUserId,
    relatedProjects,
    relatedFloor,
    relatedUnits,
    relatedUsability,
    relatedOrginalItems,
    relatedSubItems,
    relatedCheckLists,
  });

export const GetManySubItemsCheckLists = async (userId, ids) =>
  await axiosInstance.post(`/QC/GetManySubItemsCheckLists`, {
    userId,
    ids,
  });
export const GetManyOrginalItemSubItems = async (userId, ids) =>
  await axiosInstance.post(`/QC/GetManyOrginalItemSubItems`, {
    userId,
    ids,
  });
export const GetAllContractor = async (userId) =>
  await axiosInstance.post(`/QC/GetAllContractor`, {
    userId,
  });
export const GetAllOrginal_SubItem_ChechLists = async (userId) =>
  await axiosInstance.post(`/QC/GetAllOrginal_SubItem_ChechLists`, {
    userId,
  });
export const GetOneInstanceData = async (userId, selectedItemId) =>
  await axiosInstance.post(`/QC/QcManager.GetOneInstanceData`, {
    userId,
    selectedItemId,
  });
export const DeleteQcInstance = async (userId, instanceIds) =>
  await axiosInstance.post(`/QC/QcManager.DeleteQcInstance`, {
    userId,
    instanceIds,
  });
export const GetOneSubItemDetails = async (userId, selectedItemId) =>
  await axiosInstance.post(`/QC/QcManager.GetOneSubItemDetails`, {
    userId,
    selectedItemId,
  });
/////////////////////////////////////////c/qc/ContractorAddDate
export const ContractorAddDateQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "subItemTitle",
  checkListStateId = 0
) =>
  await axiosInstance.post(`/QC/Contractor.AddDate.Q`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
    checkListStateId,
  });
export const ContractorAddDateSentItems = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "subItemTitle",
  checkListStateId = 0
) =>
  await axiosInstance.post(`/QC/Contractor.AddDate.SentItems`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
    checkListStateId,
  });
export const ContractorAddDate = async (
  userId,
  instanceId,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date()
) =>
  await axiosInstance.post(`/QC/Contractor.AddDate`, {
    userId: userId,
    instanceId,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
  });
///////////////////////////////////////////////
export const TechnicalApproveScheduleQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "subItemTitle",
  checkListStateId = 0
) =>
  await axiosInstance.post(`/QC/Technical.ApproveSchedule.Q`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
    checkListStateId,
  });
export const TechnicalApproveScheduleSentItems = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "subItemTitle",
  checkListStateId = 0
) =>
  await axiosInstance.post(`/QC/Technical.ApproveSchedule.SentItems`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
    checkListStateId,
  });
export const technicalApproveSchedule = async (
  userId,
  instanceId,
  fromDate,
  toDate,
  isApproved
) =>
  await axiosInstance.post(`/QC/Technical.ApproveSchedule`, {
    userId,
    instanceId,
    fromDate,
    toDate,
    isApproved,
  });
///////////////////////////////////////////////
export const SetQcDateQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "subItemTitle",
  checkListStateId = 0
) =>
  await axiosInstance.post(`/QC/Qc.SetQcDate.Q`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
    checkListStateId,
  });
export const SetQcDateSentItems = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "subItemTitle",
  checkListStateId = 0
) =>
  await axiosInstance.post(`/QC/Qc.SetQcDate.SentItems`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
    checkListStateId,
  });
export const SetQcDate = async (
  userId,
  instanceId,
  qcVisitFromDate,
  qcVisitToDate,
  inspectDate,
  isPeriodTime
) =>
  await axiosInstance.post(`/QC/Qc.SetQcDate`, {
    userId,
    instanceId,
    qcVisitFromDate,
    qcVisitToDate,
    inspectDate,
    isPeriodTime,
  });
///////////////////////////////////////////////
export const InspectorEntryCheckListQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "subItemTitle",
  checkListStateId = 0
) =>
  await axiosInstance.post(`/QC/Inspector.EntryCheckList.Q`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
    checkListStateId,
  });
export const InspectorEntryCheckListSentItems = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "subItemTitle",
  checkListStateId = 0
) =>
  await axiosInstance.post(`/QC/Inspector.EntryCheckList.SentItems`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
    checkListStateId,
  });
export const InspectorEntryCheckList = async (userId, instanceId, itemsValue) =>
  await axiosInstance.post(`/QC/Inspector.EntryCheckList`, {
    userId,
    instanceId,
    itemsValue,
  });
///////////////////////////////////////////////
export const InspectControlCheckListQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "subItemTitle",
  checkListStateId = 0
) =>
  await axiosInstance.post(`/QC/Inspect.ControlCheckList.Q`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
    checkListStateId,
  });
export const InspectControlCheckListSentItems = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "subItemTitle",
  checkListStateId = 0
) =>
  await axiosInstance.post(`/QC/Inspect.ControlCheckList.SentItems`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
    checkListStateId,
  });
export const InspectControlCheckList = async (
  userId,
  instanceId,
  inspectControlCheckListStateId
) =>
  await axiosInstance.post(`/QC/Inspect.ControlCheckList`, {
    userId,
    instanceId,
    inspectControlCheckListStateId,
  });
///////////////////////////////////////////////
export const QcManagerControlCheckListQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "subItemTitle",
  checkListStateId = 0
) =>
  await axiosInstance.post(`/QC/QcManager.ControlCheckList.Q`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
    checkListStateId,
  });
export const QcManagerControlCheckListSentItems = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "subItemTitle",
  checkListStateId = 0
) =>
  await axiosInstance.post(`/QC/QcManager.ControlCheckList.SentItems`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
    checkListStateId,
  });
export const QcManagerControlCheckList = async (
  userId,
  instanceId,
  qcManagerControlStateId,
  qcManagerDescriptions
) =>
  await axiosInstance.post(`/QC/QcManager.ControlCheckList`, {
    userId,
    instanceId,
    qcManagerControlStateId,
    qcManagerDescriptions,
  });
///////////////////////////////////////////////
export const QcFinalApproveQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "subItemTitle",
  checkListStateId = 0
) =>
  await axiosInstance.post(`/QC/Qc.FinalApprove.Q`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
    checkListStateId,
  });
export const QcFinalApproveSentItems = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "subItemTitle",
  checkListStateId = 0
) =>
  await axiosInstance.post(`/QC/Qc.FinalApprove.SentItems`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
    checkListStateId,
  });
export const QcFinalApprove = async (userId, instanceId, stateId) =>
  await axiosInstance.post(`/QC/Qc.FinalApprove`, {
    userId,
    instanceId,
    stateId,
  });
export const QcFinalApproveCheckListRows = async (
  userId,
  instanceId,
  dataValues
) =>
  await axiosInstance.post(`/QC/Qc.FinalApproveCheckListRows`, {
    userId,
    instanceId,
    dataValues,
  });
///////////////////////////////////////////////
export const ContractorSetIsDoneQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "subItemTitle",
  checkListStateId = 0
) =>
  await axiosInstance.post(`/QC/Contractor.SetIsDone.Q`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
    checkListStateId,
  });
export const ContractorSetIsDoneSentItems = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "subItemTitle",
  checkListStateId = 0
) =>
  await axiosInstance.post(`/QC/Contractor.SetIsDone.SentItems`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
    checkListStateId,
  });
export const ContractorSetIsDone = async (
  userId,
  instanceId,
  contractorDoneItemsData
) =>
  await axiosInstance.post(`/QC/Contractor.SetIsDone`, {
    userId,
    instanceId,
    contractorDoneItemsData,
  });
/////////////////////////////////////////////
///////////////////////////////////////////////
export const TechnicalOfficeAddOrdersQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "subItemTitle",
  checkListStateId = 0
) =>
  await axiosInstance.post(`/QC/TechnicalOffice.AddOrders.Q`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
    checkListStateId,
  });
export const TechnicalOfficeAddOrdersSentItems = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "subItemTitle",
  checkListStateId = 0
) =>
  await axiosInstance.post(`/QC/TechnicalOffice.AddOrders.SentItems`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
    checkListStateId,
  });
export const TechnicalOfficeAddOrders = async (
  userId,
  instanceId,
  technicalOfficeOrders
) =>
  await axiosInstance.post(`/QC/TechnicalOffice.AddOrders`, {
    userId,
    instanceId,
    technicalOfficeOrders,
  });
/////////////////////////////////////////////
export const GetCheckListsDataAndValues = async (userId, instanceId) =>
  await axiosInstance.post(`/QC/GetCheckListsDataAndValues`, {
    userId,
    instanceId,
  });
export const GetOneValueHistory = async (userId, valueId) =>
  await axiosInstance.post(`/QC/GetOneValueHistory`, {
    userId,
    valueId,
  });
/////////////////////////////////////////////

/////////////////////////////////////////////
export const GetControlCheckListStates = async (userId) =>
  await axiosInstance.post(`/QC/GetControlCheckListStates`, {
    userId,
  });
export const GetSubItemLevels = async (userId) =>
  await axiosInstance.post(`/QC/GetSubItemLevels`, {
    userId,
  });
