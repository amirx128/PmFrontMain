
import React, { useEffect, useState } from 'react';
import { getRequest, postRequest } from './ApiRequestHandeler';
import { getAllUnits } from '../../redux/features/definitionSlicer';

export default function Index() {

  // const [value, setValue] = useState([]);
  const [apiTestGet, setApiTestGet] = useState([]);
  const [getAllPersons, setGetAllPersons] = useState([]); // GetAllPersons
  const [businessRoles, setBusinessRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [slecteItem1, setSlecteItem1] = useState([]);
  const [loginInputs, setLoginInputs] = useState({
    username: '',
    password: ''
  });
  const [projects, setAllProjects] = useState([]);
  const sp = 1;
  const sf = 1;
  const [selectedProjects, setSelectedProjects] = useState(1);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [floor, setAllFloor] = useState([]);
  const [units, setAllUnits] = useState([]);

  const handleSubmitGet = (event) => {
    event.preventDefault();
    getRequest("AccountCountroller/testGet2?input2=11")
      .then((response) => {
        setIsLoading(false);
        setApiTestGet(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching data:', error);
      });
  };

  const getAllProjects = () => {
    postRequest("Definition/getAllJustProjects", {
      userId: "1",
    })
      .then((response) => {
        setIsLoading(false);
        setAllProjects(response.data.model);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching data:', error);
      });

  };


  const getAllFloor = () => {
    postRequest("Definition/getAllFloor", {
      userId: "1",
      name: 'ali',
      projectId: selectedProjects
    })
      .then((response) => {
        setIsLoading(false);
        setAllFloor(response.data.model);
      }).then((r) => {
        console.log(selectedProjects);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching data:', error);
      });

  };

  const getAllunit = () => {
    postRequest("Definition/getallUnit", {
      userId: "1",
      name: 'ali',
      floorId: selectedFloor,
      projectId: 0
    })
      .then((response) => {
        setIsLoading(false);
        setAllUnits(response.data.model);
      }).then((r) => {

      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching data:', error);
      });

  };

  const Login_handleSubmitPost = (event) => {
    event.preventDefault();
    postRequest("AccountCountroller/Login", {
      CaptchaId: '1',
      CaptchaValues: '2',
      username: loginInputs.username,
      password: loginInputs.password
    })
      .then((response) => {
        // Assuming the response contains the business roles
        setBusinessRoles(response.data.model.businessRoles);
        setIsLoading(false);

      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };
  const GetAllPerson_Post = (event) => {
    postRequest("Definition/GetAllPersons", {
      userId: "1",
      username: "ali"
    })
      .then((response) => {
        setIsLoading(false);
        console.log(response.data.model)
        setGetAllPersons(response.data.model);

      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching data:', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginInputs({
      ...loginInputs,
      [name]: value
    });
  };


  useEffect(() => {
    getAllProjects()
  }, []);


  function handleDropDown1Change(e) {
    debugger;
    setSelectedProjects(e);
    getAllFloor();
  };


  function handleDropDown2Change(e) {

    setSelectedFloor(e);
    getAllunit();
  };


  return (
    <div>


      <div>
        <h3>پروژه ها</h3>
        <select onChange={e => handleDropDown1Change(e.target.value)}>
          {projects
            // filter to only completed teachers
            // .filter((teacher) => teacher.status === "COMPLETED")
            // render an option for each teacher
            .map((teacher) => (
              <option
                // map needs a unique key, so use the teacher id
                key={teacher.id}
                // this will be e.target.value if this option is selected
                value={teacher.id}
              // print the teacher name as the option text
              >
                {teacher.name}
              </option>
            ))

          }

        </select>





      </div>

      <div>

        <h3>طبقه ها</h3>
        <select onChange={e => handleDropDown2Change(e.target.value)}>
          {floor
            // filter to only completed teachers
            // .filter((teacher) => teacher.status === "COMPLETED")
            // render an option for each teacher
            .map((teacher) => (
              <option
                // map needs a unique key, so use the teacher id
                key={teacher.id}
                // this will be e.target.value if this option is selected
                value={teacher.id}
              // print the teacher name as the option text
              >
                {teacher.name}
              </option>
            ))

          }

        </select>


      </div>



      <div>

        <h3>واحد ها</h3>
        <select >
          {units
            // filter to only completed teachers
            // .filter((teacher) => teacher.status === "COMPLETED")
            // render an option for each teacher
            .map((teacher) => (
              <option
                // map needs a unique key, so use the teacher id
                key={teacher.id}
                // this will be e.target.value if this option is selected
                value={teacher.id}
              // print the teacher name as the option text
              >
                {teacher.name}
              </option>
            ))

          }

        </select>


      </div>
      <button onClick={GetAllPerson_Post} > get all person (POST) </button>
      <button onClick={getAllProjects} > handleGetSheduleActivities </button>



      <form onSubmit={handleSubmitGet}>
        <button type='submit'>Submit GET</button>

        {/* <input type='butten' onClick={GetAllPerson_Post} > get all person (POST)</input> */}

      </form>


      <form onSubmit={Login_handleSubmitPost}>
        <input
          type="text"
          name="username"
          value={loginInputs.username}
          onChange={handleInputChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={loginInputs.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <button type='submit'>Submit POST (login)</button>
      </form>

      {isLoading && <h2>Loading...</h2>}

      {!isLoading && (
        <div>
          <h2>Persons</h2>
          {getAllPersons.map((v) => (
            <div key={v.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
              <p>ID: {v.id}</p>
              <p>First Name: {v.firstName}</p>
              <p>Last Name: {v.lastName}</p>
              <p>Roles:</p>
              <ul>
                {v.businessRoles.map((r) => (
                  <li key={r.id}>
                    {r.roleTitle} ({r.roleName})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {!isLoading && (
        <div>
          <h2>users </h2>
          {apiTestGet.map((v) => (
            <div key={v.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
              <p>ID: {v.id}</p>
              <p>First Name: {v.firstName}</p>
              <p>Last Name: {v.lastName}</p>
              <p>Roles:</p>
              <ul>
                {v.usersRoles.map((r) => (
                  <li key={r.id}>
                    {r.roleTitle} ({r.roleName})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {!isLoading && (
        <div>
          <h2>Business Roles</h2>
          {businessRoles.map((role) => (
            <div key={role.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
              <p>ID: {role.id}</p>
              <p>Name: {role.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}