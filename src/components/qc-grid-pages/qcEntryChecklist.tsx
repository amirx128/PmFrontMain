import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  GetControlCheckListStatesAction,
  GetCheckListsDataAndValuesAction,
  InspectControlCheckListAction,
  InspectorEntryCheckListAction,
  QcManagerControlCheckListAction,
  TechnicalOfficeAddOrdersAction,
  ContractorSetIsDoneAction,
  QcFinalApproveCheckListRowsAction,
  GetOneValueHistoryAction,
} from "../../redux/features/qcSlicer";
import { LoadingButton } from "@mui/lab";
import HistoryIcon from "@mui/icons-material/History";
import { DialogContent } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
interface IInfo {
  itemId: number;
  firstControlStateId?: number | string;
  finalControlStateId?: number | string;
  technicalOfficeOrder?: string;
  inspectDescriptions?: string;
  setIsDone?: boolean;
  qcFinalControlStateId?: number | string;
  finallApproveDescriptions?: string;
}
const columns = [
  { name: "#" },
  { name: "نام" },
  { name: "وضعیت کنترل اولیه", class: "w-40" },
  { name: "وضعیت کنترل نهایی", class: "w-40" },
  { name: "توضیحات بازرسی", class: "w-40" },
  { name: "تاریخ فعالیت فنی" },
  { name: "کاربر فنی" },
  { name: "سفارش فنی" },
  { name: "تاریخ فعالیت پیمانکار" },
  { name: "پیمانکار" },
  { name: "اتمام پیمانکار" },
  { name: "تاریخ فعالیت کنترل نهایی" },
  { name: "کنترل کننده نهایی" },
  { name: "وضعیت کنترل نهایی" },
  { name: "توضیحات کنترل نهایی" },
  { name: "تاریخچه" },
];
const QcEntryCheckList = () => {
  const { id, mode } = useParams();
  const dispatch = useDispatch<any>();
  const { checkListsDataAndValues, controlChecklistStates, oneValueHistory } =
    useSelector((state: any) => state.qc);

  const [info, setInfo] = useState<IInfo[]>([]);
  const [inspectCheckListStateId, setInspectCheckListStateId] =
    useState<number>();
  const [qcManagerCheckListStateId, setQcManagerCheckListStateId] =
    useState<number>();
  const [qcManagerDescriptions, setQcManagerDescription] = useState<string>("");
  const [isShowHistoryModal, setIsShowHistoryModal] = useState<boolean>(false);
  const getList = useCallback(async () => {
    await dispatch(GetCheckListsDataAndValuesAction({ instanceId: +id }));
    await dispatch(GetControlCheckListStatesAction());
  }, [dispatch, id]);

  useEffect(() => {
    getList();
  }, [getList]);
  useEffect(() => {
    if (checkListsDataAndValues?.data?.checkListAllItemsAndValues) {
      setInfo(
        checkListsDataAndValues?.data?.checkListAllItemsAndValues.map(
          (checklist) => ({
            itemId: checklist.valueId,
            firstControlStateId: checklist.firstControlStateId,
            finalControlStateId: checklist.finalControlStateId,
            inspectDescriptions: checklist.inspectDeacription,
            technicalOfficeOrder: checklist.technicalOrder,
            qcFinalControlStateId: checklist.qcFinalControlStateId,
            finallApproveDescriptions: checklist.finallApproveDescriptions,
            setIsDone: checklist.contractorIsDone,
          })
        )
      );
    }
    if (checkListsDataAndValues?.data?.inspectControlCheckListSateId) {
      setInspectCheckListStateId(
        checkListsDataAndValues?.data?.inspectControlCheckListSateId
      );
    }
    if (checkListsDataAndValues?.data?.qcManagerCheckListStateId) {
      setQcManagerCheckListStateId(
        checkListsDataAndValues?.data?.qcManagerCheckListStateId
      );
    }
    if (checkListsDataAndValues?.data?.qcManagerDescription) {
      setQcManagerDescription(
        checkListsDataAndValues?.data?.qcManagerDescription
      );
    }
  }, [checkListsDataAndValues]);

  const handleChange = (e, itemId) => {
    setInfo((info) =>
      info.map((i) =>
        +i.itemId === +itemId ? { ...i, [e.target?.name]: e.target?.value } : i
      )
    );
  };

  const handleSubmit = async () => {
    switch (mode) {
      case "entry-checklist":
      case "entry-checklist-sent-item":
        await dispatch(
          InspectorEntryCheckListAction({
            instanceId: +id,
            itemsValue: info.map((i) => ({
              id: +i.itemId,
              firstControlStateId: +i.firstControlStateId,
              finalControlStateId: +i.finalControlStateId,
              inspectDescriptions: i.inspectDescriptions,
            })),
          })
        );
        break;
      case "control-checklist":
        await dispatch(
          InspectControlCheckListAction({
            instanceId: +id,
            inspectControlCheckListStateId: +inspectCheckListStateId,
          })
        );
        break;
      case "manager-control-checklist":
        await dispatch(
          QcManagerControlCheckListAction({
            instanceId: +id,
            qcManagerControlStateId: +qcManagerCheckListStateId,
            qcManagerDescriptions: qcManagerDescriptions,
          })
        );
        break;
      case "technical-office":
      case "technical-office-sent-item":
        await dispatch(
          TechnicalOfficeAddOrdersAction({
            instanceId: +id,
            technicalOfficeOrders: info
              .filter((i) => i.technicalOfficeOrder)
              .map((i) => ({
                itemValueId: +i.itemId,
                technicalOfficeOrder: i.technicalOfficeOrder,
              })),
          })
        );
        break;
      case "contractor-set-is-done":
      case "contractor-set-is-done-sent-item":
        await dispatch(
          ContractorSetIsDoneAction({
            instanceId: +id,
            contractorDoneItemsData: info.map((i) => ({
              itemValueId: i.itemId,
              isDone: !!i.setIsDone,
            })),
          })
        );
        break;
      case "final-control-checklist":
        await dispatch(
          QcFinalApproveCheckListRowsAction({
            instanceId: +id,
            dataValues: info.map((i) => ({
              valueId: i.itemId,
              stateId: +i.qcFinalControlStateId,
              finallApproveDescriptions: i.finallApproveDescriptions,
            })),
          })
        );
        break;
      default:
        return;
    }
    await dispatch(GetCheckListsDataAndValuesAction({ instanceId: +id }));
  };
  const handleChangeInpectCheckListId = (e) => {
    setInspectCheckListStateId(+e.target.value);
  };
  const handleChangeQcManagerCheckListId = (e) => {
    setQcManagerCheckListStateId(+e.target.value);
  };
  const handleChangeQcMangerDescription = (e) => {
    setQcManagerDescription(e.target.value);
  };
  const handleOpenHistoryModal = async (valueId) => {
    setIsShowHistoryModal(true);
    await dispatch(GetOneValueHistoryAction({ valueId }));
  };
  return (
    <Card>
      <CardHeader title="پر کردن چک لیست" className="text-right" />
      <CardContent className="mt-5 flex flex-col gap-16 items-center">
        {checkListsDataAndValues?.pending && <CircularProgress />}
        {!checkListsDataAndValues?.pending && checkListsDataAndValues?.data && (
          <>
            <div className="grid grid-cols-2 gap-y-11 self-start w-full">
              <div className="flex gap-4">
                <Typography>ایجاد کننده:</Typography>
                <Typography>
                  {checkListsDataAndValues?.data?.creator}
                </Typography>
              </div>
              <div className="flex gap-4">
                <Typography>نام چک لیست:</Typography>
                <Typography>{checkListsDataAndValues?.data?.name}</Typography>
              </div>
              <div className="flex gap-4">
                <Typography>نام آیتم اصلی:</Typography>
                <Typography>
                  {checkListsDataAndValues?.data?.originalItem}
                </Typography>
              </div>
              <div className="flex gap-4">
                <Typography>نام آیتم فرعی:</Typography>
                <Typography>
                  {checkListsDataAndValues?.data?.subItem}
                </Typography>
              </div>
              <div className="flex gap-4">
                <Typography>تاریخ ایجاد:</Typography>
                <Typography>
                  {checkListsDataAndValues?.data?.createDate &&
                    new Date(
                      checkListsDataAndValues?.data?.createDate
                    ).toLocaleDateString("fa-ir")}
                </Typography>
              </div>
            </div>
            <div className="w-10/12 overflow-y-hidden overflow-x-scroll py-12">
              <table className="table-auto w-full">
                <thead className="border-b">
                  <tr>
                    {columns.map((col, index) => (
                      <th
                        scope="col"
                        key={index}
                        className={`px-12 py-4 text-xs ${
                          col?.class && col.class
                        }`}
                      >
                        {col.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {checkListsDataAndValues?.data?.checkListAllItemsAndValues?.map(
                    (checklist) => (
                      <tr className="border-b" key={checklist.itemId}>
                        <td className="text-xs">{checklist.itemId}</td>
                        <td className="text-xs">{checklist.itemName}</td>
                        <td className="text-xs">
                          <Select
                            value={
                              info?.find(
                                (i) => +i.itemId === +checklist.valueId
                              )?.firstControlStateId ||
                              checklist.firstControlStateId
                            }
                            fullWidth={true}
                            name={"firstControlStateId"}
                            label="وضعیت چک لیست"
                            onChange={(e) =>
                              handleChange(e, +checklist.valueId)
                            }
                            disabled={
                              mode === "entry-checklist" ||
                              mode === "entry-checklist-sent-item"
                                ? !checklist?.inspectEditable
                                : true
                            }
                            className="h-10"
                          >
                            {controlChecklistStates?.data?.map((item) => (
                              <MenuItem value={item.id} key={item?.id}>
                                {item?.state}
                              </MenuItem>
                            ))}
                          </Select>
                        </td>
                        <td className="text-xs">
                          <Select
                            value={
                              info?.find((i) => +i.itemId === checklist.valueId)
                                ?.finalControlStateId ||
                              checklist.finalControlStateId
                            }
                            fullWidth={true}
                            name={"finalControlStateId"}
                            label="وضعیت چک لیست"
                            onChange={(e) =>
                              handleChange(e, +checklist.valueId)
                            }
                            disabled={
                              mode === "entry-checklist" ||
                              mode === "entry-checklist-sent-item"
                                ? !checklist?.inspectEditable
                                : true
                            }
                            className="h-10"
                          >
                            {controlChecklistStates?.data?.map((item) => (
                              <MenuItem value={item.id} key={item?.id}>
                                {item?.state}
                              </MenuItem>
                            ))}
                          </Select>
                        </td>
                        <td className="text-xs">
                          <TextareaAutosize
                            value={
                              info?.find(
                                (i) => +i.itemId === +checklist.valueId
                              )?.inspectDescriptions ||
                              checklist.inspectDeacription
                            }
                            name="inspectDescriptions"
                            className="border-2 mt-4 flex-1 border-slate-300 p-4"
                            minRows={1}
                            onChange={(e) =>
                              handleChange(e, +checklist.valueId)
                            }
                            disabled={
                              mode === "entry-checklist" ||
                              mode === "entry-checklist-sent-item"
                                ? !checklist?.inspectEditable
                                : true
                            }
                          />
                        </td>
                        <td className="text-xs">
                          {checklist?.technicaActivityDate &&
                            new Date(
                              checklist?.technicaActivityDate
                            ).toLocaleDateString()}
                        </td>
                        <td className="text-xs">{checklist.technicaUser}</td>
                        <td className="text-xs">
                          <TextField
                            value={
                              info?.find(
                                (i) => +i.itemId === +checklist.valueId
                              )?.technicalOfficeOrder ||
                              checklist.technicalOfficeOrder
                            }
                            name={"technicalOfficeOrder"}
                            onChange={(e) =>
                              handleChange(e, +checklist.valueId)
                            }
                            label={"سفارش فنی"}
                            disabled={
                              mode === "technical-office" ||
                              mode === "technical-office-sent-item"
                                ? !checklist?.technicalEditable
                                : true
                            }
                          />
                        </td>
                        <td className="text-xs">
                          {checklist?.contractorActivityDate &&
                            new Date(
                              checklist?.contractorActivityDate
                            ).toLocaleDateString()}
                        </td>
                        <td className="text-xs">{checklist.contractorUser}</td>
                        <td className="text-xs">
                          <Switch
                            checked={
                              info?.find(
                                (i) => +i.itemId === +checklist.valueId
                              )?.setIsDone ?? checklist.contractorIsDone
                            }
                            name="contractorIsDone"
                            color="info"
                            onChange={(e) => {
                              setInfo((info) =>
                                info.map((i) =>
                                  +i.itemId === +checklist.valueId
                                    ? { ...i, setIsDone: e.target?.checked }
                                    : i
                                )
                              );
                            }}
                            disabled={
                              mode === "contractor-set-is-done" ||
                              mode === "contractor-set-is-done-sent-item"
                                ? !checklist?.contractorEditable
                                : true
                            }
                          />
                        </td>
                        <td className="text-xs">
                          {checklist?.qcFinalControlActivityDate &&
                            new Date(
                              checklist?.qcFinalControlActivityDate
                            ).toLocaleDateString()}
                        </td>
                        <td className="text-xs">
                          {checklist.qcFinalControlUser}
                        </td>
                        <td className="text-xs">
                          <Select
                            value={
                              info?.find(
                                (i) => +i.itemId === +checklist.valueId
                              )?.qcFinalControlStateId ||
                              checklist.qcFinalControlStateId
                            }
                            fullWidth={true}
                            name="qcFinalControlStateId"
                            label="وضعیت چک لیست"
                            onChange={(e) =>
                              handleChange(e, +checklist.valueId)
                            }
                            disabled={
                              mode === "final-control-checklist"
                                ? !checklist?.qcFinalControlEditable
                                : true
                            }
                            className="h-10"
                          >
                            {controlChecklistStates?.data?.map((item) => (
                              <MenuItem value={item.id} key={item?.id}>
                                {item?.state}
                              </MenuItem>
                            ))}
                          </Select>
                        </td>
                        <td className="text-xs">
                          <TextareaAutosize
                            value={
                              info?.find(
                                (i) => +i.itemId === +checklist.valueId
                              )?.finallApproveDescriptions ||
                              checklist.finallApproveDescriptions
                            }
                            name="finallApproveDescriptions"
                            className="border-2 mt-4 flex-1 border-slate-300 p-4 bg-white"
                            minRows={1}
                            onChange={(e) =>
                              handleChange(e, +checklist.valueId)
                            }
                            disabled={
                              mode === "final-control-checklist"
                                ? !checklist?.qcFinalControlEditable
                                : true
                            }
                          />
                        </td>
                        <td>
                          {checklist.hasHistory && (
                            <IconButton
                              onClick={() =>
                                handleOpenHistoryModal(checklist.valueId)
                              }
                            >
                              <HistoryIcon />
                            </IconButton>
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
            <div className="w-full flex flex-col gap-16 mb-20">
              <div className="flex justify-start gap-6 w-3/6">
                <FormControl className="w-1/2">
                  <InputLabel>وضعیت تایید بازرس</InputLabel>
                  <Select
                    value={inspectCheckListStateId || 0}
                    fullWidth={true}
                    name={"firstControlStateId"}
                    label="وضعیت چک لیست"
                    onChange={handleChangeInpectCheckListId}
                    disabled={
                      mode === "control-checklist"
                        ? !checkListsDataAndValues?.data?.inspectEditable
                        : true
                    }
                  >
                    {controlChecklistStates?.data?.map((item) => (
                      <MenuItem value={item.id} key={item?.id}>
                        {item?.state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className="w-1/2">
                  <InputLabel>وضعیت تایید مدیر کیفیت</InputLabel>
                  <Select
                    value={qcManagerCheckListStateId || 0}
                    fullWidth={true}
                    onChange={handleChangeQcManagerCheckListId}
                    disabled={
                      mode === "manager-control-checklist"
                        ? !checkListsDataAndValues?.data?.qcManagerEditable
                        : true
                    }
                  >
                    {controlChecklistStates?.data?.map((item) => (
                      <MenuItem value={+item.id} key={item?.id}>
                        {item?.state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="flex justify-start items-center gap-9">
                <div className="w-1/2 flex items-center gap-4">
                  <Typography>توضیحات مدیر کیفیت:</Typography>
                  <TextareaAutosize
                    value={qcManagerDescriptions}
                    onChange={handleChangeQcMangerDescription}
                    className="border-2 mt-4 flex-1 border-slate-300 p-4"
                    minRows={5}
                    disabled={
                      mode === "manager-control-checklist"
                        ? !checkListsDataAndValues?.data?.qcManagerEditable
                        : true
                    }
                  />
                </div>
              </div>
            </div>
            <Dialog open={isShowHistoryModal} fullWidth maxWidth="xl">
              <DialogTitle className="flex justify-between">
                تاریخچه
                <IconButton onClick={() => setIsShowHistoryModal(false)}>
                  <CloseIcon color="error" />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                {oneValueHistory.pending && <CircularProgress />}
                {!oneValueHistory.pending && (
                  <table className="table-auto w-full">
                    <thead className="border-b">
                      <tr>
                        {columns
                          .slice(0, columns.length - 1)
                          .map((col, index) => (
                            <th
                              scope="col"
                              key={index}
                              className={`px-12 py-4 text-xs ${
                                col?.class && col.class
                              }`}
                            >
                              {col.name}
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {oneValueHistory?.data?.map((checklist) => (
                        <tr
                          className="border-b text-center"
                          key={checklist.itemId}
                        >
                          <td className="text-xs">{checklist.itemId}</td>
                          <td className="text-xs">{checklist.itemName}</td>
                          <td className="text-xs">
                            {
                              controlChecklistStates?.data?.find(
                                (c) => c.id === checklist.firstControlStateId
                              )?.state
                            }
                          </td>
                          <td className="text-xs">
                            {
                              controlChecklistStates?.data?.find(
                                (c) => c.id === checklist.finalControlStateId
                              )?.state
                            }
                          </td>
                          <td className="text-xs">
                            {checklist.inspectDeacription}
                          </td>
                          <td className="text-xs">
                            {checklist?.technicaActivityDate &&
                              new Date(
                                checklist?.technicaActivityDate
                              ).toLocaleDateString()}
                          </td>
                          <td className="text-xs">{checklist.technicaUser}</td>
                          <td className="text-xs">
                            {checklist.technicalOfficeOrder}
                          </td>
                          <td className="text-xs">
                            {checklist?.contractorActivityDate &&
                              new Date(
                                checklist?.contractorActivityDate
                              ).toLocaleDateString()}
                          </td>
                          <td className="text-xs">
                            {checklist.contractorUser}
                          </td>
                          <td className="text-xs">
                            <Switch
                              checked={checklist.contractorIsDone}
                              name="contractorIsDone"
                              color="info"
                              disabled={true}
                            />
                          </td>
                          <td className="text-xs">
                            {checklist?.qcFinalControlActivityDate &&
                              new Date(
                                checklist?.qcFinalControlActivityDate
                              ).toLocaleDateString()}
                          </td>
                          <td className="text-xs">
                            {checklist.qcFinalControlUser}
                          </td>
                          <td className="text-xs">
                            {
                              controlChecklistStates?.data?.find(
                                (c) => c.id === checklist.qcFinalControlStateId
                              )?.state
                            }
                          </td>
                          <td className="text-xs">
                            {checklist.finallApproveDescriptions}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </DialogContent>
            </Dialog>
          </>
        )}
      </CardContent>

      <CardActions className="justify-end">
        <LoadingButton
          variant="outlined"
          color="success"
          onClick={handleSubmit}
        >
          ثبت
        </LoadingButton>
        <Button variant="outlined" color="error">
          لغو
        </Button>
      </CardActions>
    </Card>
  );
};

export default QcEntryCheckList;
