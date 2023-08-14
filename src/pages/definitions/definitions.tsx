import {Box, Button, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    GetAllBusinessRoles,
    GetAllPersons,
    getAllProjects,
    GetScheduleActivities
} from "../../redux/features/definitionSlicer.ts";
import {Add, Book, Person, Receipt, Timer} from "@mui/icons-material";
import {ProjectCard} from "../../components/definition/project.tsx";
import {AddProject} from "../../components/definition/addProject.tsx";
import {AddFloor} from "../../components/definition/addFloor.tsx";
import {AddUnit} from "../../components/definition/addUnit.tsx";
import {PersonCard} from "../../components/definition/person.tsx";
import {AddPerson} from "../../components/definition/addPerson.tsx";
import {AddRole} from "../../components/definition/addRole.tsx";
import {BusinessRole} from "../../components/definition/businessRole.tsx";
import {Activity} from "../../components/definition/activity.tsx";
import {AddActivity} from "../../components/definition/addActivity.tsx";

const Definitions = () => {
    const dispatch = useDispatch<any>();
    const {projects, units, floors, persons,businessRoles,scheduledActivities} = useSelector((state: any) => state.definition);

    const [addProjectDialog,setAddProjectDialog] = useState<boolean>(false);
    const [selectedProject,setSelectedProject] = useState<any>(null);

    const [addFloorDialog,setAddFloorDialog] = useState<boolean>(false);
    const [selectedFloor,setSelectedFloor] = useState<any>(null);

    const [addUnitDialog, setAddUnitDialog] = useState<boolean>(false);
    const [selectedUnit, setSelectedUnit] = useState<any>(null);

    const [currentProject, setCurrentProject] = useState<any>(null);

    const [selectedTab, setSelectedTab] = useState('projects');

    const [addPersonsDialog, setAddPersonsDialog] = useState<boolean>(false);
    const [selectedPerson, setSelectedPerson] = useState<any>(null);
    const [addRolesDialog, setAddRolesDialog] = useState<boolean>(false);
    const [selectedRole, setSelectedRole] = useState<any>(null);
    const [addActivitiesDialog, setAddActivitiesDialog] = useState<boolean>(false);
    const [selectedActivity, setSelectedActivity] = useState<any>(null);

    const tabs = [
        {
            title: 'پروژه ها',
            value: 'projects',
            icon: <Book sx={{mr: 1}}/>,
            onClick: () => {
                setAddProjectDialog(true)
            }
        },
        {
            title: 'اشخاص',
            value: "persons",
            icon: <Person sx={{mr: 1}}/>,
            onClick: () => {
                setAddPersonsDialog(true)
            }
        },
        {
            title: "نقش ها",
            value: "roles",
            icon: <Receipt sx={{mr: 1}}/>,
            onClick: () => {
                setAddRolesDialog(true)
            }
        },
        {
            title: "فعالیت های زمانبندی شده",
            value: "activities",
            icon: <Timer sx={{mr: 1}}/>,
            onClick: () => {
                setAddActivitiesDialog(true)
            }
        }
    ];

    const getTab = () => {
        return tabs.filter(item => item.value == selectedTab)[0];
    }

    useEffect(() => {
        // @ts-ignore
        dispatch(getAllProjects());
        // @ts-ignore
        dispatch(GetAllPersons());
        // @ts-ignore
        dispatch(GetAllBusinessRoles());
        // @ts-ignore
        dispatch(GetScheduleActivities());
    }, [])

    const projectOnClose = () => {
      setAddProjectDialog(false);
      setSelectedProject(null);
    };

    const activityOnClose = () => {
        setAddActivitiesDialog(false);
        setSelectedActivity(null);
    };

    const personOnClose = () => {
        setAddPersonsDialog(false);
        setSelectedPerson(null);
    };

    const floorOnClose = () => {
        setAddFloorDialog(false);
        setSelectedFloor(null);
    };

    const unitOnClose = () => {
        setAddUnitDialog(false);
        setSelectedUnit(null);
    };

    const roleOnClose = () => {
        setAddRolesDialog(false);
        setSelectedRole(null);
    };
    return (
        <Grid
            container
        >
            <Grid item xs={12}>
                <Box sx={{display:"flex",alignItems:"center",gap: 0.5,my:1}}>
                    {
                        tabs.map(tab => <Button color={"primary"} variant={tab.value === selectedTab ? "contained" : "outlined"} onClick={() => setSelectedTab(tab.value)}>{tab.title}</Button>)
                    }
                </Box>
            </Grid>
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
                            {getTab().icon}
                            {getTab().title}
                        </Typography>
                        <Button size={"small"} startIcon={<Add/>} variant={"outlined"} color={"secondary"}
                                onClick={() => getTab().onClick()}>
                            افزودن
                        </Button>
                    </Box>
                    <Grid container spacing={1}>
                        {
                            selectedTab === 'projects' && projects?.data?.length > 0 ? projects?.data?.map(project =>
                                <ProjectCard setCurrentProject={setCurrentProject} setAddFloorDialog={setAddFloorDialog}
                                             setSelectedFloor={setSelectedFloor} setSelectedProject={setSelectedProject}
                                             setAddProjectDialog={setAddProjectDialog} project={project}
                                             setSelectedUnit={setSelectedUnit} setAddUnitDialog={setAddUnitDialog}
                                             key={project?.id}/>) : (selectedTab === 'projects' && <Typography>اطلاعاتی برای نمایش وجود ندارد</Typography>)
                        }
                        {
                            selectedTab === 'persons' && persons?.data?.length > 0 ? persons?.data?.map(person =>
                                <PersonCard person={person} setAddPersonsDialog={setAddPersonsDialog}
                                            setSelectedPerson={setSelectedPerson} key={person?.id}/>) : (selectedTab === 'persons' && <Typography>اطلاعاتی برای نمایش وجود ندارد</Typography>)
                        }
                        {
                            selectedTab === 'roles' && businessRoles?.data?.length > 0 ? businessRoles?.data?.map(role =>
                                <BusinessRole role={role} setAddRolesDialog={setAddRolesDialog}
                                              setSelectedRole={setSelectedRole} key={role?.id}/>) : (selectedTab === 'roles' && <Typography>اطلاعاتی برای نمایش وجود ندارد</Typography>)
                        }
                        {
                            selectedTab === 'activities' && scheduledActivities?.data?.length > 0 ? scheduledActivities?.data?.map(activity =>
                                <Activity activity={activity} setAddActivitiesDialog={setAddActivitiesDialog}
                                              setSelectedActivity={setSelectedActivity} key={activity?.id}/>) : (selectedTab === 'activities' && <Typography>اطلاعاتی برای نمایش وجود ندارد</Typography>)
                        }
                    </Grid>
                </Box>
            </Grid>
            <AddProject addProjectDialog={addProjectDialog} selectedProject={selectedProject} onClose={projectOnClose}/>
            <AddActivity addActivitiesDialog={addActivitiesDialog} selectedActivity={selectedActivity} onClose={activityOnClose}/>
            <AddPerson addPersonsDialog={addPersonsDialog} selectedPerson={selectedPerson} onClose={personOnClose}/>
            <AddRole  addRolesDialog={addRolesDialog} selectedRole={selectedRole} onClose={roleOnClose}/>
            <AddFloor setCurrentProject={setCurrentProject} addFloorDialog={addFloorDialog}
                      selectedFloor={selectedFloor} onClose={floorOnClose}/>
            <AddUnit currentProject={currentProject} addUnitDialog={addUnitDialog} selectedUnit={selectedUnit}
                     onClose={unitOnClose}/>
        </Grid>
    );
};
export default Definitions;
