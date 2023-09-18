import { Card, Divider, Grid, Box, Button } from "@mui/material";
import WarehouseForm from "./WarhouseForm";
import { Controller, useForm } from "react-hook-form";
import { InputContent } from "../../components/comodity-form/style";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import { ButtonContainer, StyledForm } from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  AddDetailsToPurchaseOrderAction,
  ApproveUpdateDetailsAction,
  FinancialUpdateDetailsActions,
  setPurchaseRowSelectedAction,
  UpdateDetailsToPurchaseOrderAction,
} from "../../redux/features/purchaseSlicer";
import { GetAllSuppliers } from "../../redux/features/definitionSlicer";
import SelectComponent from "../../components/select/selects";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { GetApproveStatesAction } from "../../redux/features/supportSlicer";

const ExitWarehouseDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const {
    purchaseRowSelected,
    approve: { updatePurchaseRes },
  } = useSelector((state: any) => state?.purchase);
  const { states } = useSelector((state: any) => state?.support?.approve);
  const isEditable = purchaseRowSelected?.approveEditable;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<any>({
    defaultValues: {
      count: 0,
      approveStateId: 0,
    },
  });
  useEffect(() => {
    getApproveStates();
  }, []);
  useEffect(() => {
    if (purchaseRowSelected) {
      setValue("count", purchaseRowSelected.count);
      setValue("approveStateId", purchaseRowSelected.ApproveStateId);
    } else {
      setValue("count", 0);
      setValue("approveStateId", 0);
    }
  }, [purchaseRowSelected]);
  const getApproveStates = async () => {
    await dispatch(GetApproveStatesAction());
  };
  const handleEdit = async () => {
    const { count, approveStateId } = getValues();
    await dispatch(
      ApproveUpdateDetailsAction({
        count,
        ApproveStateId: approveStateId,
        purchaseOrderDetailsId: +purchaseRowSelected.id,
      })
    );
    navigate(0);
  };
  const handleCancelEdit = () => {
    dispatch(setPurchaseRowSelectedAction(undefined));
  };
  return (
    <div>
      <WarehouseForm />
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
                name="count"
                render={() => (
                  <InputContent
                    name="count"
                    label="تعداد"
                    register={register}
                    required={true}
                    errors={errors}
                    disabled={purchaseRowSelected && !isEditable}
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
                name="approveStateId"
                defaultValue={0}
                render={({ field }) => (
                  <SelectComponent
                    label="وضعیت"
                    valuefieldName="id"
                    labelFieldName="state"
                    options={states?.data}
                    field={field}
                    disabled={purchaseRowSelected && !isEditable}
                  />
                )}
              />
            </Box>
          </Grid>
          <ButtonContainer>
            {purchaseRowSelected && (
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
                  disabled={purchaseRowSelected && !isEditable}
                >
                  ثبت
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

export default ExitWarehouseDetails;
