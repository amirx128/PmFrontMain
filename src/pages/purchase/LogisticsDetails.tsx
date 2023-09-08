import { Card, Divider, Grid, Box, Button } from "@mui/material";
import PurchaseForm from "./PurchaseForm";
import { Controller, useForm } from "react-hook-form";
import { InputContent } from "../../components/comodity-form/style";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import { ButtonContainer, StyledForm } from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  AddDetailsToPurchaseOrderAction,
  setPurchaseRowSelectedAction,
  UpdateDetailsToPurchaseOrderAction,
} from "../../redux/features/purchaseSlicer";
import { GetAllSuppliers } from "../../redux/features/definitionSlicer";
import SelectComponent from "../../components/select/selects";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

const LogisticsDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const {
    orderDetailData,
    purchaseRowSelected,
    logistics: { addPurchaseRes, updatePurchaseRes },
  } = useSelector((state: any) => state?.purchase);
  const { suppliers } = useSelector((state: any) => state?.definition);
  const [mode, setMode] = useState<"edit" | "add">("add");
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<any>({
    defaultValues: {
      baravordFeeKala: 0,
      baravordkolMandeh: 0,
      supporterId: 0,
    },
  });
  useEffect(() => {
    getAllSupplires();
  }, []);
  useEffect(() => {
    if (purchaseRowSelected) {
      setMode("edit");
      setValue("baravordFeeKala", purchaseRowSelected.baravordFeeKala);
      setValue("baravordkolMandeh", purchaseRowSelected.baravordkolMandeh);
      setValue("supporterId", purchaseRowSelected.supporterUserId);
    } else {
      setMode("add");
      setValue("baravordFeeKala", 0);
      setValue("baravordkolMandeh", 0);
      setValue("supporterId", 0);
    }
  }, [purchaseRowSelected]);
  const getAllSupplires = async () => {
    await dispatch(GetAllSuppliers());
  };
  const handleAdd = async () => {
    const { baravordFeeKala, baravordkolMandeh, supporterId } = getValues();
    await dispatch(
      AddDetailsToPurchaseOrderAction({
        supporterId: String(supporterId),
        purchaseOrderId: +orderDetailData.data.purchaseId,
        BaravordFeeKala: baravordFeeKala,
        BaravordkolMandeh: baravordkolMandeh,
      })
    );
    navigate(0);
  };
  const handleEdit = async () => {
    const { baravordFeeKala, baravordkolMandeh, supporterId } = getValues();
    await dispatch(
      UpdateDetailsToPurchaseOrderAction({
        supporterId: String(supporterId),
        BaravordFeeKala: baravordFeeKala,
        BaravordkolMandeh: baravordkolMandeh,
        PurchaseOrderDetailsId: +purchaseRowSelected.id,
      })
    );
    navigate(0);
  };
  const handleCancelEdit = () => {
    dispatch(setPurchaseRowSelectedAction(undefined));
  };
  return (
    <div>
      <PurchaseForm />
      <Card sx={{ padding: 5 }}>
        <StyledForm>
          <Grid container>
            <Box
              sx={{
                mb: 6.75,
                display: "flex",
                alignItems: "center",
                flex: "1",
                ml: 15,
              }}
            >
              <Controller
                control={control}
                name="baravordFeeKala"
                render={() => (
                  <InputContent
                    name="baravordFeeKala"
                    label="براورد فی کالا"
                    register={register}
                    required={true}
                    errors={errors}
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                mb: 6.75,
                display: "flex",
                alignItems: "center",
                flex: "1",
              }}
            >
              <Controller
                control={control}
                name="baravordkolMandeh"
                render={() => (
                  <InputContent
                    name="baravordkolMandeh"
                    label="براورد کل مانده"
                    register={register}
                    required={true}
                    errors={errors}
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                mb: 6.75,
                display: "flex",
                alignItems: "center",
                flex: "1",
              }}
            >
              <Controller
                control={control}
                rules={{ required: " approve state is required" }}
                name="supporterId"
                defaultValue={0}
                render={({ field }) => (
                  <SelectComponent
                    label="تامین کننده"
                    valuefieldName="id"
                    labelFieldName="supplierName"
                    options={suppliers?.data}
                    field={field}
                  />
                )}
              />
            </Box>
          </Grid>
          <ButtonContainer>
            {mode === "add" && (
              <LoadingButton
                loading={addPurchaseRes.pending}
                type="submit"
                sx={{
                  justifySelf: "flex-start",
                  marginRight: "20px",
                  alignSelf: "end",
                }}
                color="info"
                variant="contained"
                onClick={handleAdd}
              >
                افزودن
                <SaveIcon sx={{ marginLeft: "10px" }} />
              </LoadingButton>
            )}
            {mode === "edit" && (
              <>
                <LoadingButton
                  loading={updatePurchaseRes.pending}
                  type="submit"
                  sx={{
                    justifySelf: "flex-start",
                    marginRight: "20px",
                    alignSelf: "end",
                  }}
                  color="warning"
                  variant="contained"
                  onClick={handleEdit}
                >
                  ویرایش
                  <EditIcon sx={{ marginLeft: "10px" }} />
                </LoadingButton>
                <Button
                  type="button"
                  sx={{
                    justifySelf: "flex-start",
                    marginRight: "20px",
                    alignSelf: "end",
                  }}
                  color="error"
                  variant="contained"
                  onClick={handleCancelEdit}
                >
                  انصراف
                </Button>
              </>
            )}
          </ButtonContainer>
        </StyledForm>
      </Card>
    </div>
  );
};

export default LogisticsDetails;