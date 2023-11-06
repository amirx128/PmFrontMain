import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  GetAllBusinessRoles,
  GetAllPersons,
  GetAllProducers,
  getAllProjects,
  getAllWarehouses,
  GetScheduleActivities,
  setSelectedFloorAction,
  setSelectedProjectAction,
} from '../../redux/features/definitionSlicer.ts';
import {
  Add,
  Book,
  Factory,
  Person,
  Receipt,
  Timer,
} from '@mui/icons-material';
import ProjectCard from '../../components/definition/project.tsx';
import { AddProject } from '../../components/definition/addProject.tsx';
import AddFloor from '../../components/definition/addFloor.tsx';
import AddUnit from '../../components/definition/addUnit.tsx';
import { PersonCard } from '../../components/definition/person.tsx';
import { AddPerson } from '../../components/definition/addPerson.tsx';
import { AddRole } from '../../components/definition/addRole.tsx';
import { BusinessRole } from '../../components/definition/businessRole.tsx';
import { Activity } from '../../components/definition/activity.tsx';
import { AddActivity } from '../../components/definition/addActivity.tsx';
import { Producer } from '../../components/definition/producer.tsx';
import { Warehouse } from '../../components/definition/warehouse.tsx';
import { AddProducer } from '../../components/definition/addProducer.tsx';
import { AddWarehouse } from '../../components/definition/addWarehouse.tsx';
import { ShowUnits } from '../../components/definition/showUnits.tsx';
import { ShowUsability } from '../../components/definition/showUsability.tsx';
import { AddUsability } from '../../components/definition/addUsability.tsx';

