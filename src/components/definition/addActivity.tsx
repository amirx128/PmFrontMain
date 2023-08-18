import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    useMediaQuery,
    DialogActions,
    Button, CircularProgress
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {HighlightOff} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    AddNewActivitySchedule,
    AddNewProject,
    UpdateNewActivitySchedule,
    UpdateProject
} from "../../redux/features/definitionSlicer.ts";
import {toast} from "react-toastify";

export const AddActivity = ({addActivitiesDialog,selectedActivity,onClose}) => {
    const theme = useTheme();
    const dispatch = useDispatch<any>();
    const mediumOrSmaller = useMediaQuery(theme.breakpoints.down('sm'));
    const [info,setInfo] = useState({
        name: selectedActivity?.name,
        desc: selectedActivity?.descriptions,
    });

    useEffect(() => {
        if(selectedActivity){
            setInfo({
                name: selectedActivity?.name,
                desc: selectedActivity?.descriptions,
            });
        }else {
            setInfo({
                name: '',
                desc: ''
            });
        }
    }, [selectedActivity]);
    const {scheduledActivities} = useSelector((state:any) => state.definition);
    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target?.name]: e.target?.value
        })
    }

    const onSubmit = () => {
        if(selectedActivity){
            dispatch(UpdateNewActivitySchedule({id:selectedActivity?.id,...info}));
        }else {
            dispatch(AddNewActivitySchedule(info));
        }
        onClose();
    }
    return (
        <Dialog open={addActivitiesDialog} onClose={onClose} fullWidth={true} maxWidth={'md'} fullScreen={mediumOrSmaller}>
            <DialogTitle sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                {selectedActivity ? 'ویرایش فعالیت' : 'افزودن فعالیت'}
                <IconButton color={"error"} onClick={onClose}>
                    <HighlightOff />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <TextField value={info?.name} name={'name'} onChange={handleChange} label={'نام فعالیت'} fullWidth={true} sx={{mt:2}}/>
                <TextField value={info?.desc} name={'desc'} onChange={handleChange} label={'توضیحات فعالیت'} fullWidth={true} sx={{mt:2}}/>
            </DialogContent>
            <DialogActions>
                <Button  variant={"contained"} color={"success"} onClick={onSubmit}>
                    {scheduledActivities?.addState ? <CircularProgress /> : 'ثبت'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}