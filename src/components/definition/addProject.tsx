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
import {AddNewProject, UpdateProject} from "../../redux/features/definitionSlicer.ts";
import {toast} from "react-toastify";

export const AddProject = ({addProjectDialog,selectedProject,onClose}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const mediumOrSmaller = useMediaQuery(theme.breakpoints.down('sm'));
    const [info,setInfo] = useState({
        name: selectedProject?.name
    });

    useEffect(() => {
        if(selectedProject){
            setInfo({
                name: selectedProject?.name
            });
        }else {
            setInfo({
                name: ''
            });
        }
    }, [selectedProject]);
    const {projects} = useSelector((state) => state.definition);
    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target?.name]: e.target?.value
        })
    }

    const onSubmit = () => {
        if(selectedProject){
            dispatch(UpdateProject({id:selectedProject?.id,name:info.name}));
        }else {
            dispatch(AddNewProject(info.name));
        }
        onClose();
    }
    return (
        <Dialog open={addProjectDialog} onClose={onClose} fullWidth={true} maxWidth={'md'} fullScreen={mediumOrSmaller}>
            <DialogTitle sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                {selectedProject ? 'ویرایش پروژه' : 'افزودن پروژه'}
                <IconButton color={"error"} onClick={onClose}>
                    <HighlightOff />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <TextField value={info?.name} name={'name'} onChange={handleChange} label={'نام پروژه'} fullWidth={true} sx={{mt:2}}/>
            </DialogContent>
            <DialogActions>
                <Button  variant={"contained"} color={"success"} onClick={onSubmit}>
                    {projects?.addState ? <CircularProgress /> : 'ثبت'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}