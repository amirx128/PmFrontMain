import { Box, Button, Grid, Typography } from '@mui/material';
import moment from 'jalali-moment';
import { Apartment, Book, Numbers } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import { setSelectedFloorAction } from '../../redux/features/definitionSlicer';
import { useDispatch } from 'react-redux';

export const FloorCard = ({ floor, setAddFloorDialog }) => {
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
          <Typography variant={'subtitle1'}>{floor?.name}</Typography>
          <Typography variant={'subtitle1'}>
            {moment(floor?.createDate).locale('fa').format('LL')}
          </Typography>
        </Box>
        <Box display={'flex'} gap={0.5} alignItems={'center'} mt={1}>
          <Box display={'flex'} gap={0.5} alignItems={'center'}>
            <Book color={'secondary'} sx={{ fontSize: 20 }} />
            <Typography color={'secondary'} variant={'subtitle2'}>
              پروژه:{' '}
            </Typography>
          </Box>
          <Box>
            <Typography color={'secondary'} variant={'subtitle2'}>
              {floor?.projectName}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Button
          color={'warning'}
          variant={'contained'}
          fullWidth={true}
          onClick={() => {
            dispatch(setSelectedFloorAction(floor));
            setAddFloorDialog(true);
          }}
        >
          ویرایش
        </Button>
      </Box>
    </Grid>
  );
};