const Definitions = () => {
  const dispatch = useDispatch<any>();
  const {
    projects,
    persons,
    businessRoles,
    scheduledActivities,
    producers,
    warehouses,
  } = useSelector((state: any) => state.definition);

  const [addProjectDialog, setAddProjectDialog] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const [showUnitsDialog, setShowUnitsDialog] = useState<boolean>(false);
  const [showUsabilitiesDialog, setShowUsabilitiesDialog] =
    useState<boolean>(false);
  const [selectedUsability, setSelectedUsability] = useState<any>(null);
  const [addUsabilityDialog, setAddUsabilityDialog] = useState<boolean>(false);
  const [addFloorDialog, setAddFloorDialog] = useState<boolean>(false);
  const [selectedFloor, setSelectedFloor] = useState<any>(null);

  const [addUnitDialog, setAddUnitDialog] = useState<boolean>(false);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);

  const [currentProject, setCurrentProject] = useState<any>(null);

  const [selectedTab, setSelectedTab] = useState('projects');

  const [addPersonsDialog, setAddPersonsDialog] = useState<boolean>(false);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [addRolesDialog, setAddRolesDialog] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [addActivitiesDialog, setAddActivitiesDialog] =
    useState<boolean>(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [addProducerDialog, setAddProducerDialog] = useState<boolean>(false);
  const [addWarehouseDialog, setAddWarehouseDialog] = useState<boolean>(false);
  const [selectedProducer, setSelectedProducer] = useState<any>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>(null);

  const tabs = useMemo(
    () => [
      {
        title: 'پروژه ها',
        value: 'projects',
        icon: <Book sx={{ mr: 1 }} />,
        onClick: () => {
          setAddProjectDialog(true);
        },
      },
      {
        title: 'اشخاص',
        value: 'persons',
        icon: <Person sx={{ mr: 1 }} />,
        onClick: () => {
          setAddPersonsDialog(true);
        },
      },
      {
        title: 'نقش ها',
        value: 'roles',
        icon: <Receipt sx={{ mr: 1 }} />,
        onClick: () => {
          setAddRolesDialog(true);
        },
      },
      {
        title: 'فعالیت های زمانبندی شده',
        value: 'activities',
        icon: <Timer sx={{ mr: 1 }} />,
        onClick: () => {
          setAddActivitiesDialog(true);
        },
      },
      {
        title: 'تولید کننده ها',
        value: 'producers',
        icon: <Factory sx={{ mr: 1 }} />,
        onClick: () => {
          setAddProducerDialog(true);
        },
      },
      {
        title: 'انبار',
        value: 'warehouses',
        icon: <Factory sx={{ mr: 1 }} />,
        onClick: () => {
          setAddWarehouseDialog(true);
        },
      },
    ],
    []
  );

  const getTab = () => tabs.find((item) => item.value == selectedTab);

  useEffect(() => {
    if (selectedTab === 'projects') {
      dispatch(getAllProjects());
    }
    if (selectedTab === 'persons') {
      dispatch(GetAllPersons());
    }
    if (selectedTab === 'roles') {
      dispatch(GetAllBusinessRoles());
    }
    if (selectedTab === 'activities') {
      dispatch(GetScheduleActivities());
    }
    if (selectedTab === 'producers') {
      dispatch(GetAllProducers());
    }
    if (selectedTab === 'warehouses') {
      dispatch(getAllWarehouses());
    }
  }, [selectedTab, dispatch]);

  useEffect(() => {
    if (currentProject) {
      dispatch(setSelectedProjectAction(currentProject));
    }
  }, [currentProject, dispatch]);
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

  const floorOnClose = useCallback(() => {
    setAddFloorDialog(false);
  }, []);
  const showUnitsOnClose = () => {
    setShowUnitsDialog(false);
    dispatch(setSelectedFloorAction(null));
  };
  const showUsabilityOnClose = () => {
    setShowUsabilitiesDialog(false);
    setSelectedUnit(null);
  };

  const unitOnClose = useCallback(() => {
    setAddUnitDialog(false);
    setSelectedUnit(null);
  }, []);

  const roleOnClose = () => {
    setAddRolesDialog(false);
    setSelectedRole(null);
  };

  const producerOnClose = () => {
    setAddProducerDialog(false);
    setSelectedProducer(null);
  };
  const warehouseOnClose = () => {
    setAddWarehouseDialog(false);
    setSelectedWarehouse(null);
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, my: 1 }}>
          {tabs.map((tab) => (
            <Button
              color={'primary'}
              variant={tab.value === selectedTab ? 'contained' : 'outlined'}
              onClick={() => setSelectedTab(tab.value)}
            >
              {tab.title}
            </Button>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            borderRadius: 2,
            boxShadow: '0px 2px 10px 0px rgba(58, 53, 65, 0.1)',
            p: 2,
            width: '100%',
            mb: 2,
          }}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            mb={1}
          >
            <Typography sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              {getTab().icon}
              {getTab().title}
            </Typography>
            <Button
              size={'small'}
              startIcon={<Add />}
              variant={'outlined'}
              color={'secondary'}
              onClick={() => getTab().onClick()}
            >
              افزودن
            </Button>
          </Box>
          <Grid container spacing={1}>
            {/* projets */}
            {selectedTab === 'projects' && projects.pending && (
              <div className="flex justify-center w-full">
                <CircularProgress />
              </div>
            )}
            {selectedTab === 'projects' &&
            !projects.pending &&
            projects?.data?.length > 0
              ? projects?.data?.map((project) => (
                  <ProjectCard
                    setCurrentProject={setCurrentProject}
                    setAddFloorDialog={setAddFloorDialog}
                    setSelectedFloor={setSelectedFloor}
                    setSelectedProject={setSelectedProject}
                    setAddProjectDialog={setAddProjectDialog}
                    setShowUnitsDialog={setShowUnitsDialog}
                    project={project}
                    setSelectedUnit={setSelectedUnit}
                    setAddUnitDialog={setAddUnitDialog}
                    currentProject={currentProject}
                    key={project?.id}
                  />
                ))
              : selectedTab === 'projects' &&
                !projects.pending && (
                  <Typography>اطلاعاتی برای نمایش وجود ندارد</Typography>
                )}
            {/* persons */}
            {selectedTab === 'persons' && persons.pending && (
              <div className="flex justify-center w-full">
                <CircularProgress />
              </div>
            )}
            {selectedTab === 'persons' &&
            !persons.pending &&
            persons?.data?.length > 0
              ? persons?.data?.map((person) => (
                  <PersonCard
                    person={person}
                    setAddPersonsDialog={setAddPersonsDialog}
                    setSelectedPerson={setSelectedPerson}
                    key={person?.id}
                  />
                ))
              : selectedTab === 'persons' &&
                !persons.pending && (
                  <Typography>اطلاعاتی برای نمایش وجود ندارد</Typography>
                )}
            {/* roles */}
            {selectedTab === 'roles' && businessRoles.pending && (
              <div className="flex justify-center w-full">
                <CircularProgress />
              </div>
            )}
            {selectedTab === 'roles' &&
            !businessRoles.pending &&
            businessRoles?.data?.length > 0
              ? businessRoles?.data?.map((role) => (
                  <BusinessRole
                    role={role}
                    setAddRolesDialog={setAddRolesDialog}
                    setSelectedRole={setSelectedRole}
                    key={role?.id}
                  />
                ))
              : selectedTab === 'roles' &&
                !businessRoles.pending && (
                  <Typography>اطلاعاتی برای نمایش وجود ندارد</Typography>
                )}
            {/* activiris */}
            {selectedTab === 'activities' && scheduledActivities.pending && (
              <div className="flex justify-center w-full">
                <CircularProgress />
              </div>
            )}
            {selectedTab === 'activities' &&
            !scheduledActivities.pending &&
            scheduledActivities?.data?.length > 0
              ? scheduledActivities?.data?.map((activity) => (
                  <Activity
                    activity={activity}
                    setAddActivitiesDialog={setAddActivitiesDialog}
                    setSelectedActivity={setSelectedActivity}
                    key={activity?.id}
                  />
                ))
              : selectedTab === 'activities' &&
                !scheduledActivities.pending && (
                  <Typography>اطلاعاتی برای نمایش وجود ندارد</Typography>
                )}
            {/* producers */}
            {selectedTab === 'producers' && producers.pending && (
              <div className="flex justify-center w-full">
                <CircularProgress />
              </div>
            )}
            {selectedTab === 'producers' &&
            !producers.pending &&
            producers?.data?.length > 0
              ? producers?.data?.map((producer) => (
                  <Producer
                    producer={producer}
                    setAddProducerDialog={setAddProducerDialog}
                    setSelectedProducer={setSelectedProducer}
                    key={producer?.id}
                  />
                ))
              : selectedTab === 'producers' &&
                !producers.pending && (
                  <Typography>اطلاعاتی برای نمایش وجود ندارد</Typography>
                )}
            {/* warehouses */}
            {selectedTab === 'warehouses' && warehouses.pending && (
              <div className="flex justify-center w-full">
                <CircularProgress />
              </div>
            )}
            {selectedTab === 'warehouses' &&
            !warehouses.pending &&
            warehouses?.data?.length > 0
              ? warehouses?.data?.map((warehouse) => (
                  <Warehouse
                    warehouse={warehouse}
                    setAddWarehouseDialog={setAddWarehouseDialog}
                    setSelectedWarehouse={setSelectedWarehouse}
                    key={warehouse?.id}
                  />
                ))
              : selectedTab === 'warehouses' &&
                !warehouses.pending && (
                  <Typography>اطلاعاتی برای نمایش وجود ندارد</Typography>
                )}
          </Grid>
        </Box>
      </Grid>
      {selectedTab === 'projects' && (
        <>
          <AddProject
            addProjectDialog={addProjectDialog}
            selectedProject={selectedProject}
            onClose={projectOnClose}
          />
          <AddFloor
            setCurrentProject={setCurrentProject}
            addFloorDialog={addFloorDialog}
            selectedFloor={selectedFloor}
            onClose={floorOnClose}
            currentProject={currentProject}
          />
          <ShowUnits
            showUnitsDialog={showUnitsDialog}
            selectedFloor={selectedFloor}
            onClose={showUnitsOnClose}
            setAddFloorDialog={setAddFloorDialog}
            setSelectedUnit={setSelectedUnit}
            setAddUnitDialog={setAddUnitDialog}
            setShowUsabilitiesDialog={setShowUsabilitiesDialog}
          />
          <ShowUsability
            showUsabilityDialog={showUsabilitiesDialog}
            selectedUnit={selectedUnit}
            onClose={showUsabilityOnClose}
            setSelectedUsability={setSelectedUsability}
            setAddUsabilityDialog={setAddUsabilityDialog}
            setAddUnitDialog={setAddUnitDialog}
          />
          <AddUnit
            currentProject={currentProject}
            addUnitDialog={addUnitDialog}
            selectedUnit={selectedUnit}
            selectedFloor={selectedFloor}
            onClose={unitOnClose}
          />
          <AddUsability
            addUsabilityDialog={addUsabilityDialog}
            selectedUsability={selectedUsability}
            onClose={() => setAddUsabilityDialog(false)}
            selectedUnit={selectedUnit}
          />
        </>
      )}
      {selectedTab === 'persons' && (
        <AddPerson
          addPersonsDialog={addPersonsDialog}
          selectedPerson={selectedPerson}
          onClose={personOnClose}
        />
      )}
      {selectedTab === 'roles' && (
        <AddRole
          addRolesDialog={addRolesDialog}
          selectedRole={selectedRole}
          onClose={roleOnClose}
        />
      )}

      {selectedTab === 'activities' && (
        <AddActivity
          addActivitiesDialog={addActivitiesDialog}
          selectedActivity={selectedActivity}
          onClose={activityOnClose}
        />
      )}
      {selectedTab === 'producers' && (
        <AddProducer
          addProducerDialog={addProducerDialog}
          selectedProducer={selectedProducer}
          onClose={producerOnClose}
        />
      )}
      {selectedTab === 'warehouses' && (
        <AddWarehouse
          addWarehouseDialog={addWarehouseDialog}
          selectedWarehouse={selectedWarehouse}
          onClose={warehouseOnClose}
        />
      )}
    </Grid>
  );
};
export default Definitions;
