import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    useMediaQuery,
    DialogActions,
    Button, CircularProgress, MenuItem, Select, FormControlLabel, Checkbox, FormGroup
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {HighlightOff} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    AddNewPerson,
    AddNewProject,
    GetAllBusinessRoles,
    UpdatePerson,
    UpdateProject
} from "../../redux/features/definitionSlicer.ts";
import {toast} from "react-toastify";
import {AddNewUser, GetAllRoles, UpdateUser} from "../../redux/features/administrationSlicer.ts";

export const AddUser = ({showUserDialog,selectedUser,onClose}) => {
    const theme = useTheme();
    const dispatch = useDispatch<any>();
    const mediumOrSmaller = useMediaQuery(theme.breakpoints.down('sm'));
    const [info,setInfo] = useState({
        firstName: selectedUser?.firstName,
        lastName: selectedUser?.lastName,
        userName: selectedUser?.userName,
        password: selectedUser?.password,
        isActive: selectedUser?.isActive,
        businessRoles: selectedUser?.businessRoles?.map(item => item.id) ?? [],
        usersRoles: selectedUser?.usersRoles?.map(item => item.id) ?? [],
    });

    useEffect(() => {
        //@ts-ignore
        dispatch(GetAllBusinessRoles())
        //@ts-ignore
        dispatch(GetAllRoles())
    }, []);

    useEffect(() => {
        if(selectedUser){
            setInfo({
                firstName: selectedUser?.firstName,
                lastName: selectedUser?.lastName,
                userName: selectedUser?.userName,
                password: selectedUser?.password,
                isActive: selectedUser?.isActive,
                businessRoles: selectedUser?.businessRoles?.map(item => item.id) ?? [],
                usersRoles: selectedUser?.usersRoles?.map(item => item.id)  ?? [],
            });
        }else {
            setInfo({
                firstName: '',
                lastName: '',
                userName: '',
                password: '',
                isActive: true,
                businessRoles: [],
                usersRoles: [],
            });
        }
    }, [selectedUser]);

    useEffect(() => {
        console.log(info);
    }, [info]);
    const {businessRoles} = useSelector((state:any) => state.definition);
    const {roles} = useSelector((state:any) => state.administrations);

    const handleChange = (e) => {
        if(e.target?.name === 'isActive'){
            setInfo({
                ...info,
                [e.target?.name]: e.target?.checked
            })
        }else {
            setInfo({
                ...info,
                [e.target?.name]: e.target?.value
            })
        }
    }

    const onSubmit = () => {
        if(selectedUser){
            dispatch(UpdateUser({id:selectedUser?.id,...info}));
        }else {
            dispatch(AddNewUser({...info}));
        }
        onClose();
    }
    return (
        <Dialog open={showUserDialog} onClose={onClose} fullWidth={true} maxWidth={'md'} fullScreen={mediumOrSmaller}>
            <DialogTitle sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                {selectedUser ? 'ویرایش کاربر' : 'افزودن کاربر'}
                <IconButton color={"error"} onClick={onClose}>
                    <HighlightOff />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <TextField value={info?.firstName} name={'firstName'} onChange={handleChange} label={'نام'} fullWidth={true} sx={{mt:2}}/>
                <TextField value={info?.lastName} name={'lastName'} onChange={handleChange} label={'نام خانوادگی'} fullWidth={true} sx={{mt:2}}/>
                <TextField value={info?.userName} name={'userName'} onChange={handleChange} label={'نام کاربری'} fullWidth={true} sx={{mt:2}}/>
                <TextField value={info?.password} name={'password'} onChange={handleChange} label={'رمزعبور'} type={"password"} fullWidth={true} sx={{mt:2}}/>
                <FormGroup sx={{width:"100%"}}>
                    <FormControlLabel
                        value={info?.isActive}
                        control={<Checkbox checked={info?.isActive} name={"isActive"} onChange={handleChange} />}
                        label="کاربر فعال باشد"
                        defaultChecked={true}
                    />
                </FormGroup>
                <Select multiple value={info?.usersRoles} fullWidth={true} name={"usersRoles"} label={"نقش کاربری"}
                        onChange={handleChange} sx={{mt: 2}}>
                    {roles?.data?.map(item => <MenuItem value={item.id} key={item?.id}>{item?.roleTitle}</MenuItem>)}
                </Select>
                <Select multiple value={info?.businessRoles} fullWidth={true} name={"businessRoles"} label={"نقش تجاری"}
                        onChange={handleChange} sx={{mt: 2}}>
                    {businessRoles?.data?.map(item => <MenuItem value={item.id} key={item?.id}>{item?.name}</MenuItem>)}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button  variant={"contained"} color={"success"} onClick={onSubmit}>
                    {businessRoles?.addState ? <CircularProgress /> : 'ثبت'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}