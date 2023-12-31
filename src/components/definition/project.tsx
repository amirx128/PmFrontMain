import { Box, Button, Grid, Typography } from '@mui/material';
import moment from 'jalali-moment';
import { Add, Apartment, Edit, Numbers } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedFloorAction } from '../../redux/features/definitionSlicer';

const ProjectCard = ({
  project,
  setSelectedProject,
  setAddProjectDialog,
  setAddFloorDialog,
  setSelectedFloor,
  setSelectedUnit,
  setAddUnitDialog,
  setCurrentProject,
  currentProject,
  setShowUnitsDialog,
}) => {
  const dispatch = useDispatch();
  return (
    <Grid item md={4} sm={6} xs={12}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          border: '2px solid #607D8B',
          borderRadius: 2,
          p: 1,
        }}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant={'subtitle1'}>{project?.name}</Typography>
          <Typography variant={'subtitle1'}>
            {moment(project?.createDate).locale('fa').format('LL')}
          </Typography>
        </Box>
        <Box display={'flex'} gap={0.5} alignItems={'center'} mt={1}>
          <Apartment color={'secondary'} sx={{ fontSize: 20 }} />
          <Typography color={'secondary'} variant={'subtitle2'}>
            طبقات
          </Typography>
        </Box>
        <Box my={1}>
          {project?.projectfloor?.length > 0 ? (
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={1}
              sx={{ flexWrap: 'wrap' }}
            >
              {project?.projectfloor?.map((floor) => (
                <Button
                  onClick={() => {
                    dispatch(setSelectedFloorAction(floor));
                    setShowUnitsDialog(true);
                    setCurrentProject(project);
                  }}
                  key={floor?.id}
                  size={'small'}
                  color={'warning'}
                  variant={'outlined'}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    flexGrow: 1,
                  }}
                >
                  <Typography fontSize={16}>{floor?.name}</Typography>
                  <Typography fontSize={13}>کد : {floor?.code}</Typography>
                  <Typography fontSize={10}>
                    {moment(floor?.createDate).locale('fa').format('LL')}
                  </Typography>
                  <Edit />
                </Button>
              ))}
              <Button
                onClick={() => {
                  setCurrentProject(project);
                  dispatch(setSelectedFloorAction(null));
                  setAddFloorDialog(true);
                }}
                size={'small'}
                fullWidth={true}
                color={'warning'}
                variant={'outlined'}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  flexGrow: 1,
                  width: '100%',
                }}
              >
                <Typography
                  fontSize={14}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Add /> افزودن
                </Typography>
              </Button>
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <Typography color={'error'} variant={'body2'}>
                طبقه ای تعریف نشده
              </Typography>
              <Button
                onClick={() => {
                  setCurrentProject(project);
                  dispatch(setSelectedFloorAction(null));
                  setAddFloorDialog(true);
                }}
                size={'small'}
                fullWidth={true}
                color={'warning'}
                variant={'outlined'}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  flexGrow: 1,
                  mt: 1,
                  width: '100%',
                }}
              >
                <Typography
                  fontSize={14}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Add /> افزودن
                </Typography>
              </Button>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 1 }} />
        <Button
          color={'warning'}
          variant={'contained'}
          fullWidth={true}
          onClick={() => {
            setSelectedProject(project);
            setAddProjectDialog(true);
          }}
        >
          ویرایش
        </Button>
      </Box>
    </Grid>
  );
};

export default memo(ProjectCard);
