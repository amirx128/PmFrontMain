import {Box, Button, Grid, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";

export const CommodityCard = ({commodity, addCommodityDialog}) => {
    return (
        <Grid item sm={6} xs={12}>
            <Box sx={{
                width: "100%",
                height: "100%",
                border: "2px solid #607D8B",
                borderRadius: 2,
                p: 1
            }}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant={"subtitle1"}>{commodity?.serchableName}</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography sx={{whiteSpace:"nowrap"}} variant={"subtitle1"}>آدرس :</Typography>
                    <Typography variant={"subtitle1"} sx={theme => ({color: theme.palette.secondary.dark})}>{commodity?.commodityAddress}</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography sx={{whiteSpace:"nowrap"}} variant={"subtitle1"}>واحد :</Typography>
                    <Typography variant={"subtitle1"}  sx={theme => ({color: theme.palette.secondary.dark})}>{commodity?.unit}</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography sx={{whiteSpace:"nowrap"}} variant={"subtitle1"}>زیر مجوعه ی : </Typography>
                    <Typography variant={"subtitle1"}  sx={theme => ({color: theme.palette.secondary.dark})}>{commodity?.parents?.map(item => item.serchableName)?.join(' , ') ?? '-'}</Typography>
                </Box>
            </Box>
        </Grid>
    )
}