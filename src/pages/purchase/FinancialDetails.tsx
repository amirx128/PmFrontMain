import { PageTileComponent} from "../style";


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
  FinancialUpdateDetailsActions,
  setPurchaseRowSelectedAction,
  UpdateDetailsToPurchaseOrderAction,
  GetPurchaseOrderDataAction,
} from "../../redux/features/purchaseSlicer";
import { GetAllSuppliers } from "../../redux/features/definitionSlicer";
import SelectComponent from "../../components/select/selects";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

const FinancialDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch<any>();
  const {
    purchaseRowSelected,
    financials: { updatePurchaseRes },
  } = useSelector((state: any) => state?.purchase);
  const isEditable = purchaseRowSelected?.financialEditable;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<any>({
    defaultValues: {
      mablaghEtebar: 0,
    },
  });

  useEffect(() => {
    if (purchaseRowSelected) {
      setValue("mablaghEtebar", purchaseRowSelected.etebar);
    } else {
      setValue("mablaghEtebar", 0);
    }
  }, [purchaseRowSelected]);
  const handleEdit = async () => {
    const { mablaghEtebar } = getValues();
    await dispatch(
      FinancialUpdateDetailsActions({
        mablaghEtebar,
        purchaseOrderDetailsId: +purchaseRowSelected.id,
      })
    );
    await dispatch(GetPurchaseOrderDataAction({ id: +id }));
  };
  const handleCancelEdit = () => {
    dispatch(setPurchaseRowSelectedAction(undefined));
  };
  return (
    <div>
     <PageTileComponent __text= {document.title} />

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
                name="mablaghEtebar"
                render={() => (
                  <InputContent
                    name="mablaghEtebar"
                    label="مبلغ اعتبار"
                    register={register}
                    required={true}
                    errors={errors}
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

export default FinancialDetails;
