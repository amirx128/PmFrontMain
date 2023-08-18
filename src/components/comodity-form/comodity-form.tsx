import DeleteIcon from "@mui/icons-material/Delete";
import { Controller, useForm } from "react-hook-form";
import {
  DatePickerWrapper,
  Form,
  InputContent,
  Row,
  TreeWrapper,
} from "./style";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  Autocomplete,
  Box,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IComodityFields } from "../../core/comodity/comodity.model";
import Tree from "../tree/tree";
import DatePicker from "react-multi-date-picker";
import JalaliDatePicker from "../date-picker/date-picker";
interface Iprops {
  comodity?: IComodityFields;
  deleteComodity: () => void;
  onCommodityChange: (data: any) => void;
  commodityDescription?: any[];
  activities?: any[];
}

const ComodiryForm: React.FC<Iprops> = ({
  comodity,
  deleteComodity,
  commodityDescription,
  activities,
  onCommodityChange,
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IComodityFields>();
  const [date, setDate] = useState(new Date().toLocaleDateString("fa-IR"));
  const [unit, setUnit] = useState("");
  const onSubmit = handleSubmit((data) => {
    console.log("submitting...", data);
    console.log("errors...", errors);
  });
  // useEffect(() => {
  //   if (comodity) {
  //     setValue("activityId", comodity.activityId);
  //     setValue("commodityId", comodity.commodityId);
  //     setValue("count", comodity.count);
  //     setValue("requiredDate", comodity.requiredDate);
  //   }
  // }, [comodity]);
  useEffect(() => {
    if (date) {
      setValue("requiredDate", date);
      onCommodityChange(getValues());
    }
  }, [date]);
  useEffect(() => {
    console.log(commodityDescription);
    onCommodityChange(getValues());
    setValue("requiredDate", new Date());
  }, []);
  const comoditiDescriptionChanged = (event, val) => {
    setUnit(val.unit);
    setValue("commodityId", val.id);
    onCommodityChange(getValues());
  };
  const activityChange = (event, val) => {
    setValue("activityId", val.id);
    onCommodityChange(getValues());
  };
  const countChange = (event) => {
    setValue("count", event);
    onCommodityChange(getValues());
  };
  const setSelectedDate = (e) => {
    const date = new Date(e).toISOString();
    setDate(date);
    setValue("requiredDate", date);
   };
  return (
    <>
      <Row>
        <Controller
          control={control}
          name="commodityId"
          defaultValue={undefined}
          render={({}) => (
            <Autocomplete
              {...register}
              disablePortal
              id="combo-box-demo"
              onChange={(event, value) =>
                comoditiDescriptionChanged(event, value)
              }
              options={commodityDescription ? commodityDescription : []}
              getOptionLabel={(option: any) => option.serchableName}
              renderOption={(props, option: any) => (
                <li {...props} value={option}>
                  <span>
                    {option.commodityAddress
                      .replaceAll(":", ">")
                      .replace(">", "در دسته")}
                  </span>
                </li>
              )}
              sx={{ flex: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="شرح کالا" />
              )}
            />
          )}
        />
      </Row>
      {/* <Form onSubmit={onSubmit}> */}
      <Row>
        {/* <TreeWrapper>
            <Tree treeData={commodityDescription}></Tree>
          </TreeWrapper> */}

        {/* <InputContent
              name="activityId"
              label="  نام فعالیت"
                register={register}
                errors={errors}
              /> */}
        <Controller
          control={control}
          name="activityId"
          defaultValue={undefined}
          render={({}) => (
            <Autocomplete
              {...register}
              disablePortal
              id="activityId"
              onChange={(event, value) => activityChange(event, value)}
              options={activities ? activities : []}
              getOptionLabel={(option: any) => option.name}
              sx={{ flex: 1 }}
              renderInput={(params) => <TextField {...params} label="فعالیت" />}
            />
          )}
        />

        <Controller
          control={control}
          name="count"
          defaultValue={undefined}
          render={() => (
            <InputContent
              // onChange={(event) => countChange(event)}
              name="count"
              label="  تعداد/مقدار "
              register={register}
              errors={errors}
            />
          )}
        />
        <Box sx={{ flex: 1, display: "flex", alignItems: "unset" }}>
          {/* <Typography fontFamily="IRANSans" component="p">واحد شمارش</Typography> */}
          <Typography
            fontFamily="IRANSans"
            sx={{ lineHeight: "70px" }}
            component="p"
          >
            {unit}
          </Typography>
        </Box>
        {/* <Controller
            control={control}
            name="requiredDate"
            defaultValue={undefined}
            render={({ field }) => (
              <InputContent
                name="requiredDate"
                label=" تاریخ نیاز"
                register={register}
                errors={errors}
              />
            )}
          /> */}
        {/* <DatePickerWrapper>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={date}
            onChange={setSelectedDate}
          />
        </DatePickerWrapper> */}
        <Box sx={{ flex: 1 }}>
          <JalaliDatePicker
            defaultValue={date}
            onChange={setSelectedDate}
            name="requiredDate"
            label="تاریخ نیاز"
            register={register}
          ></JalaliDatePicker>
        </Box>
        <IconButton
          onClick={deleteComodity}
          sx={{ justifySelf: "flex-start", marginBottom: "auto" }}
        >
          <DeleteIcon />
        </IconButton>
      </Row>
      {/* </Form> */}
    </>
  );
};
export default ComodiryForm;
