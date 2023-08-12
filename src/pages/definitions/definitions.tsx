import {Box, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllProjects} from "../../redux/features/definitionSlicer.ts";
import {Book} from "@mui/icons-material";
import moment from 'jalali-moment'
import {ProjectCard} from "../../components/definition/project.tsx";

const Definitions = () => {
    const dispatch = useDispatch();
    const {projects} = useSelector((state) => state.definition);

    useEffect(() => {
        dispatch(getAllProjects());
    }, [])
    return (
        <Grid
            container
        >
            <Grid item xs={12}>
                <Box sx={{
                    borderRadius: 2,
                    boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
                    p: 2,
                    width: "100%"
                }}>
                    <Typography sx={{display: "flex", alignItems: "center", mb: 1}}>
                        <Book sx={{mr: 1}}/>
                        پروژه ها
                    </Typography>
                    <Grid container spacing={1}>
                        {
                            projects?.data?.length > 0 ? projects?.data?.map(project => <ProjectCard project={project} key={project?.id} />) : 'no data'
                        }
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};
export default Definitions;
