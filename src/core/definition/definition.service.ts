import axiosInstance from "../../utils/axios.config.ts";

export const getAllProjectsReq = async (userId) =>
  await axiosInstance.post(`/Definition/GetAllProject`, {
    userId: userId ?? "1",
  });

export const getAllFloorsReq = async (userId, projectId) =>
  await axiosInstance.post(`/Definition/GetAllFloor`, {
    userId: userId,
    projectId: projectId,
    name: "",
  });

export const GetAllUnitReq = async (userId, projectId, floorId) =>
  await axiosInstance.post(`/Definition/GetAllUnit`, {
    userId,
    projectId,
    name: "",
    floorId,
  });

export const AddNewProjectReq = async (userId, projectName, commodities) =>
  await axiosInstance.post(`/Definition/AddNewProject`, {
    userId,
    name: projectName,
    commodities,
  });

export const UpdateProjectReq = async (userId, id, projectName, commodities) =>
  await axiosInstance.post(`/Definition/UpdateProject`, {
    userId,
    id,
    name: projectName,
    commodities,
  });

export const AddNewUnitReq = async (
  userId,
  projectId,
  projectfloorId,
  unitName,
  code
) =>
  await axiosInstance.post(`/Definition/AddNewUnit`, {
    userId,
    projectId,
    projectfloorId,
    name: unitName,
    code,
  });

export const UpdateUnitReq = async (
  userId,
  id,
  projectId,
  projectfloorId,
  unitName,
  code
) =>
  await axiosInstance.post(`/Definition/UpdateUnit`, {
    userId,
    id,
    projectId,
    projectfloorId,
    name: unitName,
    code,
  });

export const AddNewFloorReq = async (
  userId,
  projectId,
  floorName,
  code,
  commodities
) =>
  await axiosInstance.post(`/Definition/AddNewFloor`, {
    userId,
    projectId,
    name: floorName,
    code,
    commodities,
  });

export const UpdateFloorReq = async (
  userId,
  id,
  projectId,
  floorName,
  code,
  commodities
) =>
  await axiosInstance.post(`/Definition/UpdateFloor`, {
    userId,
    id,
    projectId,
    name: floorName,
    code,
    commodities,
  });

export const GetAllCommodityOnTreeReq = async (
  userId,
  projectId = undefined,
  commodityName = "",
  code = ""
) =>
  await axiosInstance.post(`/Definition/GetAllCommpdityOnTree`, {
    userId,
    projectId,
    name: commodityName,
    code,
  });

export const GetAllCommoditiesReq = async (userId) =>
  await axiosInstance.post(`/Definition/GetAllCommodities`, {
    userId,
  });

export const AddNewCommodityReq = async (userId, body) =>
  await axiosInstance.post(`/Definition/AddNewCommpdity`, {
    userId,
    ...body,
  });
export const UpdateCommodityDetailsReq = async (userId, body) =>
  await axiosInstance.post(`/Definition/UpdateCommodityDetails`, {
    userId,
    ...body,
  });

export const GetOneCommodityDetailsReq = async (userId, commodityId) =>
  await axiosInstance.post(`/Definition/GetOneCommodityDetailS`, {
    userId,
    commodityId,
  });

export const GetAllPersonsReq = async (userId) =>
  await axiosInstance.post(`/Definition/GetAllPersons`, {
    userId,
  });

export const GetPersonDetailsReq = async (userId, selectedItemId) =>
  await axiosInstance.post(`/Definition/GetPersonDetails`, {
    userId,
    selectedItemId,
  });

export const AddNewPersonReq = async (userId, body) =>
  await axiosInstance.post(`/Definition/AddNewPerson`, {
    userId,
    ...body,
  });

export const UpdatePersonReq = async (userId, id, body) =>
  await axiosInstance.post(`/Definition/UpdatePerson`, {
    userId,
    id,
    ...body,
  });

export const GetAllBusinessRolesReq = async (userId) =>
  await axiosInstance.post(`/Definition/GetAllBusinessRoles`, {
    userId,
  });

export const GetBusinessRoleDetailesReq = async (userId, selectedItemId) =>
  await axiosInstance.post(`/Definition/GetBusinessRoleDetailes`, {
    userId,
    selectedItemId,
  });

export const AddNewBusinessRoleReq = async (userId, roleName, title) =>
  await axiosInstance.post(`/Definition/AddNewBusinessRole`, {
    userId,
    name: roleName,
    title,
  });

export const UpdateBusinessRoleReq = async (userId, id, roleName, title) =>
  await axiosInstance.post(`/Definition/UpdateBusinessRole`, {
    userId,
    name: roleName,
    title,
    id,
  });

export const GetScheduleActivitiesReq = async (userId) =>
  await axiosInstance.post(`/Definition/GetScheduleActivities`, {
    userId,
  });

export const AddNewActivityScheduleReq = async (
  userId,
  activityName,
  decriptions,
  fromDate,
  toDate
) =>
  await axiosInstance.post(`/Definition/AddNewActivitySchedule`, {
    userId,
    name: activityName,
    decriptions,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
  });

export const UpdateNewActivityScheduleReq = async (
  userId,
  id,
  activityName,
  decriptions,
  fromDate,
  toDate
) =>
  await axiosInstance.post(`/Definition/UpdateNewActivitySchedule`, {
    userId,
    id,
    name: activityName,
    decriptions,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
  });

export const GetActivityScheduleDetailsReq = async (userId, selectedItemId) =>
  await axiosInstance.post(`/Definition/GetActivityScheduleDetails`, {
    userId,
    selectedItemId,
  });

export const GetAllSuppliersReq = async (userId) =>
  await axiosInstance.post(`/Definition/GetAllSuppliers`, {
    userId,
  });

export const GetAllProducersReq = async (userId) =>
  await axiosInstance.post(`/Definition/GetAllProducers`, {
    userId,
  });

export const GetAllPlaseOfUseReq = async (userId) =>
  await axiosInstance.post(`/RequestCase/GetAllPlaseOfUse`, {
    userId,
  });

export const AddNewProducerReq = async (userId, body) =>
  await axiosInstance.post(`/Definition/AddNewProducer`, {
    userId,
    ...body,
  });

export const UpdateProducerInfoReq = async (userId, body) =>
  await axiosInstance.post(`/Definition/UpdateProducerInfo`, {
    userId,
    ...body,
  });
