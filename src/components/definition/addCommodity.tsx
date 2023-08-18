import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    useMediaQuery,
    DialogActions,
    Button, CircularProgress, MenuItem, Select, FormControl, InputLabel, Typography
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {HighlightOff} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    AddNewCommodity,
    AddNewPerson,
    AddNewProject, getAllFloors, getAllUnits,
    UpdatePerson,
    UpdateProject
} from "../../redux/features/definitionSlicer.ts";
import {toast} from "react-toastify";

export const AddCommodity = ({addCommodityDialog,onClose}) => {
    const theme = useTheme();
    const dispatch = useDispatch<any>();
    const mediumOrSmaller = useMediaQuery(theme.breakpoints.down('sm'));
    const [info,setInfo] = useState({
        name: '',
        unit: '',
        description: '',
        garanti: '',
        props: [],
        useInProjectsUnitsIds: [],
        useInProjectsIds: [],
        useInProjectsFloorIds: [],
        businessRoleIds: [],
        supplierId: 0,
        producerId: 0,
        parentId: 0,
    });

    const {businessRoles,units,floors,projects,commodities} = useSelector((state:any) => state.definition);

    const handleChange = (e) => {
        if(e.target?.name === 'useInProjectsIds'){
            dispatch(getAllFloors(e.target?.value[0]))
        }
        if(e.target?.name === 'useInProjectsIds'){
            dispatch(getAllUnits({floorId: e.target?.value[0],projectId: info.useInProjectsIds[0]}))
        }
        if(e.target?.name === 'description'){
            setInfo({
                ...info,
                [e.target?.name]: e.target?.value,
                'descriptions': e.target?.value
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
                        {projects?.data?.map(item => <MenuItem value={item.id} key={item?.id}>{item?.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl fullWidth={true}>
                    <Typography sx={{mt: 2,mb:1}}>واحد مرتبط</Typography>
                    <Select disabled={info?.useInProjectsIds?.length < 1} multiple value={info?.useInProjectsUnitsIds} fullWidth={true} name={"useInProjectsUnitsIds"} label={"واحد مرتبط"}
                            onChange={handleChange}>
                        {units?.data?.map(item => <MenuItem value={item.id} key={item?.id}>{item?.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl fullWidth={true}>
                    <Typography sx={{mt: 2,mb:1}}>طبقه مرتبط</Typography>
                    <Select disabled={info?.useInProjectsUnitsIds?.length < 1} multiple value={info?.useInProjectsFloorIds} fullWidth={true} name={"useInProjectsFloorIds"} label={"طبقه مرتبط"}
                            onChange={handleChange}>
                        {floors?.data?.map(item => <MenuItem value={item.id} key={item?.id}>{item?.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button  variant={"contained"} color={"success"} onClick={onSubmit}>
                    {businessRoles?.addState ? <CircularProgress /> : 'ثبت'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}