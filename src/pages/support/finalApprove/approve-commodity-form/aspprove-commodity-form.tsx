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
import { useSelector } from "react-redux";
import { getUserIdFromStorage } from "../../../../utils/functions.ts";
import { getValue } from "@mui/system";
import { Watch } from "@mui/icons-material";
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
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid, dirtyFields },
    watch,
  } = useForm<any>({
    defaultValues: {
      purchaseCount: commodity?.purchaseOrderCount || 0,
      finalApproveStateId: commodity?.finalApproveStateId,
      exitWarehouseCount: 0,
    },
  });
  const onSubmit = handleSubmit((entity: any) => {
    const { exitWarehouseCount: exitCount } = getValues();
    onSubmitForm({ ...entity, exitWarehouseCount: exitCount });
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

  const { user } = useSelector((state: any) => state?.user);

  const getApproveStates = async () => {
    try {
      const response = await axios.post("/Support/GetApproveStates", {
        userId: user?.id ?? getUserIdFromStorage(),
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
          userId: user?.id ?? getUserIdFromStorage(),
          commodityId: commodity.commodityId,
        }
      );
      setExitWarehouseCount(response.data.model);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const countChange = (count) => {
    setValue("purchaseCount", count);
    setDisabled(+count + exitWarehouseCount === commodity.count);
  };
  return (
    <form
      //   key={index + commodity.commodity}
      onSubmit={onSubmit}
    >
      <Grid container spacing={5} p={2}>
        <Grid item xs={12} sm={3} fontFamily="IRANSans">
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
                      disabled={!isEditable}
                    />
                  )}
                />
                <Typography color="primary" variant="body2">
                  {"موجودی انبار: " + exitWarehouseCount}
                </Typography>
                {dirtyFields.exitWarehouseCount && !isValid && (
                  <span style={{ color: theme.palette.error.light }}>
                    مقدار وارد شده نمیتواند از موجودی انبار بیشتر باشد
                  </span>
                )}
              </div>
            </Box>
          </StyledBox>
        </Grid>
        <Grid item xs={12} sm={3}>
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
              تایید کننده :
            </Typography>

            <Typography variant="body2">{commodity.approver}</Typography>
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
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
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
                وضعیت تصویب:
              </Typography>

              <Typography variant="body2">
                {commodity.finalApproveState}
              </Typography>
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
                تضویب کننده:
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
                تاریخ تصویب:
              </Typography>

              <Typography variant="body2">
                {commodity.finalApproveDate &&
                  new Date(commodity.finalApproveDate).toLocaleDateString(
                    "fa-IR"
                  )}
              </Typography>
            </Box>
            <Box>
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
            </Box>
          </StyledBox>
        </Grid>
        {/* <Grid item xs={12} sm={3}>
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
                وضعیت تصویب:
              </Typography>

              <Typography variant="body2">
                {commodity.finalApproveState}
              </Typography>
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
                تضویب کننده:
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
                تاریخ تصویب:
              </Typography>

              <Typography variant="body2">
                {commodity.finalApproveDate &&
                  new Date(commodity.finalApproveDate).toLocaleDateString(
                    "fa-IR"
                  )}
              </Typography>
            </Box>
          </StyledBox>
        </Grid> */}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
