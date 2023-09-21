import {
  Card,
  Divider,
  Grid,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
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
  GetWarehouseOrderDataAction,
  setWarhouseRowSelectedAction,
} from "../../redux/features/warehouseSlicer";
import { GetUsersListAction } from "../../redux/features/administrationSlicer";
import SelectComponent from "../../components/select/selects";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { GetApproveStatesAction } from "../../redux/features/supportSlicer";
import {
  WarehouseReceiveCommidityAction,
  WarehouseRequesterUserApproveReceiveAction,
} from "../../redux/features/warehouseSlicer";

const RequesterUserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch<any>();
  const {
    warehouseRowSelected,
    requesterUser: { updateApproveState },
  } = useSelector((state: any) => state?.warehouse);
  const [receiveIsOk, setReceiveIsOk] = useState<boolean>(true);

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
      count: 0,
    },
  });
  useEffect(() => {
    if (warehouseRowSelected) {
      setValue("count", warehouseRowSelected.count);
    } else {
      setValue("count", 0);
    }
  }, [warehouseRowSelected]);

  const handleEdit = async () => {
    const { count } = getValues();
    await dispatch(
      WarehouseRequesterUserApproveReceiveAction({
        count,
        receiveIsOk,
        exitFromWarehouseDetailsId: +warehouseRowSelected.id,
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
                name="count"
                render={() => (
                  <InputContent
                    name="count"
                    label="مقدار"
                    register={register}
                    required={true}
                    errors={errors}
                    disabled={!warehouseRowSelected}
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
                name="receiveIsOk"
                render={() => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={receiveIsOk}
                        onChange={() => setReceiveIsOk((prev) => !prev)}
                      />
                    }
                    label="تایید دریافت کننده"
                  />
                )}
              />
            </Box>
          </Grid>
          <ButtonContainer>
            {warehouseRowSelected && (
              <>
                <LoadingButton
                  loading={updateApproveState.pending}
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

export default RequesterUserDetails;
