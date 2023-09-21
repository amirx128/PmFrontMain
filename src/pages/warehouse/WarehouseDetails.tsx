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
  GetWarehouseOrderDataAction,
  setWarhouseRowSelectedAction,
} from "../../redux/features/warehouseSlicer";
import { GetUsersListAction } from "../../redux/features/administrationSlicer";
import SelectComponent from "../../components/select/selects";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { GetApproveStatesAction } from "../../redux/features/supportSlicer";
import { WarehouseReceiveCommidityAction } from "../../redux/features/warehouseSlicer";

const WarehouseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const {
    warehouseRowSelected,
    warehouse: { updateWarehouse },
  } = useSelector((state: any) => state?.warehouse);
  const { usersList } = useSelector(
    (state: any) => state?.administrations?.users
  );
  const isEditable = warehouseRowSelected?.approveEditable;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<any>({
    defaultValues: {
      receiveCount: 0,
    },
  });
  useEffect(() => {
    getAllUsers();
  }, []);
  useEffect(() => {
    if (warehouseRowSelected) {
      setValue("receiveCount", warehouseRowSelected.receiveCount);
    } else {
      setValue("receiveCount", 0);
    }
  }, [warehouseRowSelected]);
  const getAllUsers = async () => {
    dispatch(GetUsersListAction());
  };
  const handleEdit = async () => {
    const { receiveCount } = getValues();
    await dispatch(
      WarehouseReceiveCommidityAction({
        warehouseOrderId: +id,
        warehouseOrderDetailsId: +warehouseRowSelected.id,
        receiveCount: +receiveCount,
      })
    );
    await dispatch(GetWarehouseOrderDataAction({ id: +id }));
  };
  const handleCancelEdit = () => {
    dispatch(setWarhouseRowSelectedAction(undefined));
  };
  console.log(usersList);
  return (
    <div>
      <WarehouseForm />
      <Card sx={{ padding: 5 }}>
        <StyledForm>
          <Grid container sx={{}}>
            <Box
              sx={{
                mb: 6.75,
                display: "flex",
                alignItems: "center",
                width: "50%",
              }}
            >
              <Controller
                control={control}
                rules={{ required: " approve state is required" }}
                name="senderId"
                render={({ field }) => (
                  <SelectComponent
                    label="ارسال کننده"
                    valuefieldName="id"
                    labelFieldName={["firstName", "lastName"]}
                    options={usersList && usersList}
                    field={field}
                    disabled={true}
                    sx={{
                      width: "49%",
                    }}
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                mb: 6.75,
                display: "flex",
                alignItems: "center",
                width: "50%",
              }}
            >
              <Controller
                control={control}
                rules={{ required: " approve state is required" }}
                name="receiverId"
                render={({ field }) => (
                  <SelectComponent
                    label="دریافت کننده"
                    valuefieldName="id"
                    labelFieldName={["firstName", "lastName"]}
                    options={usersList && usersList}
                    field={field}
                    disabled={true}
                    sx={{
                      width: "49%",
                    }}
                  />
                )}
              />
            </Box>
          </Grid>
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
                name="receiveCount"
                render={() => (
                  <InputContent
                    name="receiveCount"
                    label="مقدار دریافتی"
                    register={register}
                    required={true}
                    errors={errors}
                    disabled={!warehouseRowSelected}
                  />
                )}
              />
            </Box>
          </Grid>

          <ButtonContainer>
            {warehouseRowSelected && (
              <>
                <LoadingButton
                  loading={updateWarehouse.pending}
                  type="submit"
                  sx={{
                    justifySelf: "flex-start",
                    marginRight: "20px",
                    alignSelf: "end",
                  }}
                  color="warning"
                  variant="contained"
                  onClick={handleEdit}
                  disabled={!warehouseRowSelected}
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

export default WarehouseDetails;
