import {Box, Button, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllProjects} from "../../redux/features/definitionSlicer.ts";
import {Add, Book} from "@mui/icons-material";
import moment from 'jalali-moment'
import {ProjectCard} from "../../components/definition/project.tsx";
import {AddProject} from "../../components/definition/addProject.tsx";
import {FloorCard} from "../../components/definition/floor.tsx";
import {AddFloor} from "../../components/definition/addFloor.tsx";

const Definitions = () => {
    const dispatch = useDispatch<any>();
    const {projects,units,floors} = useSelector((state:any) => state.definition);

    const [addProjectDialog,setAddProjectDialog] = useState<boolean>(false);
    const [selectedProject,setSelectedProject] = useState<any>(null);

    const [addFloorDialog,setAddFloorDialog] = useState<boolean>(false);
    const [selectedFloor,setSelectedFloor] = useState<any>(null);

    useEffect(() => {
        dispatch(getAllProjects());
    }, [])

    const projectOnClose = () => {
      setAddProjectDialog(false);
      setSelectedProject(null);
    };

    const floorOnClose = () => {
        setAddFloorDialog(false);
        setSelectedFloor(null);
    };
    return (
        <Grid
            container
        >
            <Grid item xs={12}>
                <Box sx={{
                    borderRadius: 2,
                    boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
                    p: 2,
                    width: "100%",
                    mb:2
                }}>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={1}>
                        <Typography sx={{display: "flex", alignItems: "center", mb: 1}}>
                            <Book sx={{mr: 1}}/>
                            پروژه ها
                        </Typography>
                        <Button size={"small"} startIcon={<Add />} variant={"outlined"} color={"secondary"} onClick={() => setAddProjectDialog(true)}>
                            افزودن
                        </Button>
                    </Box>
                    <Grid container spacing={1}>
                        {
                            projects?.data?.length > 0 ? projects?.data?.map(project => <ProjectCard setAddFloorDialog={setAddFloorDialog} setSelectedFloor={setSelectedFloor} setSelectedProject={setSelectedProject} setAddProjectDialog={setAddProjectDialog} project={project} key={project?.id} />) : 'no data'
                        }
                    </Grid>
                </Box>
            </Grid>
            <AddProject addProjectDialog={addProjectDialog} selectedProject={selectedProject} onClose={projectOnClose}/>
            <AddFloor addFloorDialog={addFloorDialog} selectedFloor={selectedFloor} onClose={floorOnClose}/>
        </Grid>
    );
};
export default Definitions;
