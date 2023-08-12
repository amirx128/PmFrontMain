import {Box, Button, Grid, Typography} from "@mui/material";
import moment from "jalali-moment";
import {Apartment,Numbers} from "@mui/icons-material";
import Divider from "@mui/material/Divider";

export const ProjectCard = ({project,setSelectedProject,setAddProjectDialog}) => {
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
                    <Typography variant={"subtitle1"}>{project?.name}</Typography>
                    <Typography variant={"subtitle1"}>{moment(project?.createDate).locale('fa').format('LL')}</Typography>
                </Box>
                <Box display={"flex"} gap={0.5} alignItems={"center"} mt={1}>
                    <Apartment color={"secondary"} sx={{fontSize: 20}} />
                    <Typography color={"secondary"} variant={"subtitle2"}>طبقات</Typography>
                </Box>
                <Box my={1}>
                    {
                        project?.projectfloor?.length > 0 ? (
                            <Box display={"flex"} alignItems={"center"} gap={1} sx={{flexWrap:"wrap"}}>
                                {project?.projectfloor?.map(floor => (
                                    <Button key={floor?.id} size={"small"} color={"warning"} variant={"outlined"} sx={{display:"flex",flexDirection:"column",justifyContent:"center",flexGrow:1}}>
                                        <Typography fontSize={16}>{floor?.name}</Typography>
                                        <Typography fontSize={13}>کد : {floor?.code}</Typography>
                                        <Typography fontSize={10}>{moment(floor?.createDate).locale('fa').format('LL')}</Typography>
                                    </Button>
                                ))}
                            </Box>
                            ) : (
                            <Typography color={"error"} variant={"body2"}>طبقه ای تعریف نشده</Typography>
                        )
                    }
                </Box>
                <Box display={"flex"} gap={0.5} alignItems={"center"} mt={1}>
                    <Numbers color={"secondary"} sx={{fontSize: 20}} />
                    <Typography color={"secondary"} variant={"subtitle2"}>واحد ها</Typography>
                </Box>
                <Box my={1}>
                    {
                        project?.projectUnit?.length > 0 ? (
                            <Box display={"flex"} alignItems={"center"} gap={1} sx={{flexWrap:"wrap"}}>
                                {project?.projectUnit?.map(unit => (
                                    <Button key={unit?.id} size={"small"} color={"info"} variant={"outlined"} sx={{display:"flex",flexDirection:"column",justifyContent:"center",flexGrow:1}}>
                                        <Typography fontSize={16}>{unit?.name}</Typography>
                                        <Typography fontSize={13}>کد : {unit?.code}</Typography>
                                        <Typography fontSize={10}>{moment(unit?.createDate).locale('fa').format('LL')}</Typography>
                                    </Button>
                                ))}
                            </Box>
                        ) : (
                            <Typography color={"error"} variant={"body2"}>واحدی تعریف نشده</Typography>
                        )
                    }
                </Box>
                <Divider my={1} />
                <Button color={"warning"} variant={"contained"} fullWidth={true} sx={{mt:1}} onClick={() => {
                    setSelectedProject(project);
                    setAddProjectDialog(true);
                }}>
                    ویرایش
                </Button>
            </Box>
        </Grid>
    )
}