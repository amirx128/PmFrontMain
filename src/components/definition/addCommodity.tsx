import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Add, HighlightOff} from "@mui/icons-material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AddNewCommodity} from "../../redux/features/definitionSlicer.ts";
import TreeView from "@mui/lab/TreeView";
import {makeTree} from "../../utils/tree.ts";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export const AddCommodity = ({addCommodityDialog,onClose}) => {
  const theme = useTheme();
  const dispatch = useDispatch<any>();
  const mediumOrSmaller = useMediaQuery(theme.breakpoints.down('sm'));
  const [info,setInfo] = useState({
    name: '',
    unit: '',
    description: '',
    descriptions: '',
    garanti: '',
    props: [],
    useInProjectsUnitsIds: [],
    useInProjectsIds: [],
    useInProjectsFloorIds: [],
    businessRoleIds: [],
    supplierId: '',
    producerId: 0,
    parentId: 0,
  });

  const {
    businessRoles,
    pleaseOfUse,
    commodities,
    suppliers,
    producers,
    commoditiesOnTree
  } = useSelector((state: any) => state.definition);

  const getProjects = () => {
    return pleaseOfUse?.data?.filter(item => item.type === 'Project');
  }

  const getFloors = () => {
    return pleaseOfUse?.data?.filter(item => item.type === 'floor');
  }

  const getUnits = () => {
    return pleaseOfUse?.data?.filter(item => item.type === 'unit');
  }

  const handleChange = (e) => {
    if(e.target?.name === 'description'){
      setInfo({
        ...info,
        [e.target?.name]: e.target?.value,
        'descriptions': e.target?.value
      })
    }if(e.target?.name === 'producerId'){
      setInfo({
        ...info,
        [e.target?.name]: e.target?.value ?? 0,
      })
    }else {
      setInfo({
        ...info,
        [e.target?.name]: e.target?.value
      })
    }
  }

  const onSubmit = () => {
    dispatch(AddNewCommodity({...info}));
    onClose();
  }

  const [showAddProp,setShowAddProp] = useState(false);
  const [propVal,setPropVal] = useState({
    propName: '',
    propType: 'integer',
    propValue: ''
  })
  const handleChangeProp = (e) => {
    setPropVal({
      ...propVal,
      [e.target?.name]: e.target?.value
    })
  }

  const handleAddProp = () => {
    setInfo({
      ...info,
      props: [
        ...info?.props,
        {
          id: info?.props?.length + 1,
          ...propVal,
        }
      ],
    });
    setPropVal({
      propName: '',
      propType: 'integer',
      propValue: ''
    });
  };

  const handleDeleteProp = (prop) => {
    setInfo({
      ...info,
      props: info?.props.filter(item => item?.id !== prop?.id),
    })
  }

  const generateTree = (item) => {
    if (item?.children) {
      return (
          <TreeItem sx={{color: "rgb(62, 104, 168)"}} nodeId={item?.id} label={item?.serchableName}>
            {item?.children?.map(subItem => generateTree(subItem))}
          </TreeItem>
      );
    } else {
      return <TreeItem sx={{color: "rgb(62, 104, 168)"}} nodeId={item?.id} label={item?.serchableName}/>;
    }
  }

  return (
      <Dialog open={addCommodityDialog} onClose={onClose} fullWidth={true} maxWidth={'md'} fullScreen={mediumOrSmaller}>
        <DialogTitle sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          افزودن کالا
          <IconButton color={"error"} onClick={onClose}>
            <HighlightOff />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField value={info?.name} name={'name'} onChange={handleChange} label={'نام'} fullWidth={true} sx={{mt:2}}/>
          <TextField value={info?.unit} name={'unit'} onChange={handleChange} label={'واحد'} fullWidth={true} sx={{mt:2}}/>
          <TextField value={info?.description} name={'description'} onChange={handleChange} label={'توضیحات'} fullWidth={true} sx={{mt:2}}/>
          <TextField value={info?.garanti} name={'garanti'} onChange={handleChange} label={'گارانتی'} fullWidth={true} sx={{mt:2}}/>
          <FormControl fullWidth={true}>
            <Typography sx={{mt: 2,mb:1}}>تامین کننده</Typography>
            <Select value={info?.supplierId} labelId={"supplierId"} fullWidth={true} name={"supplierId"}
                    onChange={handleChange}>
              {suppliers?.data?.map(item => <MenuItem value={item.id} key={item?.id}>{item?.supplierName}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth={true}>
            <Typography sx={{mt: 2,mb:1}}>تهیه کننده</Typography>
            <Select value={info?.producerId} labelId={"producerId"} fullWidth={true} name={"producerId"}
                    onChange={handleChange}>
              {producers?.data?.map(item => <MenuItem value={item.id} key={item?.id}>{item?.name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth={true}>
            <Typography sx={{mt: 2,mb:1}}>زیر مجموعه ی کالای</Typography>
            <Select value={info?.parentId} labelId={"parentId"} fullWidth={true} name={"parentId"}
                    onChange={handleChange}>
              {commodities?.data?.map(item => <MenuItem value={item.id} key={item?.id}>{item?.serchableName}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth={true}>
            <Typography sx={{mt: 2,mb:1}}>نقش تجاری</Typography>
            <Select multiple value={info?.businessRoleIds} labelId={"businessRoleIds"} fullWidth={true} name={"businessRoleIds"} label={"نقش تجاری"}
                    onChange={handleChange}>
              {businessRoles?.data?.map(item => <MenuItem value={item.id} key={item?.id}>{item?.name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth={true}>
            <Typography sx={{mt: 2,mb:1}}>پروژه مرتبط</Typography>
            <Select multiple value={info?.useInProjectsIds} fullWidth={true} name={"useInProjectsIds"} label={"پروژه مرتبط"}
                    onChange={handleChange}>
              {getProjects().map(item => <MenuItem value={item.id} key={item?.id}>{item?.name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth={true}>
            <Typography sx={{mt: 2, mb: 1}}>انتخاب شاخه</Typography>
            <TreeView onNodeSelect={(e, ids) => handleChange({target: {value: ids, name: 'parentId'}})}
                      defaultCollapseIcon={<ExpandMoreIcon/>}
                      defaultExpandIcon={<ChevronLeftIcon/>}
                      sx={{flexGrow: 1}}>
              {
                  commoditiesOnTree?.data?.length && makeTree(commoditiesOnTree?.data)?.items.map(item => generateTree(item))
              }
            </TreeView>
          </FormControl>
          <FormControl fullWidth={true}>
            <Typography sx={{mt: 2,mb:1}}>طبقه مرتبط</Typography>
            <Select multiple value={info?.useInProjectsFloorIds} fullWidth={true} name={"useInProjectsFloorIds"} label={"طبقه مرتبط"}
                    onChange={handleChange}>
              {getFloors().map(item => <MenuItem value={item.id} key={item?.id}>{item?.name}</MenuItem>)}
            </Select>
          </FormControl>
          <Box sx={{width:"100%"}}>
            <Typography sx={{mt: 2,mb:1}}>خصوصیات</Typography>
            <Box sx={{display:"flex",flexWrap:"wrap",alignItems:"center",my:1}}>
              {
                info?.props?.map(item => <Chip label={`${item?.propName} : ${item?.propValue}`} onDelete={() => handleDeleteProp(item)} />)
              }
            </Box>
            {
                showAddProp && (
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={4}>
                        <TextField value={propVal?.propName} name={'propName'} onChange={handleChangeProp} placeholder={'نام خصوصیت'} fullWidth={true}/>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Select value={propVal?.propType} placeholder="نوع خصوصیت" fullWidth={true} name={"propType"}
                                onChange={handleChangeProp}>
                          <MenuItem value={'integer'}>عدد</MenuItem>
                          <MenuItem value={'string'}>رشته</MenuItem>
                          <MenuItem value={'date'}>تاریخ</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField value={propVal?.propValue} name={'propValue'} onChange={handleChangeProp} placeholder={'مقدار خصوصیت'} fullWidth={true}/>
                      </Grid>
                      <Grid item xs={12}>
                        <Button disabled={!propVal?.propName || !propVal?.propType || !propVal?.propValue } fullWidth={true} variant={"contained"} color={"primary"} onClick={handleAddProp}>تایید خصوصیت</Button>
                      </Grid>
                    </Grid>
                )
            }
            <Button sx={{my:1}} fullWidth={true} variant={"outlined"} startIcon={<Add />} onClick={() => setShowAddProp(true)}>
              افزودن خصوصیت
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant={"contained"} color={"success"} onClick={onSubmit}>
            {businessRoles?.addState ? <CircularProgress /> : 'ثبت'}
          </Button>
        </DialogActions>
      </Dialog>
  );
}