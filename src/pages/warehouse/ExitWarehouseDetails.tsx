import {
  Card,
  Divider,
  Grid,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Switch,
} from "@mui/material";
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
  UpdateDetailsToPurchaseOrderAction,
} from "../../redux/features/purchaseSlicer";
import {
  setWarhouseRowSelectedAction,
  GetExitWarehouseOrderDataAction,
  SupplierAddDetailsToWarehouseOrderAction,
  SupplierUpdateDetailsToWarehouseOrderAction,
  WarehouseAddDetailsToExitFromWarehouseAction,
  WarehouseUpdateDetailsToExitFromWarehouseAction,
} from "../../redux/features/warehouseSlicer";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

const ExitWarehouseDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<any>();
  const {
    exitOrderDetailData,
    warehouseRowSelected,
    exitWarehouse: { addExitWarhouse, updateExitWarhouse },
  } = useSelector((state: any) => state?.warehouse);
  const [mode, setMode] = useState<"edit" | "add">("add");
  const [receiveIsOk, setReceiveIsOk] = useState<boolean>(true);

  const isEditable = warehouseRowSelected?.warehouseEditable;
  const isAddEditable = exitOrderDetailData?.data?.isEditable;
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
    },
  });

  useEffect(() => {
    if (warehouseRowSelected) {
      setMode("edit");
      setValue("count", warehouseRowSelected.count);
      setValue("receiveIsOk", warehouseRowSelected.receiveIsOk);
    } else {
      setMode("add");
      setValue("count", 0);
      setValue("receiveIsOk", true);
    }
  }, [warehouseRowSelected]);

  const handleAdd = async () => {
    const { count } = getValues();
    console.log(receiveIsOk);
    await dispatch(
      WarehouseAddDetailsToExitFromWarehouseAction({
        count,
        receiveIsOk,
        exitWarehouseOrderId: +id,
      })
    );
    await dispatch(GetExitWarehouseOrderDataAction({ id: +id }));
  };
  const handleEdit = async () => {
    const { count } = getValues();

    await dispatch(
      WarehouseUpdateDetailsToExitFromWarehouseAction({
        count,
        id: +warehouseRowSelected.id,
      })
    );
    await dispatch(GetExitWarehouseOrderDataAction({ id: +id }));
  };
  const handleCancelEdit = () => {
    dispatch(setWarhouseRowSelectedAction(undefined));
  };
  return (
    <div>
      <WarehouseForm mode="exitWarehouse" />
      <Card sx={{ padding: 5 }}>
        <StyledForm>
          <Grid container>
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
                name="count"
                render={() => (
                  <InputContent
                    name="count"
                    label="مقدار"
                    register={register}
                    required={true}
                    errors={errors}
                    disabled={
                      (mode === "edit" && !isEditable) ||
                      (mode === "add" && !isAddEditable)
                    }
                  />
                )}
              />
            </Box>
          </Grid>
          <ButtonContainer>
            {mode === "add" && (
              <LoadingButton
                loading={addExitWarhouse.pending}
                type="submit"
                sx={{
                  justifySelf: "flex-start",
                  marginRight: "20px",
                  alignSelf: "end",
                }}
                color="info"
                variant="contained"
                onClick={handleAdd}
                disabled={!isAddEditable}
              >
                افزودن
                <SaveIcon sx={{ marginLeft: "10px" }} />
              </LoadingButton>
            )}
            {mode === "edit" && (
              <>
                <LoadingButton
                  loading={updateExitWarhouse.pending}
                  type="submit"
                  sx={{
                    justifySelf: "flex-start",
                    marginRight: "20px",
                    alignSelf: "end",
                  }}
                  color="warning"
                  variant="contained"
                  onClick={handleEdit}
                  disabled={mode === "edit" && !isEditable}
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

export default ExitWarehouseDetails;
