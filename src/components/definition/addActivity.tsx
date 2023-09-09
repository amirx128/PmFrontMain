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
import { JalaliDatePickerNew } from "../../components/date-picker/date-picker.tsx";


export const AddActivity = ({addActivitiesDialog,selectedActivity,onClose}) => {
    console.log(selectedActivity)
    const theme = useTheme();
    const dispatch = useDispatch<any>();
    const mediumOrSmaller = useMediaQuery(theme.breakpoints.down('sm'));
    const [info,setInfo] = useState({
        name: selectedActivity?.name,
        desc: selectedActivity?.descriptions,
    });
    const [fromDate,setFromDate]=useState(new Date());
    const [toDate,setToDate]=useState(new Date());

    useEffect(() => {
        if(selectedActivity){
            setInfo({
                name: selectedActivity?.name,
                desc: selectedActivity?.descriptions,
            });
        }else {
            setInfo({
                name: '',
                desc: '',
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
        const model={
            ...info,
            fromDate,
            toDate
        }
        if(selectedActivity){
            dispatch(UpdateNewActivitySchedule({...model,id:selectedActivity?.id}));
        }else {
            dispatch(AddNewActivitySchedule(model));
        }
        onClose();
    }
    const setSelectedFromDate = (e) => {
        const date = new Date(e);
        setFromDate(date);
      };
      const setSelectedToDate = (e) => {
        const date = new Date(e);
        setToDate(date);
      };
    return (
        <Dialog open={addActivitiesDialog} onClose={onClose} fullWidth={true} maxWidth={'md'} fullScreen={mediumOrSmaller}>
            <DialogTitle sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                {selectedActivity ? 'ویرایش فعالیت' : 'افزودن فعالیت'}
                <IconButton color={"error"} onClick={onClose}>
                    <HighlightOff />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <div style={{display:'flex',flexDirection:'column' ,gap:'10px'}}>
            <div style={{display:'flex',gap:'5px'}}>
            <TextField value={info?.name} name={'name'} onChange={handleChange} label={'نام فعالیت'} fullWidth={true}  />
            <TextField value={info?.desc} name={'desc'} onChange={handleChange} label={'توضیحات فعالیت'} fullWidth={true} />
            </div>
            <div style={{display:'flex',gap:'5px'}}>

            <JalaliDatePickerNew
                  defaultValue={fromDate}
                  onChange={setSelectedFromDate}
                  name="requiredDate"
                  label="از تاریخ"
                  value={fromDate}
                />
            <JalaliDatePickerNew
                  defaultValue={toDate}
                  onChange={setSelectedToDate}
                  name="requiredDate"
                  label="تا تاریخ"
                  value={toDate}
                />
                </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button  variant={"contained"} color={"success"} onClick={onSubmit}>
                    {scheduledActivities?.addState ? <CircularProgress /> : 'ثبت'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}