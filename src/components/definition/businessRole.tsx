import {Box, Button, Grid, Typography} from "@mui/material";
import moment from "jalali-moment";
import {Add, Apartment, Edit, Numbers} from "@mui/icons-material";
import Divider from "@mui/material/Divider";

export const BusinessRole = ({role,setAddRolesDialog,setSelectedRole}) => {
    return (
        <Grid item md={4} sm={6} xs={12}>
            <Box sx={{
                width: "100%",
                height: "100%",
                border: "2px solid #607D8B",
                borderRadius: 2,
                p:1
            }}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant={"subtitle1"}>{role?.name}</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant={"subtitle1"}>عنوان :</Typography>
                    <Typography variant={"subtitle1"}>{role?.title}</Typography>
                </Box>
                <Divider sx={{my:1}} />
                <Button color={"warning"} variant={"contained"} fullWidth={true} onClick={() => {
                    setSelectedRole(role);
                    setAddRolesDialog(true);
                }}>
                    ویرایش
                </Button>
            </Box>
        </Grid>
    )
}