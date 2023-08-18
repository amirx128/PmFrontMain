import {Box, Button, Grid, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";

export const PersonCard = ({person, setSelectedPerson, setAddPersonsDialog}) => {
    return (
        <Grid item md={4} sm={6} xs={12}>
            <Box sx={{
                width: "100%",
                height: "100%",
                border: "2px solid #607D8B",
                borderRadius: 2,
                p: 1
            }}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant={"subtitle1"}>{person?.firstName} {person?.lastName}</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant={"subtitle1"}>کد ملی :</Typography>
                    <Typography variant={"subtitle1"}>{person?.nationalCode}</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant={"subtitle1"}>شماره تماس :</Typography>
                    <Typography variant={"subtitle1"}>{person?.mobileNumber}</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant={"subtitle1"}>شماره موبایل :</Typography>
                    <Typography variant={"subtitle1"}>{person?.phoneNumber}</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant={"subtitle1"}>آدرس :</Typography>
                    <Typography variant={"subtitle1"}>{person?.address}</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant={"subtitle1"}>توضیحات :</Typography>
                    <Typography variant={"subtitle1"}>{person?.otherDescriptions}</Typography>
                </Box>
                <Divider sx={{my: 1}}/>
                <Button color={"warning"} variant={"contained"} fullWidth={true} onClick={() => {
                    setSelectedPerson(person);
                    setAddPersonsDialog(true);
                }}>
                    ویرایش
                </Button>
            </Box>
        </Grid>
    )
}