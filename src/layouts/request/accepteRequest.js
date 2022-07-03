// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";
// import { useEffect, useState, useContext } from "react";
// import Icon from "@mui/material/Icon";
// import MDButton from "components/MDButton";

// import { AuthContext } from "context/AuthContext";
// import { useRequest } from "lib/hooks/useRequest";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const columns = [
//   { Header: "name", accessor: "name", width: "25%", align: "center" },
//   { Header: "goefence", accessor: "goefence", width: "25%", align: "center" },
//   { Header: "status", accessor: "status", width: "25%", align: "center" },
//   { Header: "actions", accessor: "actions", width: "25%", align: "center" },
// ];

// function AcceptRequest() {
//   const [rows, setRows] = useState([]);
//   const ctx = useContext(AuthContext);

//   const [request, setRequest] = useState([]);

//   const [isActive, setIsActive] = useState();
//   const [accept, setIsAccept] = useState([]);

//   let [counter, setCounter] = useState(0);

//   ///////////////////

//   const fetchAllRequests = async () => {
//     const data = await axios({
//       url: `${process.env.REACT_APP_API_URL}/request`,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + ctx.token,
//       },
//       method: "GET",
//     });
//     setRequest(data);

//     return data;
//   };

//   const updateStatus = async (isAccepted, userId) => {
//     const data = await axios({
//       url: `${process.env.REACT_APP_API_URL}/request/acceptRequest`,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + ctx.token,
//       },
//       data: {
//         isAccepted: !isAccepted,
//         userId: userId,
//       },
//       method: "PUT",
//     });

//     setIsAccept(data);
//     setCounter(++counter);

//     return data;
//   };

//   useEffect(() => {
//     fetchAllRequests();
//   }, [counter]);

