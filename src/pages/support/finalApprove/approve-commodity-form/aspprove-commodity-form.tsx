import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Box, Divider, Grid, Typography } from "@mui/material";
import axios from "../../../../utils/axios.config";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputContent } from "../../../../components/comodity-form/style";
import SelectComponent from "../../../../components/select/selects";
import theme from "../../../../utils/theme";
import { StyledBox } from "../../approve/style";
import {useSelector} from "react-redux";
const ApproveCommodityForm: React.FC<any> = ({
  commodity,
  loading,
  onSubmitForm,
  defaults,
  isEditable,
}) => {
  const [states, setStates] = useState<any>([]);
  const [exitWarehouseCount, setExitWarehouseCount] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(true);
  const defaultHint =
    "مجموع تعداد خریداری و موجودی انبار نمیتواند بیشتر و یا کمتر از مقدار مورد نیاز باشد";
  const [hint, setHint] = useState<any>(defaultHint);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<any>({
    defaultValues: { purchaseCount: 0, finalApproveStateId: "" },
  });
  const cancel = () => {};
  const onSubmit = handleSubmit((entity: any) => {
    console.log(entity);
    onSubmitForm({ ...entity, exitWarehouseCount });
  });
  useEffect(() => {
    getApproveStates();
    for (const key in defaults) {
      if (Object.prototype.hasOwnProperty.call(defaults, key)) {
        setValue(key, defaults[key]);
      }
    }
    getCountCommodityInWarehouse();
  }, []);

  const {user} = useSelector((state) => state.user)

  const getApproveStates = async () => {
    try {
      const response = await axios.post("/Support/GetApproveStates", {
        userId: user?.id,
      });
      setStates(response.data.model);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getCountCommodityInWarehouse = async () => {
    try {
      const response = await axios.post(
        "/Support/GetCountCommodityInWarehouse",
        {
          userId: user?.id,
          commodityId: commodity.requestCaseRowCommodityId,
        }
      );
      setExitWarehouseCount(response.data.model);
      setValue("exitWarehouseCount", response.data.model);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const countChange = (count) => {
    setValue("purchaseCount", count);
    setHint(+count + exitWarehouseCount != commodity.count ? defaultHint : "");
    setDisabled(+count + exitWarehouseCount === commodity.count);
  };
  return (
    <form
      //   key={index + commodity.commodity}
      onSubmit={onSubmit}
    >
      <Grid container spacing={5} p={2}>
        <Grid item xs={12} sm={4} fontFamily="IRANSans">
          <StyledBox theme={theme}>
            <Box sx={{ mb: 6.75, display: "flex", alignItems: "center" }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginRight: "20px",
                }}
              >
                نام فعالیت:
              </Typography>
              <Typography variant="body2">{commodity.activityName}</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: "flex", alignItems: "center" }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginRight: "20px",
                }}
              >
                شرح کالا
              </Typography>

              <Typography variant="body2">{commodity.commodity} </Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: "flex", alignItems: "center" }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginRight: "20px",
                }}
              >
                تعداد
              </Typography>

              <Typography variant="body2">{commodity.count} </Typography>
            </Box>

            <Box sx={{ mb: 6.75 }}>
              <div>
                <Controller
                  control={control}
                  name="exitWarehouseCount"
                  rules={{
                    max: {
                      value: exitWarehouseCount,
                      message:
                        "مقدار وارد شده نمیتواند از موجودی انبار بیشتر باشد",
                    },
                  }}
                  render={() => (
                    <InputContent
                      type="number"
                      name="exitWarehouseCount"
                      label="درخواست از انبار"
                      register={register}
                      required={true}
                      errors={errors}
                        disabled={!isEditable}
                    />
                  )}
                />
                <Typography color="primary" variant="body2">
                  {"موجودی انبار: " + exitWarehouseCount}
                </Typography>
              </div>
            </Box>
          </StyledBox>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ mb: 6.75, display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                marginRight: "20px",
              }}
            >
              وضعیت تایید:
            </Typography>

            <Typography variant="body2">{commodity.approveState}</Typography>
          </Box>
          <Box sx={{ mb: 6.75, display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                marginRight: "20px",
              }}
            >
              تایید کننده ی نهایی:
            </Typography>

            <Typography variant="body2">{commodity.finalApprover}</Typography>
          </Box>
          <Box sx={{ mb: 6.75, display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                marginRight: "20px",
              }}
            >
              تاریخ نیاز:
            </Typography>

            <Typography variant="body2">
              {new Date(commodity.requiredDate).toLocaleDateString("fa-IR")}
            </Typography>
          </Box>

          <Box>
            <div>
              <Controller
                control={control}
                name="purchaseCount"
                render={() => (
                  <InputContent
                    type="number"
                    name="purchaseCount"
                    label="تعداد/مقدار خریداری"
                    register={register}
                    required={true}
                    errors={errors}
                    disabled={!isEditable}
                  />
                )}
              />
            </div>
          </Box>

          <Box sx={{ mb: 6.75, display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                marginRight: "20px",
              }}
            ></Typography>

            <Typography color="error" variant="body2">
              {hint ?? ""}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Controller
            control={control}
            rules={{ required: " approve state is required" }}
            name="finalApproveStateId"
            render={({ field }) => (
              <SelectComponent
                label="وضعیت تایید نهایی"
                valuefieldName="id"
                labelFieldName="state"
                options={states}
                field={field}
                disabled={!isEditable}
              />
            )}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {/* <Button
          onClick={cancel}
          type="button"
          sx={{ justifySelf: "flex-start", marginRight: "20px" }}
          color="warning"
          variant="contained"
        >
          لغو
          <CancelIcon sx={{ marginLeft: "10px" }} />
        </Button> */}
        <LoadingButton
          loading={loading}
          disabled={loading || !isValid}
          type="submit"
          sx={{ justifySelf: "flex-start", marginRight: "20px" }}
          color="info"
          variant="contained"
        >
          ذخیره
          <SaveIcon sx={{ marginLeft: "10px" }} />
        </LoadingButton>
      </Box>

      <Divider sx={{ width: "80%", margin: "20px auto" }} />
    </form>
  );
};
export default ApproveCommodityForm;
