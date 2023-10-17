import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  GetCheckListStatesAction,
  GetCheckListsDataAndValuesAction,
  InspectorEntryCheckListAction,
} from "../../redux/features/qcSlicer";
import { LoadingButton } from "@mui/lab";

interface IInfo {
  itemId: number;
  firstControlStateId?: number | string;
  finalControlStateId?: number | string;
  qcFinalControlStateId?: number | string;
  contractorIsDone?: boolean;
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
  { name: "technicalOredr" },
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

  const [info, setInfo] = useState<IInfo[]>([{ itemId: 1 }]);

  const getList = useCallback(async () => {
    await dispatch(GetCheckListsDataAndValuesAction({ instanceId: +id }));
    await dispatch(GetCheckListStatesAction());
  }, [dispatch, id]);

  useEffect(() => {
    getList();
  }, [getList]);

  const handleChange = (e, itemId) => {
    setInfo((info) =>
      info.map((i) =>
        +i.itemId === +itemId ? { ...i, [e.target?.name]: e.target?.value } : i
      )
    );
  };
  const handleChangeSwitch = (e, itemId) => {
    setInfo((info) =>
      info.map((i) =>
        +i.itemId === +itemId ? { ...i, [e.target?.name]: e.target.checked } : i
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
    }
  };
  return (
    <Card>
      <CardHeader title="پر کردن چک لیست" className="text-right" />

      <CardContent className="mt-5 flex flex-col gap-16 items-center">
        {checkListsDataAndValues?.data && (
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
                  <tr className="border-b">
                    <td className="text-xs">1</td>
                    <td className="text-xs">نام تستی</td>
                    <td className="text-xs">
                      <Select
                        value={
                          info?.find((i) => +i.itemId === 1)
                            ?.firstControlStateId
                        }
                        fullWidth={true}
                        name={"firstControlStateId"}
                        label="وضعیت چک لیست"
                        onChange={(e) => handleChange(e, 1)}
                        disabled={mode === "entry-checklist" ? false : true}
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
                          info?.find((i) => +i.itemId === 1)
                            ?.finalControlStateId
                        }
                        fullWidth={true}
                        name={"finalControlStateId"}
                        label="وضعیت چک لیست"
                        onChange={(e) => handleChange(e, 1)}
                        disabled={mode === "entry-checklist" ? false : true}
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
                          info?.find((i) => +i.itemId === 1)
                            ?.inspectDescriptions
                        }
                        name={"inspectDescriptions"}
                        onChange={(e) => handleChange(e, 1)}
                        className="border-2 mt-4 flex-1 border-slate-300 p-4 "
                        minRows={1}
                        disabled={mode === "entry-checklist" ? false : true}
                      />
                    </td>
                    <td className="text-xs">1402/01/12</td>
                    <td className="text-xs">کاربر فنی تستی</td>
                    <td className="text-xs">نمیدونم چی چیه</td>
                    <td className="text-xs">1402/01/12</td>
                    <td className="text-xs">پیمانکار تستی</td>
                    <td className="text-xs">
                      <Switch
                        checked={
                          info?.find((i) => +i.itemId === 1)?.contractorIsDone
                        }
                        onChange={(e) => handleChangeSwitch(e, 1)}
                        name="contractorIsDone"
                        color="info"
                      />
                    </td>
                    <td className="text-xs">1402/01/12</td>
                    <td className="text-xs">کنترل کننده تستی</td>
                    <td className="text-xs">
                      <Select
                        value={
                          info?.find((i) => +i.itemId === 1)
                            ?.qcFinalControlStateId
                        }
                        fullWidth={true}
                        name={"qcFinalControlStateId"}
                        label="وضعیت چک لیست"
                        onChange={(e) => handleChange(e, 1)}
                        // disabled={
                        //   mode === "control-checklist"
                        //     ? !subItemDetails?.data?.inspectorEditable
                        //     : true
                        // }
                        className="h-10"
                      >
                        {checkListStates?.data?.map((item) => (
                          <MenuItem value={item.id} key={item?.id}>
                            {item?.state}
                          </MenuItem>
                        ))}
                      </Select>
                    </td>
                  </tr>
                </tbody>
              </table>
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
