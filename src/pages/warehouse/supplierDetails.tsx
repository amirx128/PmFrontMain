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
  UpdateDetailsToPurchaseOrderAction,
} from "../../redux/features/purchaseSlicer";
import {
  setWarhouseRowSelectedAction,
  GetWarehouseOrderDataAction,
  SupplierAddDetailsToWarehouseOrderAction,
  SupplierUpdateDetailsToWarehouseOrderAction,
} from "../../redux/features/warehouseSlicer";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

const SupplierDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<any>();
  const {
    orderDetailData,
    warehouseRowSelected,
    supplier: { addSupplierToWarehouse, updateSupplierToWarehouse },
  } = useSelector((state: any) => state?.warehouse);
  const [mode, setMode] = useState<"edit" | "add">("add");

  const isEditable = warehouseRowSelected?.supportEditable;
  const isAddEditable = orderDetailData?.data?.isEditable;
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<any>({
    defaultValues: {
      sentCount: 0,
    },
  });

  useEffect(() => {
    if (warehouseRowSelected) {
      setMode("edit");
      setValue("sentCount", warehouseRowSelected.sentCount);
    } else {
      setMode("add");
      setValue("sentCount", 0);
    }
  }, [warehouseRowSelected]);

  const handleAdd = async () => {
    const { sentCount } = getValues();
    await dispatch(
      SupplierAddDetailsToWarehouseOrderAction({
        sentCount,
        warehouseOrderId: +id,
      })
    );
    await dispatch(GetWarehouseOrderDataAction({ id: +id }));
  };
  const handleEdit = async () => {
    const { sentCount } = getValues();
    await dispatch(
      SupplierUpdateDetailsToWarehouseOrderAction({
        id: +warehouseRowSelected?.id,
        sentCount,
      })
    );
    await dispatch(GetWarehouseOrderDataAction({ id: +id }));
  };
  const handleCancelEdit = () => {
    dispatch(setWarhouseRowSelectedAction(undefined));
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
              }}
            >
              <Controller
                control={control}
                name="sentCount"
                render={() => (
                  <InputContent
                    name="sentCount"
                    label="مقدار ارسالی"
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
                loading={addSupplierToWarehouse.pending}
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
                  loading={updateSupplierToWarehouse.pending}
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

export default SupplierDetails;
