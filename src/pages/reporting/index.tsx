// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import {getRequest,postRequest} from './ApiRequestHandeler'
// import { idID } from '@mui/material/locale';
// import { Value } from '../product-details/style';
// // 1=> VORODI HAYE LOGIN HANDEL 
// // 2=> method dovom get... az noe post seda zade shavad => http://82.99.252.77:2060/Definition/GetAllPersons 
// // ==============>>>>>> 2 ta map mesle mesale paiin. dovomi roye (businessRoles) AZ postRequest2 estefade shavad

// export default function index() {

//     const [value, setValue] = useState([]);
//     const [isLoading, SetIsLoading] = useState(true);

//     useEffect(() => {

//         // getRequest("AccountCountroller/testGet")


//         // getRequest("AccountCountroller/testGet2?input2=11")

//         //     .then((response) => {
//         //         SetIsLoading(false)
//         //         setValue(response.data)
//         //     })
//     })


//     const handelSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
//         event.preventDefault()

//         getRequest("AccountCountroller/testGet2?input2=11")

//             .then((response) => {
//                 SetIsLoading(false)
//                 setValue(response.data)
//             })




//     }

//     const handelSubmit2 = (event: React.ChangeEvent<HTMLInputElement>) => {
//         event.preventDefault()

//         postRequest("AccountCountroller/Login")


//     }

//     return (
//         <div>


//         <form onSubmit={handelSubmit} >

//                         <button type='submit'>submit</button>
//                     </form> 

// <form onSubmit={handelSubmit2} >

//                  <button type='submit'>submit POST</button>
//              </form> 



//             {
//             value.map(( v, index ) => {
//           return (
//             <tr key={index} style={{border: 150}}>
//               <td>{v.id}</td>
//               <td>{v.firstName}</td>
//               <td> rols :  {

//                 v.usersRoles.map(( r, ir ) => {
//                     return (
//                       <tr key={index}>
//                         <td>{r.id}</td>
//                         <td>{r.roleName}</td>
//                         <td>{r.roleTitle}</td>
//                       </tr>
//                     );
//                   })}
// <tr>....</tr>
//                 </td>
//             </tr>
//           );
//         })
//     }
//             <h2>salam.....</h2>



//             { isLoading && <h2>loading...</h2> }
//     {
//         value.map(v => (

//             <h2 key={v.id}  >


//                 {v.usersRoles[0].roleTitle}



//                 iiiiii
//                 {v.firstName} -
//                 {v.lastName}
//             </h2>))
//     }
//         </div >
//     )
// }

import React, { useEffect, useState } from 'react';
import { getRequest, postRequest } from './ApiRequestHandeler';

export default function Index() {

  // const [value, setValue] = useState([]);
  const [apiTestGet, setApiTestGet] = useState([]);
  const [getAllPersons, setGetAllPersons] = useState([]); // GetAllPersons
  const [businessRoles, setBusinessRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loginInputs, setLoginInputs] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {

  });

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

  return (
    <div>


      <button onClick={GetAllPerson_Post} > get all person (POST) 123</button>



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