import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  FormControl,
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
  GetCheckListStatesAction,
  GetCheckListsDataAndValuesAction,
  InspectControlCheckListAction,
  InspectorEntryCheckListAction,
  QcManagerControlCheckListAction,
  TechnicalOfficeAddOrdersAction,
} from "../../redux/features/qcSlicer";
import { LoadingButton } from "@mui/lab";

interface IInfo {
  itemId: number;
  firstControlStateId?: number | string;
  finalControlStateId?: number | string;
  technicalOfficeOrder?: string;
  inspectDescriptions?: string;
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
];
const QcEntryCheckList = () => {
  const { id, mode } = useParams();
  const dispatch = useDispatch<any>();
  const { checkListsDataAndValues, checkListStates } = useSelector(
    (state: any) => state.qc
  );

  const [info, setInfo] = useState<IInfo[]>([]);
  const [inspectCheckListStateId, setInspectCheckListStateId] =
    useState<number>();
  const [qcManagerCheckListStateId, setQcManagerCheckListStateId] =
    useState<number>();
  const [qcManagerDescriptions, setQcManagerDescription] = useState<string>("");
  const getList = useCallback(async () => {
    await dispatch(GetCheckListsDataAndValuesAction({ instanceId: +id }));
    await dispatch(GetCheckListStatesAction());
  }, [dispatch, id]);

  useEffect(() => {
    getList();
  }, [getList]);
  useEffect(() => {
    if (checkListsDataAndValues?.data?.checkListAllItemsAndValues) {
      setInfo(
        checkListsDataAndValues?.data?.checkListAllItemsAndValues.map(
          (checklist) => ({
            itemId: checklist.itemId,
            firstControlStateId: checklist.firstControlStateId,
            finalControlStateId: checklist.finalControlStateId,
            inspectDescriptions: checklist.inspectDescriptions,
            technicalOfficeOrder: checklist.technicalOrder,
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
      case "technical":
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
                              info?.find((i) => +i.itemId === +checklist.itemId)
                                ?.firstControlStateId ||
                              checklist.firstControlStateId
                            }
                            fullWidth={true}
                            name={"firstControlStateId"}
                            label="وضعیت چک لیست"
                            onChange={(e) => handleChange(e, +checklist.itemId)}
                            disabled={
                              mode === "entry-checklist"
                                ? !checkListsDataAndValues?.data
                                    ?.inspectEditable
                                : true
                            }
                            className="h-10"
                          >
                            {checkListStates?.data?.map((item) => (
                              <MenuItem value={item.id} key={item?.id}>
                                {item?.state}
                              </MenuItem>
                            ))}
                          </Select>
                        </td>
                        <td className="text-xs">
                          <Select
                            value={
                              info?.find((i) => +i.itemId === checklist.itemId)
                                ?.finalControlStateId ||
                              checklist.finalControlStateId
                            }
                            fullWidth={true}
                            name={"finalControlStateId"}
                            label="وضعیت چک لیست"
                            onChange={(e) => handleChange(e, +checklist.itemId)}
                            disabled={
                              mode === "entry-checklist"
                                ? !checkListsDataAndValues?.data
                                    ?.inspectEditable
                                : true
                            }
                            className="h-10"
                          >
                            {checkListStates?.data?.map((item) => (
                              <MenuItem value={item.id} key={item?.id}>
                                {item?.state}
                              </MenuItem>
                            ))}
                          </Select>
                        </td>
                        <td className="text-xs">
                          <TextareaAutosize
                            value={
                              info?.find((i) => +i.itemId === +checklist.itemId)
                                ?.inspectDescriptions ||
                              checklist.inspectDescriptions
                            }
                            name="inspectDescriptions"
                            className="border-2 mt-4 flex-1 border-slate-300 p-4"
                            minRows={1}
                            onChange={(e) => handleChange(e, +checklist.itemId)}
                            disabled={
                              mode === "entry-checklist"
                                ? !checkListsDataAndValues?.data
                                    ?.inspectEditable
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
                              info?.find((i) => +i.itemId === +checklist.itemId)
                                ?.technicalOfficeOrder ||
                              checklist.technicalOfficeOrder
                            }
                            name={"technicalOfficeOrder"}
                            onChange={(e) => handleChange(e, +checklist.itemId)}
                            label={"سفارش فنی"}
                            disabled={
                              mode === "technical"
                                ? !checkListsDataAndValues?.data
                                    ?.technicalEditable
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
                            checkListStates?.data.find(
                              (ch) =>
                                +ch.id === +checklist.qcFinalControlStateId
                            )?.state
                          }
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
            <div className="w-full flex flex-col gap-16 mb-20">
              <div className="flex justify-start">
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
                    {checkListStates?.data?.map((item) => (
                      <MenuItem value={item.id} key={item?.id}>
                        {item?.state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="flex justify-start items-center gap-9">
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
                    {checkListStates?.data?.map((item) => (
                      <MenuItem value={+item.id} key={item?.id}>
                        {item?.state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
