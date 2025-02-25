import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  TextField,
  Fade,
  Zoom,
  Box,
  Typography,
  Divider,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import AutoCompleteComponent from '../../components/AutoComplete/AutoCompleteComponent';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';
import useEditOriginalItem from './hooks/useEditOriginalItem';

const EditOriginalItem = () => {
  const navigate = useNavigate();
  const {
    id,
    info,
    handleChange,
    subItems,
    setInfo,
    handleSubmit,
    originalItemsUpdateState,
  } = useEditOriginalItem();

  return (
    <Fade in={true} timeout={800}>
      <Card
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          borderRadius: 3,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          overflow: 'visible',
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f7fa 100%)',
          position: 'relative',
        }}
      >
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EditIcon color="primary" />
              <Typography variant="h5" fontWeight="bold">
                ویرایش آیتم اصلی
              </Typography>
            </Box>
          }
          action={
            <Tooltip title="بازگشت به لیست">
              <IconButton
                onClick={() => navigate('/qc/originalItems')}
                sx={{
                  background: 'rgba(0,0,0,0.05)',
                  '&:hover': { background: 'rgba(0,0,0,0.1)' },
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          }
          sx={{
            textAlign: 'left',
            pb: 0,
            '& .MuiCardHeader-title': { fontWeight: 'bold' },
            pt: 4,
          }}
        />

        <Divider sx={{ mx: 2, my: 2, opacity: 0.6 }} />

        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            px: 4,
          }}
        >
          <Zoom in={true} style={{ transitionDelay: '200ms' }}>
            <Paper
              elevation={0}
              sx={{
                width: '100%',
                p: 2,
                mb: 3,
                background: 'rgba(66, 165, 245, 0.05)',
                border: '1px solid rgba(66, 165, 245, 0.2)',
                borderRadius: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                در این بخش می‌توانید اطلاعات آیتم اصلی را ویرایش کنید.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                شناسه آیتم: <b>{id}</b>
              </Typography>
            </Paper>
          </Zoom>

          <Zoom in={true} style={{ transitionDelay: '300ms' }}>
            <TextField
              value={info?.name}
              name={'name'}
              onChange={handleChange}
              label={'نام آیتم'}
              placeholder="نام آیتم را وارد کنید"
              variant="outlined"
              sx={{
                mt: 2,
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 0 0 4px rgba(25, 118, 210, 0.1)',
                  },
                  '&.Mui-focused': {
                    boxShadow: '0 0 0 4px rgba(25, 118, 210, 0.2)',
                  },
                },
              }}
            />
          </Zoom>

          <Zoom in={true} style={{ transitionDelay: '400ms' }}>
            <FormControl sx={{ mt: 3, width: '100%' }}>
              <AutoCompleteComponent
                options={subItems?.data}
                id="subItemsIds"
                label="آیتم‌های فرعی"
                changeHandler={(value) => {
                  setInfo((prev) => ({ ...prev, subItemsIds: value }));
                }}
                value={info?.subItemsIds || []}
                multiple={true}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 0 0 4px rgba(25, 118, 210, 0.1)',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 0 0 4px rgba(25, 118, 210, 0.2)',
                    },
                  },
                }}
              />
            </FormControl>
          </Zoom>

          {info.subItemsIds && info.subItemsIds.length > 0 && (
            <Fade in={true} timeout={500}>
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'success.main',
                }}
              >
                <CheckCircleIcon fontSize="small" />
                <Typography variant="body2">
                  {info.subItemsIds.length} آیتم فرعی انتخاب شده است
                </Typography>
              </Box>
            </Fade>
          )}
        </CardContent>

        <Divider sx={{ mx: 2, opacity: 0.6 }} />

        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 3,
          }}
        >
          <Zoom in={true} style={{ transitionDelay: '500ms' }}>
            <LoadingButton
              color="success"
              variant="contained"
              onClick={handleSubmit}
              loading={originalItemsUpdateState?.pending}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              sx={{
                borderRadius: 2,
                px: 3,
                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)',
                background: 'linear-gradient(45deg, #2e7d32 30%, #4caf50 90%)',
                '&:hover': {
                  boxShadow: '0 6px 15px rgba(76, 175, 80, 0.3)',
                },
              }}
            >
              ذخیره تغییرات
            </LoadingButton>
          </Zoom>

          <Zoom in={true} style={{ transitionDelay: '600ms' }}>
            <Button
              color="error"
              variant="outlined"
              onClick={() => navigate('/qc/originalItems')}
              disabled={originalItemsUpdateState?.pending}
              startIcon={<CancelIcon />}
              sx={{
                mr: 1,
                borderRadius: 2,
                px: 3,
                borderWidth: '2px',
                '&:hover': {
                  borderWidth: '2px',
                  background: 'rgba(211, 47, 47, 0.04)',
                },
              }}
            >
              انصراف
            </Button>
          </Zoom>
        </CardActions>
      </Card>
    </Fade>
  );
};

export default EditOriginalItem;
