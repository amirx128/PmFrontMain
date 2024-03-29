import { PageTileComponent } from '../../style';

import List from '@mui/icons-material/List';
import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material';
import axios from '../../../utils/axios.config';
import { useEffect, useState } from 'react';
import { StyledBox } from './style';

import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/CancelOutlined';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { InputContent } from '../../../components/comodity-form/style';
import SelectComponent from '../../../components/select/selects';
import { withSnackbar } from '../../../utils/snackbar-hook';
import RequestDetail from '../request-detail';
import { useSelector } from 'react-redux';
import { getUserIdFromStorage } from '../../../utils/functions.ts';
import JalaliDatePicker from '../../../components/date-picker/date-picker.tsx';
const ApproveDetail = (props) => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<any>({ defaultValues: { newCount: 0 } });
  const params = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<any>({});
  const [states, setStates] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [requireDate, setRequireDate] = useState(new Date());
  useEffect(() => {
    if (!params || !params.id) {
      navigate('/');
    }
    getApproveStates();
    getRequestDetail();
  }, []);
  useEffect(() => {
    if (detail.commodities) {
      setRequireDate(new Date(detail.commodities[0].requiredDate));
    }
  }, [detail]);
  const { user } = useSelector((state: any) => state?.user);
  const getApproveStates = async () => {
    try {
      const response = await axios.post('/Support/GetApproveStates', {
        userId: user?.id ?? getUserIdFromStorage(),
      });
      setStates(response.data.model);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const getRequestDetail = async () => {
    try {
      const response = await axios.post(
        '/Support/GetRequestCaseCommodityDetails',
        {
          userId: user?.id ?? getUserIdFromStorage(),
          requestId: params.id,
        }
      );
      setValue('stateId', response.data.model.commodities[0].approveStateId);
      setValue('newCount', response.data.model.commodities[0].count);

      setDetail(response.data.model);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const onSubmit = handleSubmit((entity: any) => {
    setApproveDate();
  });
  const countChange = () => {};
  const setApproveDate = async function () {
    setLoading(true);
    try {
      const response = await axios.post('/Support/SetApproveData', {
        userId: user?.id ?? getUserIdFromStorage(),
        requestCaseCommodityId: params.id,
        state: getValues('stateId'),
        newCount: getValues('newCount'),
        requiredDate: new Date(requireDate).toISOString().slice(0, 10),
      });
      setLoading(false);
      props.snackbarShowMessage(response.data.message);
    } catch (error) {
      setLoading(false);

      console.error('Error fetching data:', error);
    }
  };

  const cancel = (e) => {
    navigate('/supportApprove');
  };
  return (
    <Card>
      <PageTileComponent __text={document.title} />

      <RequestDetail detail={detail} />
      <Divider sx={{ marginTop: 6.5, marginBottom: 2 }} />
      <Typography
        variant="body2"
        sx={{
          fontSize: '1.25rem',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <List
          sx={{
            margin: '0 5px',
            width: '30px',
            height: '30px',
            fontSize: '2rem',
          }}
          color="info"
        />
        کالا
      </Typography>
      {detail && detail.commodities && (
        <form onSubmit={onSubmit}>
          <Grid container spacing={5} p={2}>
            <Grid item xs={12} sm={4} fontFamily="IRANSans">
              <StyledBox theme={theme}>
                <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 'bold',
                      marginRight: '20px',
                    }}
                  >
                    شرح کالا
                  </Typography>

                  <Typography variant="h5">
                    {detail.commodities[0].commodity}{' '}
                  </Typography>
                </Box>
                <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      marginRight: '20px',
                    }}
                  >
                    نام فعالیت:
                  </Typography>
                  <Typography variant="body2">
                    {detail.commodities[0].activityName}
                  </Typography>
                </Box>
                <Box
                  sx={{ mb: 9, display: 'flex', alignItems: 'center' }}
                ></Box>

                <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                  <div>
                    <Controller
                      control={control}
                      name="newCount"
                      render={() => (
                        <InputContent
                          name="newCount"
                          label="تعداد/مقدار "
                          register={register}
                          required={true}
                          errors={errors}
                          disabled={!detail?.commodities[0]?.approveEditabe}
                        />
                      )}
                    />
                  </div>
                </Box>
              </StyledBox>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    marginRight: '20px',
                  }}
                >
                  تعداد:
                </Typography>

                <Typography variant="h5">
                  {detail.commodities[0].count || 0}{' '}
                </Typography>
              </Box>
              <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                <JalaliDatePicker
                  defaultValue={new Date(detail.commodities[0].requiredDate)}
                  value={requireDate}
                  onChange={(date) => setRequireDate(new Date(date))}
                  name="requiredDate"
                  label="تاریخ نیاز"
                />
              </Box>
              <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginRight: '20px',
                  }}
                >
                  وضعیت تصویب:
                </Typography>

                <Typography variant="body2">
                  {detail.commodities[0].finalApproveState}{' '}
                </Typography>
              </Box>

              <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                <Controller
                  control={control}
                  rules={{ required: ' approve state is required' }}
                  name="stateId"
                  render={({ field }) => (
                    <SelectComponent
                      label="وضعیت تایید"
                      valuefieldName="id"
                      labelFieldName="state"
                      options={states}
                      field={field}
                      disabled={!detail?.commodities[0]?.approveEditabe}
                    />
                  )}
                />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={cancel}
              type="button"
              sx={{ justifySelf: 'flex-start', marginRight: '20px' }}
              color="warning"
              variant="contained"
            >
              لغو
              <CancelIcon sx={{ marginLeft: '10px' }} />
            </Button>
            <LoadingButton
              loading={loading}
              disabled={loading || !isValid}
              type="submit"
              sx={{ justifySelf: 'flex-start', marginRight: '20px' }}
              color="info"
              variant="contained"
            >
              ذخیره
              <SaveIcon sx={{ marginLeft: '10px' }} />
            </LoadingButton>
          </Box>

          <Divider sx={{ width: '80%', margin: '20px auto' }} />
        </form>
      )}
    </Card>
  );
};
export default withSnackbar(ApproveDetail);
