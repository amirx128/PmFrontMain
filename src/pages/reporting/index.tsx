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
import { getRequest, postRequest, postRequest2 } from './ApiRequestHandeler';

export default function Index() {

  const [value, setValue] = useState([]);
  const [businessRoles, setBusinessRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loginInputs, setLoginInputs] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    postRequest2("http://82.99.252.77:2060/Definition/GetAllPersons")
      .then((response) => {
        setIsLoading(false);
        setValue(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSubmitGet = (event) => {
    event.preventDefault();
    getRequest("AccountCountroller/testGet2?input2=11")
      .then((response) => {
        setIsLoading(false);
        setValue(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching data:', error);
      });
  };

  const handleSubmitPost = (event) => {
    event.preventDefault();
    postRequest("AccountCountroller/Login", loginInputs)
      .then((response) => {
        // Assuming the response contains the business roles
        setBusinessRoles(response.data);
      })
      .catch((error) => {
        console.error('Error posting data:', error);
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
      <form onSubmit={handleSubmitGet}>
        <button type='submit'>Submit GET</button>
      </form>

      <form onSubmit={handleSubmitPost}>
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
        <button type='submit'>Submit POST</button>
      </form>

      {isLoading && <h2>Loading...</h2>}

      {!isLoading && (
        <div>
          <h2>Persons</h2>
          {value.map((v, index) => (
            <div key={index} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
              <p>ID: {v.id}</p>
              <p>First Name: {v.firstName}</p>
              <p>Last Name: {v.lastName}</p>
              <p>Roles:</p>
              <ul>
                {v.usersRoles.map((r, ir) => (
                  <li key={ir}>
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
          {businessRoles.map((role, index) => (
            <div key={index} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
              <p>ID: {role.id}</p>
              <p>Name: {role.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}