//   useEffect(() => {
//     setRows(
//       request?.data?.result
//         ? request?.data?.result?.map((st, i) => {
//             // console.log(st.id, "idddddddddddddddddddd");
//             console.log(st, "statussssssssssss");
//             return {
//               name: <div>{st?.User?.name}</div>,
//               goefence: <div>{st?.Geofence?.title}</div>,
//               status: (
//                 <div>
//                   {st.isAccepted ? <h4>accepted</h4> : <h4>not accepted</h4>}
//                 </div>
//               ),
//               actions: (
//                 <MDButton
//                   key={st.id}
//                   variant="contained"
//                   color={st.isAccepted ? "error" : "success"}
//                   onClick={() => {
//                     updateStatus(st.isAccepted, st.userId);
//                   }}
//                 >
//                   {!st.isAccepted ? <h4>Accepted</h4> : <h4>Not Accepted</h4>}
//                 </MDButton>
//               ),
//             };
//           })
//         : []
//     );
//   }, [request]);
//   console.log(rows);

  ////////////////////////////////////////////////////////

  // const updateStatus = async (isAccepted, userId) => {
  //   const data = await axios({
  //     url: `${process.env.REACT_APP_API_URL}/request/acceptRequest`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + ctx.token,
  //     },
  //     data: {
  //       isAccepted: !isAccepted,
  //       userId: userId,
  //     },
  //     method: "PUT",
  //   });
  //   // console.log(data, "datataaaaaaaaa");
  //   setRequest(data);
  //   console.log(request, "requestttttttttt");
  //   return data;
  // };

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_URL}/request`, {
  //     headers: {
  //       Authorization: "Bearer " + ctx.token,
  //     },
  //   }).then((response) => {
  //     response.json().then((users) => {
  //       // setUsers(users.result);
  //       const allUserInfo = users.result.map((req, i) => {
  //         console.log(req, "reqqqqqqqqqqq");
  //         return {
  //           name: <>{req.User.name}</>,
  //           goefence: <>{req.Geofence.title}</>,
  //           status: (
  //             <>{req.isAccepted ? <h4>accepted</h4> : <h4>pending...</h4>}</>
  //           ),
  //           actions: (
  //             <>
  //               <MDButton
  //                 color="dark"
  //                 onClick={() => {
  //                   updateStatus(req.isAccepted, req.userId).then(() =>
  //                     setCounter(++counter)
  //                   );
  //                 }}
  //               >
  //                 Accept Request
  //               </MDButton>
  //             </>
  //           ),
  //         };
  //       });
  //       setRows(allUserInfo);
  //     });
  //   });
  // }, [counter]);
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox pt={6} pb={3}>
//         <Grid container spacing={6}>
//           <Grid item xs={12}>
//             <Card>
//               <MDBox
//                 mx={2}
//                 mt={-3}
//                 py={3}
//                 px={2}
//                 variant="gradient"
//                 bgColor="info"
//                 borderRadius="lg"
//                 coloredShadow="info"
//               >
//                 <Grid
//                   container
//                   direction="row"
//                   justifyContent="space-between"
//                   alignItems="center"
//                 >
//                   <MDTypography variant="h6" color="white">
//                     Users Table
//                   </MDTypography>
//                   <Link to="/admins/add">
//                     <MDButton variant="text">
//                       <Icon>add_circle</Icon>&nbsp;Add
//                     </MDButton>
//                   </Link>
//                 </Grid>
//               </MDBox>
//               <MDBox pt={3}>
//                 <DataTable
//                   table={{ columns, rows }}
//                   isSorted={false}
//                   entriesPerPage={false}
//                   showTotalEntries={false}
//                   noEndBorder
//                 />
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default AcceptRequest;
/////////////////////////////////////////////////////////////////////////////////
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState, useContext } from "react";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";
import { AuthContext } from "context/AuthContext";
import axios from "axios";

const columns = [
  { Header: "title", accessor: "title", align: "center" },
  { Header: "user Name", accessor: "userName", align: "center" },
  { Header: "role", accessor: "role", align: "center" },
  // { Header: "status", accessor: "status", align: "center" },
  { Header: "actions", accessor: "actions", align: "center" },
];

function AcceptRequest() {
  const [rows, setRows] = useState([]);
  const ctx = useContext(AuthContext);
  const [serverResponse, setServerResponse] = useState(" ");
  const [snackBarType, setSnackBarType] = useState("success");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const closeSnackBar = () => setOpenSnackBar(false);

  const [users, setUsers] = useState([]);

  
  const Approve = (id) => {
    if (window.confirm('Are you sure you want to accept to join to the Geofence'))
       fetch(`${process.env.REACT_APP_API_URL}/requests/approve/${id}`, {
        method: "PUT",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + ctx.token,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          // setServerResponse(result.message.join(" "));
          if (result.success) {
            setSnackBarType("success");
          } else {
            setSnackBarType("error");
          }
          setOpenSnackBar(true);
        })
        .catch((error) => console.log(error));
    };

    
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/requests/getRequestedUsers`, {
      body: JSON.stringify(),
      headers: {
        Authorization: "Bearer " + ctx.token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response
          .json()
          .then((geofences) => {
            const getGeofences = geofences.result.map((geofence) => {
              return {
                title: <>{geofence.Geofence.title}</>,
                userName: <>{geofence.User.name}</>,
                role:<>{geofence.User.roleId}</>,
                actions: (
                  <>
                    <>
                    <MDButton
                      variant="text"
                      color="info"
                      onClick={() => {
                        Approve(geofence.id);
                      }}
                    >
                      Activate
                    </MDButton>
                  </>
                  </>
                ),
              };
            });
            setRows(getGeofences);
          })
          .catch((e) => {});
      })
      .catch((e) => {
        console.log(e);
        alert("you are not Admin");
      });
  }, []);

  // const updageGeo = async (id, isActive) => {
  //   const data = await axios({
  //     url: `${process.env.REACT_APP_API_URL}/geofences`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + ctx.token,
  //     },
  //     data: {
  //       isActive: !isActive,
  //       id: id,
  //     },
  //     method: "PUT",
  //   });

  //   setIsActive(data);
  //   setCounter(++counter);
  //   console.log(counter, "counterrrrrrrrrrr");

  //   return data;
  // };

  // useEffect(() => {
  //   Request();
  // }, [counter]);

    // useEffect(() => {
    //   setRows(
    //     users?.data?.result
    //       ? users?.data?.result?.map((st, i) => {
    //           return {
    //             title: <div>{st?.title}</div>,
    //             description: <div>{st?.description}</div>,
    //             coordinates: <div>{st?.coordinates}</div>,
    //             status: (
    //               <div>{st?.isActive ? <h4>active</h4> : <h4>inActive</h4>}</div>
    //             ),
    //             actions: (
    //               <MDButton
    //                 key={st.id}
    //                 variant="contained"
    //                 color={st.isActive ? "error" : "success"}
    //                 onClick={() => {
    //                   updageGeo(st.id, st.isActive);
    //                 }}
    //               >
    //                 {st.isActive ? <h4>DeActivate</h4> : <h4>Activate</h4>}
    //               </MDButton>
    //             ),
    //           };
    //         })
    //       : []
    //   );
    // }, [users]);


    ///////////////////////////////////////////////////////////////////////////////
    // const deactivateGeofence = (id) => {
    //   if (window.confirm('Are you sure you want to deactivate Geofence'))
    //      fetch(`${process.env.REACT_APP_API_URL}/geofences/deactivate/${id}`, {
    //       method: "PATCH",
    //       body: JSON.stringify(),
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + ctx.token,
    //       },
    //     })
    //       .then((response) => response.json())
    //       .then((result) => {
    //         setServerResponse(result.message.join(" "));
    //         if (result.success) {
    //           setSnackBarType("success");
    //         } else {
    //           setSnackBarType("error");
    //         }
    //         setOpenSnackBar(true);
    //       })
    //       .catch((error) => error);
    //   };
    
      
    //   useEffect(() => {
    //     fetch(`${process.env.REACT_APP_API_URL}/geofences/all`, {
    //       body: JSON.stringify(),
    //       headers: {
    //         Authorization: "Bearer " + ctx.token,
    //         "Content-Type": "application/json",
    //       },
    //     })
    //       .then((response) => {
    //         response
    //           .json()
    //           .then((geofences) => {
    //             const getGeofences = geofences.result.map((geofence) => {
    //               return {
    //                 title: <>{geofence.title}</>,
    //                 description: <>{geofence.description}</>,
    //                 coordinates: <>{geofence.coordinates}</>,
    //                 actions: (
    //                   <>
    //                     <MDButton
    //                       variant="text"
    //                       color="error"
    //                       onClick={() => {
    //                         deactivateGeofence(geofence.id);
    //                       }}
    //                     >
    //                       Deactivate
    //                     </MDButton>
    //                   </>
    //                 ),
    //               };
    //             });
    //             setRows(getGeofences);
    //           })
    //           .catch((e) => {});
    //       })
    //       .catch((e) => {
    //         console.log(e);
    //         alert("you are not Admin");
    //       });
    //   }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <MDTypography variant="h6" color="white">
                    Geofences Table
                  </MDTypography>
                  <Link to="/geofences/add">
                    <MDButton variant="text">
                      <Icon>add_circle</Icon>&nbsp;Add
                    </MDButton>
                  </Link>
                </Grid>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AcceptRequest;
