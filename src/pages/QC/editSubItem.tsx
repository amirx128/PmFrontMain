import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Fade,
  Zoom,
  Box,
  Typography,
  Divider,
  Paper,
  Tooltip,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { motion } from 'framer-motion';
import AutoCompleteComponent from '../../components/AutoComplete/AutoCompleteComponent';
import useEditSubItem from './hooks/useEditSubItem';

const EditSubItem = () => {
  const {
    info,
    handleChange,
    originalItems,
    setInfo,
    checkLists,
    usabilities,
    subItemsLevel,
    showAddNewWorkData,
    setShowAddNewWorkData,
    allProjectsFloorUnitUsability,
    contractors,
    handleAddItem,
    oldWorkingData,
    handleDeleteOldItem,
    workingData,
    handleDeleteItem,
    hanldeSubmit,
    subItemsUpdateState,
    navigate,
  } = useEditSubItem();

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
                ویرایش آیتم فرعی
              </Typography>
            </Box>
          }
          action={
            <Tooltip title="بازگشت به لیست">
              <IconButton
                onClick={() => navigate('/qc/subItems')}
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
                در این بخش می‌توانید اطلاعات آیتم فرعی را ویرایش کنید.
              </Typography>
            </Paper>
          </Zoom>

          <Box sx={{ width: '100%', mb: 4 }}>
            <Zoom in={true} style={{ transitionDelay: '300ms' }}>
              <div className="grid grid-cols-2 gap-6">
                <TextField
                  value={info?.name}
                  name={'name'}
                  onChange={handleChange}
                  label={'نام'}
                  placeholder="نام آیتم فرعی را وارد کنید"
                  variant="outlined"
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
                <FormControl sx={{ width: '100%' }}>
                  <AutoCompleteComponent
                    options={originalItems?.data}
                    id="originalItemId"
                    label="آیتم اصلی"
                    changeHandler={(value) => {
                      setInfo((prev) => ({ ...prev, originalItemId: value }));
                    }}
                    value={info?.originalItemId}
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
                <FormControl sx={{ width: '100%' }}>
                  <AutoCompleteComponent
                    options={checkLists?.data}
                    id="masterCheckListId"
                    label="چک لیست اصلی"
                    changeHandler={(value) => {
                      setInfo((prev) => ({
                        ...prev,
                        masterCheckListId: value,
                      }));
                    }}
                    value={info?.masterCheckListId}
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
                <FormControl sx={{ width: '100%' }}>
                  <AutoCompleteComponent
                    options={usabilities?.data}
                    id="usabilities"
                    label="کاربری"
                    changeHandler={(value) => {
                      setInfo((prev) => ({ ...prev, usabilities: value }));
                    }}
                    value={info?.usabilities || []}
                    dataLabel="usablityName"
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
                <FormControl sx={{ width: '100%' }}>
                  <InputLabel>سطح آیتم فرعی</InputLabel>
                  <Select
                    value={info?.levelId}
                    fullWidth={true}
                    name={'levelId'}
                    label="سطح آیتم فرعی"
                    onChange={handleChange}
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 0 0 4px rgba(25, 118, 210, 0.1)',
                      },
                      '&.Mui-focused': {
                        boxShadow: '0 0 0 4px rgba(25, 118, 210, 0.2)',
                      },
                    }}
                  >
                    {subItemsLevel?.data?.map((item) => (
                      <MenuItem value={item.id} key={item?.id}>
                        {item?.levelName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Zoom>
          </Box>

          <Divider sx={{ width: '100%', my: 2, opacity: 0.6 }} />

          <Zoom in={true} style={{ transitionDelay: '400ms' }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              اطلاعات کاری
            </Typography>
          </Zoom>

          <Zoom in={true} style={{ transitionDelay: '500ms' }}>
            <Button
              variant="outlined"
              color="secondary"
              disabled={showAddNewWorkData}
              onClick={() => setShowAddNewWorkData(true)}
              startIcon={<AddCircleIcon />}
              sx={{
                borderRadius: 2,
                mb: 3,
                px: 3,
                borderWidth: '2px',
                '&:hover': {
                  borderWidth: '2px',
                  background: 'rgba(156, 39, 176, 0.04)',
                },
              }}
            >
              دیتای کاری جدید
            </Button>
          </Zoom>

          {showAddNewWorkData && (
            <Zoom in={true} style={{ transitionDelay: '600ms' }}>
              <Paper
                elevation={0}
                sx={{
                  width: '100%',
                  p: 3,
                  mb: 3,
                  background: 'rgba(156, 39, 176, 0.05)',
                  border: '1px solid rgba(156, 39, 176, 0.2)',
                  borderRadius: 2,
                }}
              >
                <div className="flex gap-6">
                  <FormControl className="w-full">
                    <AutoCompleteComponent
                      options={allProjectsFloorUnitUsability?.data}
                      id="projectId"
                      label="پروژه"
                      changeHandler={(value) => {
                        setInfo((prev) => ({ ...prev, projectId: value }));
                      }}
                      value={info?.projectId}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 0 0 4px rgba(156, 39, 176, 0.1)',
                          },
                          '&.Mui-focused': {
                            boxShadow: '0 0 0 4px rgba(156, 39, 176, 0.2)',
                          },
                        },
                      }}
                    />
                  </FormControl>
                  <FormControl className="w-full">
                    <AutoCompleteComponent
                      options={
                        allProjectsFloorUnitUsability?.data?.find(
                          (project) => +project.id === +info?.projectId
                        )?.projectfloor
                      }
                      id="floorId"
                      label="طبقه"
                      changeHandler={(value) => {
                        setInfo((prev) => ({ ...prev, floorId: value }));
                      }}
                      value={info?.floorId || []}
                      multiple={true}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 0 0 4px rgba(156, 39, 176, 0.1)',
                          },
                          '&.Mui-focused': {
                            boxShadow: '0 0 0 4px rgba(156, 39, 176, 0.2)',
                          },
                        },
                      }}
                    />
                  </FormControl>
                  <FormControl className="w-full">
                    <AutoCompleteComponent
                      options={allProjectsFloorUnitUsability?.data
                        ?.find((project) => +project.id === +info.projectId)
                        ?.projectfloor?.filter((floor) =>
                          info.floorId.includes(floor.id)
                        )
                        .flatMap((floor) => floor?.projectUnit)}
                      id="unitId"
                      label="واحد"
                      changeHandler={(value) => {
                        setInfo((prev) => ({ ...prev, unitId: value }));
                      }}
                      value={info?.unitId || []}
                      multiple={true}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 0 0 4px rgba(156, 39, 176, 0.1)',
                          },
                          '&.Mui-focused': {
                            boxShadow: '0 0 0 4px rgba(156, 39, 176, 0.2)',
                          },
                        },
                      }}
                    />
                  </FormControl>
                </div>
                <div className="flex gap-6 mt-3">
                  <FormControl className="w-full">
                    <AutoCompleteComponent
                      options={allProjectsFloorUnitUsability?.data
                        ?.find((project) => +project.id === +info.projectId)
                        ?.projectfloor?.filter((floor) =>
                          info.floorId.includes(floor.id)
                        )
                        .flatMap((floor) => floor?.projectUnit)
                        .filter((unit) => info.unitId.includes(unit.id))
                        ?.flatMap((unit) => unit.unitsUsability)}
                      id="usabilityId"
                      label="کاربری"
                      changeHandler={(value) => {
                        setInfo((prev) => ({ ...prev, usabilityId: value }));
                      }}
                      value={info?.usabilityId || []}
                      multiple={true}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 0 0 4px rgba(156, 39, 176, 0.1)',
                          },
                          '&.Mui-focused': {
                            boxShadow: '0 0 0 4px rgba(156, 39, 176, 0.2)',
                          },
                        },
                      }}
                    />
                  </FormControl>
                  <FormControl className="w-full">
                    <AutoCompleteComponent
                      options={contractors?.data}
                      id="contractorId"
                      label="پیمانکار"
                      changeHandler={(value) => {
                        setInfo((prev) => ({ ...prev, contractorId: value }));
                      }}
                      value={info?.contractorId}
                      dataLabel="fullName"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 0 0 4px rgba(156, 39, 176, 0.1)',
                          },
                          '&.Mui-focused': {
                            boxShadow: '0 0 0 4px rgba(156, 39, 176, 0.2)',
                          },
                        },
                      }}
                    />
                  </FormControl>
                </div>
                <Box
                  sx={{ mt: 2, display: 'flex', justifyContent: 'flex-start' }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleAddItem}
                    startIcon={<AddCircleIcon />}
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      boxShadow: '0 4px 12px rgba(156, 39, 176, 0.2)',
                      background:
                        'linear-gradient(45deg, #7b1fa2 30%, #9c27b0 90%)',
                      '&:hover': {
                        boxShadow: '0 6px 15px rgba(156, 39, 176, 0.3)',
                      },
                    }}
                  >
                    افزودن
                  </Button>
                </Box>
              </Paper>
            </Zoom>
          )}

          {!!(oldWorkingData.length || workingData.length) && (
            <Zoom in={true} style={{ transitionDelay: '700ms' }}>
              <Paper
                elevation={0}
                sx={{
                  width: '100%',
                  p: 2,
                  mb: 3,
                  background: 'rgba(76, 175, 80, 0.05)',
                  border: '1px solid rgba(76, 175, 80, 0.2)',
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  دیتای کاری موجود
                </Typography>
                <Box sx={{ maxHeight: '250px', overflowY: 'auto', p: 1 }}>
                  <div className="grid gap-3 grid-cols-3">
                    {oldWorkingData.map((work, index) => (
                      <Zoom
                        in={true}
                        key={index}
                        style={{ transitionDelay: `${800 + index * 50}ms` }}
                      >
                        <Paper
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            background: 'rgba(255,255,255,0.9)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            position: 'relative',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                              transform: 'translateY(-2px)',
                            },
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: '0.85rem',
                              mb: 1,
                              fontWeight: 'bold',
                            }}
                          >
                            {
                              allProjectsFloorUnitUsability.data?.find(
                                (project) => +project.id === +work.projectId
                              )?.name
                            }
                          </Typography>
                          <Divider sx={{ my: 1, opacity: 0.5 }} />
                          <Typography
                            variant="body2"
                            sx={{ fontSize: '0.8rem' }}
                          >
                            طبقه:{' '}
                            {
                              allProjectsFloorUnitUsability.data
                                ?.find(
                                  (project) => +project.id === +work.projectId
                                )
                                ?.projectfloor?.find(
                                  (floor) => +floor.id === +work.floorId
                                )?.name
                            }
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: '0.8rem' }}
                          >
                            واحد:{' '}
                            {
                              allProjectsFloorUnitUsability.data
                                ?.find(
                                  (project) => +project.id === +work.projectId
                                )
                                ?.projectfloor?.find(
                                  (floor) => +floor.id === +work.floorId
                                )
                                ?.projectUnit?.find(
                                  (unit) => +work.unitId === +unit.id
                                )?.name
                            }
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: '0.8rem' }}
                          >
                            کاربری:{' '}
                            {
                              allProjectsFloorUnitUsability.data
                                ?.find(
                                  (project) => +project.id === +work.projectId
                                )
                                ?.projectfloor?.find(
                                  (floor) => +floor.id === +work.floorId
                                )
                                ?.projectUnit?.find(
                                  (unit) => +work.unitId === +unit.id
                                )
                                ?.unitsUsability?.find(
                                  (usa) => +work.usabilityId === +usa.id
                                )?.name
                            }
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: '0.8rem' }}
                          >
                            پیمانکار:{' '}
                            {
                              contractors.data?.find(
                                (cont) => cont.id == work.contractorId
                              )?.fullName
                            }
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteOldItem(work.id)}
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              color: 'error.main',
                              background: 'rgba(211, 47, 47, 0.1)',
                              '&:hover': {
                                background: 'rgba(211, 47, 47, 0.2)',
                              },
                            }}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </Paper>
                      </Zoom>
                    ))}
                    {workingData.map((work, index) => (
                      <Zoom
                        in={true}
                        key={index}
                        style={{
                          transitionDelay: `${
                            800 + (oldWorkingData.length + index) * 50
                          }ms`,
                        }}
                      >
                        <Paper
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            background: 'rgba(255,255,255,0.9)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            position: 'relative',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                              transform: 'translateY(-2px)',
                            },
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: '0.85rem',
                              mb: 1,
                              fontWeight: 'bold',
                            }}
                          >
                            {
                              allProjectsFloorUnitUsability.data?.find(
                                (project) => +project.id === +work.projectId
                              )?.name
                            }
                          </Typography>
                          <Divider sx={{ my: 1, opacity: 0.5 }} />
                          <Typography
                            variant="body2"
                            sx={{ fontSize: '0.8rem' }}
                          >
                            طبقه:{' '}
                            {allProjectsFloorUnitUsability.data
                              ?.find(
                                (project) => +project.id === +work.projectId
                              )
                              ?.projectfloor?.filter((floor) =>
                                work.floorId?.includes(floor.id)
                              )
                              ?.map((floor) => floor.name)
                              .join(',')}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: '0.8rem' }}
                          >
                            واحد:{' '}
                            {allProjectsFloorUnitUsability.data
                              ?.find(
                                (project) => +project.id === +work.projectId
                              )
                              ?.projectfloor?.filter((floor) =>
                                work.floorId.includes(floor.id)
                              )
                              .flatMap((floor) => floor.projectUnit)
                              ?.filter((unit) => work.unitId.includes(unit.id))
                              .map((unit) => unit.name)
                              ?.join(',')}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: '0.8rem' }}
                          >
                            کاربری:{' '}
                            {allProjectsFloorUnitUsability.data
                              ?.find(
                                (project) => +project.id === +work.projectId
                              )
                              ?.projectfloor?.filter((floor) =>
                                work.floorId.includes(floor.id)
                              )
                              .flatMap((floor) => floor.projectUnit)
                              ?.filter((unit) => work.unitId.includes(unit.id))
                              ?.flatMap((unit) => unit.unitsUsability)
                              ?.filter((usa) =>
                                work.usabilityId.includes(usa.id)
                              )
                              ?.map((usa) => usa.name)
                              ?.join(',')}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: '0.8rem' }}
                          >
                            پیمانکار:{' '}
                            {
                              contractors.data?.find(
                                (cont) => cont.id == work.contractorId
                              )?.fullName
                            }
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteItem(work.id)}
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              color: 'error.main',
                              background: 'rgba(211, 47, 47, 0.1)',
                              '&:hover': {
                                background: 'rgba(211, 47, 47, 0.2)',
                              },
                            }}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </Paper>
                      </Zoom>
                    ))}
                  </div>
                </Box>
              </Paper>
            </Zoom>
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
          <Zoom in={true} style={{ transitionDelay: '800ms' }}>
            <LoadingButton
              color="success"
              variant="contained"
              onClick={hanldeSubmit}
              loading={subItemsUpdateState?.pending}
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

          <Zoom in={true} style={{ transitionDelay: '900ms' }}>
            <Button
              color="error"
              variant="outlined"
              onClick={() => navigate('/qc/subItems')}
              disabled={subItemsUpdateState?.pending}
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

export default EditSubItem;
