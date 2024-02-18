import AddIcon from '@mui/icons-material/Add';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Card,
  Divider,
  IconButton,
  Typography,
  Modal,
  CircularProgress,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import ComodityForm from '../../components/comodity-form/comodity-form';
import { IComodityFields } from '../../core/comodity/comodity.model';
import axios from '../../utils/axios.config';
import { withSnackbar } from '../../utils/snackbar-hook';
import theme from '../../utils/theme';
import RequestDetail from '../product-request/request-detail/request-detail.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { getUserIdFromStorage } from '../../utils/functions.ts';
import { Link, useParams } from 'react-router-dom';
import AutoCompleteComponent from '../../components/AutoComplete/AutoCompleteComponent.tsx';
import { GetAllProjects_Floor_Unit_UsabilityAction } from '../../redux/features/definitionSlicer.ts';
import { SupportGetRequestDetailsAction } from '../../redux/features/supportSlicer.ts';

const RequestCaseEdit: React.FC<any> = (props: any) => {
  const dispatch = useDispatch<any>();
  const { id } = useParams();
  const [placeOfUsed, setPlacedOdUse] = useState([]);
  const [comodities, setComodoties] = useState<IComodityFields[]>([]);
  const [activities, setActivities] = useState<IComodityFields[]>([]);
  const [commodityDescription, setCommodityDescription] = useState<any[]>([]);
  const [businessRoleDetails, setbusinessRoleDetails] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>('');
  const [loading, setLoading] = useState<any>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [trackingCode, setTrackingCode] = useState<string>('');
  const [requestId, setRequestId] = useState<number>(null);
  const { user } = useSelector((state: any) => state?.user);
  const { allProjectsFloorUnitUsability } = useSelector(
    (state: any) => state?.definition
  );
  const { requestDetail } = useSelector((state: any) => state.support.approve);
  const [projectId, setProjectId] = useState();
  const [floorId, setFloorId] = useState();
  const [unitId, setUnitId] = useState();
  const [projectUnitId, setProjectUnitId] = useState();
  const [removedItems, setRemovedItems] = useState<number[]>([]);
  const getAllProjectFloor = useCallback(async () => {
    await dispatch(GetAllProjects_Floor_Unit_UsabilityAction());
  }, []);

  const baseIsEditable = requestDetail.data?.isEditable;
  useEffect(() => {
    getDetail();
  }, []);
  useEffect(() => {
    if (projectId && unitId) {
      getAllCommodities();
    }
  }, [projectId, unitId, floorId, projectUnitId]);
  useEffect(() => {
    getAllProjectFloor();
    getAllUnits();
    getAllActivities();
    getPlacedOfUse();
    const storageData = localStorage.getItem('user');
    if (storageData) {
      const data = JSON.parse(storageData);
      setUserData(data);
      setbusinessRoleDetails(data?.businessRoles);
    }
  }, [getAllProjectFloor]);
  useEffect(() => {
    if (requestDetail.data) {
      setUnitId(requestDetail.data.businessRolesId);
      setProjectId(requestDetail.data.projectId || 1);
      setFloorId(requestDetail.data.floorId);
      setProjectUnitId(requestDetail.data.unitId);
      setComodoties(
        requestDetail.data.commodities?.map((com) => ({
          id: com.commodityId,
          commodityId: com.commodityId,
          activityId: com.activityId,
          count: com.count,
          requiredDate: com.requiredDate,
          requestCaseRowCommodityId: com.requestCaseRowCommodityId,
        }))
      );
    }
  }, [requestDetail]);
  const getDetail = async () => {
    await dispatch(SupportGetRequestDetailsAction({ requestId: id }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/RequestCase/UpdateRequestCase', {
        userId: user?.id ?? getUserIdFromStorage(),
        unitId,
        PlaceOfUseId: projectUnitId
          ? +`3${projectUnitId}`
          : floorId
          ? +`2${floorId}`
          : +`1${projectId}`,
        commodites: [...comodities],
        removedItems,
        id: id,
      });
      if (response.data.statusCode === 200) {
        props.snackbarShowMessage('ویرایش کالا با موفقیت انجام شد');
      } else {
        props.snackbarShowMessage('ویرایش کالا با خطا مواجه شد', 'error');
      }
      setLoading(false);
    } catch (error) {
      props.snackbarShowMessage('ثبت کالا با خطا مواجه شد', 'error');
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  const getAllUnits = async () => {
    try {
      const response = axios.post('/Definition/GetAllUnit', {
        userId: user?.id ?? getUserIdFromStorage(),
        name: '',
        projectId: 0,
        floorId: 0,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllCommodities = async () => {
    if (!projectId && !unitId) return;
    try {
      const response: any = await axios.post(
        '/RequestCase/GetAllCommoditiesForOnePlaceOfUse',
        {
          userId: user?.id ?? getUserIdFromStorage(),
          placeId: projectUnitId
            ? +`3${projectUnitId}`
            : floorId
            ? +`2${floorId}`
            : +`1${projectId}`,
          requesterBussinessRoleId: unitId,
        }
      );
      setCommodityDescription(response.data.model);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const getAllActivities = async () => {
    try {
      const response: any = await axios.post(
        '/Definition/GetScheduleActivities',
        {
          userId: user?.id ?? getUserIdFromStorage(),
        }
      );
      setActivities(response.data.model);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getPlacedOfUse = async () => {
    try {
      const response = await axios.post('/RequestCase/GetAllPlaseOfUse', {
        userId: user?.id ?? getUserIdFromStorage(),
      });
      setPlacedOdUse(response.data.model);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addComodity = () => {
    setComodoties([
      ...comodities,
      {
        commodityId: null,
        activityId: null,
        count: null,
        requiredDate: null,
        requestCaseRowCommodityId: null,
      },
    ]);
  };
  const commodityChanged = (value, index) => {
    const newList = [...comodities];
    newList[index] = value;
    setComodoties(newList);
  };
  const deleteComodityRow = (item) => {
    setComodoties((prev) =>
      prev.filter((p) => p.commodityId !== item.commodityId)
    );
    setRemovedItems((prev) => [...prev, item.requestCaseRowCommodityId]);
  };
  return (
    <Card sx={{ padding: '20px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          placeContent: 'space-between',
        }}
      >
        <Typography
          style={{
            fontFamily: 'IRANSans',
            textAlign: 'right',
            color: theme.palette.text.primary,
            fontWeight: 'bold',
          }}
          variant="h5"
          component="h4"
        >
          ثبت درخواست
        </Typography>
        <RequestDetail />
      </Box>
      {allProjectsFloorUnitUsability.pending && <CircularProgress />}
      {!allProjectsFloorUnitUsability.pending && (
        <div className="mx-auto">
          <form onSubmit={onSubmit}>
            <div className="flex justify-between gap-2 mt-3">
              <AutoCompleteComponent
                label="بخش درخواست کننده"
                id="unitId"
                options={businessRoleDetails}
                value={unitId}
                changeHandler={(value) => setUnitId(value)}
                sx={{ flex: 1 }}
                disabled={!baseIsEditable}
              />
              <AutoCompleteComponent
                label="پروژه"
                id="projectId"
                options={allProjectsFloorUnitUsability?.data}
                value={projectId}
                changeHandler={(value) => setProjectId(value)}
                sx={{ flex: 1 }}
                disabled={!baseIsEditable}
              />
              <AutoCompleteComponent
                label="طبقه"
                id="floorId"
                options={
                  allProjectsFloorUnitUsability?.data?.find(
                    (project) => project.id === projectId
                  )?.projectfloor
                }
                value={floorId}
                changeHandler={(value) => setFloorId(value)}
                sx={{ flex: 1 }}
                disabled={!baseIsEditable}
              />
              <AutoCompleteComponent
                label="واحد"
                id="projectUnitId"
                options={
                  allProjectsFloorUnitUsability?.data
                    ?.find((project) => project.id === projectId)
                    ?.projectfloor?.find((floor) => floor.id === floorId)
                    ?.projectUnit
                }
                value={projectUnitId}
                changeHandler={(value) => setProjectUnitId(value)}
                sx={{ flex: 1 }}
                disabled={!baseIsEditable}
              />
            </div>
            <Divider sx={{ m: '40px 0' }} />

            <Box>
              {!!commodityDescription.length &&
                !!comodities.length &&
                comodities.map((item, index) => (
                  <ComodityForm
                    key={index + 'a'}
                    activities={activities}
                    commodityDescription={commodityDescription}
                    comodity={item}
                    onCommodityChange={(e) => commodityChanged(e, index)}
                    deleteComodity={() => deleteComodityRow(item)}
                    disabled={!item?.isEditable}
                  ></ComodityForm>
                ))}
            </Box>
            <div className="flex items-center gap-8 justify-end mt-10">
              <IconButton
                color="info"
                style={{ outline: 'none' }}
                onClick={addComodity}
                className="text-sm"
                size="small"
              >
                افزودن
                <AddIcon />
              </IconButton>
              <LoadingButton
                loading={loading}
                type="submit"
                variant="contained"
                sx={{
                  color: theme.palette.common.white,
                  backgroundColor: theme.palette.secondary.light,
                  fontFamily: 'IRANSans',
                  ':hover': { backgroundColor: theme.palette.secondary.dark },
                }}
              >
                ویرایش
              </LoadingButton>
            </div>
          </form>
        </div>
      )}

      {/* <Modal open={isShowModal} onClose={() => setIsShowModal(false)}>
        <Box
          sx={{
            width: '40%',
            backgroundColor: '#fff',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            padding: '1.6rem 3.2rem',
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ثبت کالا با موفقیت انجام شد
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            کد رهگیری شما برابر :{' '}
            <Link to={`/product-details/${requestId}`}>{trackingCode}</Link>{' '}
            میباشد
          </Typography>
        </Box>
      </Modal> */}
    </Card>
  );
};
export default withSnackbar(RequestCaseEdit);
