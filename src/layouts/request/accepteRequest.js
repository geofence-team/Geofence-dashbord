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

import { AuthContext } from "context/AuthContext";
import { useRequest } from "lib/hooks/useRequest";
import { Link } from "react-router-dom";
import axios from "axios";

const columns = [
  { Header: "name", accessor: "name", width: "25%", align: "center" },
  { Header: "goefence", accessor: "goefence", width: "25%", align: "center" },
  { Header: "status", accessor: "status", width: "25%", align: "center" },
  { Header: "actions", accessor: "actions", width: "25%", align: "center" },
];

function AcceptRequest() {
  const [rows, setRows] = useState([]);
  const ctx = useContext(AuthContext);

  const [request, setRequest] = useState([]);

  const [isActive, setIsActive] = useState();
  const [accept, setIsAccept] = useState([]);

  let [counter, setCounter] = useState(0);

  ///////////////////

  const fetchAllRequests = async () => {
    const data = await axios({
      url: `${process.env.REACT_APP_API_URL}/request`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ctx.token,
      },
      method: "GET",
    });
    setRequest(data);

    return data;
  };

  const updateStatus = async (isAccepted, userId, geofenceId) => {
    const data = await axios({
      url: `${process.env.REACT_APP_API_URL}/request/acceptRequest`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ctx.token,
      },
      data: {
        isAccepted: !isAccepted,
        userId: userId,
        geofenceId: geofenceId,
      },
      method: "PUT",
    });

    setIsAccept(data);
    setCounter(++counter);

    return data;
  };

  useEffect(() => {
    fetchAllRequests();
  }, [counter]);

  useEffect(() => {
    setRows(
      request?.data?.result
        ? request?.data?.result?.map((st, i) => {
            // console.log(st.id, "idddddddddddddddddddd");
            console.log(st, "statussssssssssss");
            return {
              name: <div>{st?.User?.name}</div>,
              goefence: <div>{st?.Geofence?.title}</div>,
              status: (
                <div>
                  {st.isAccepted ? <h4>accpeted</h4> : <h4>no accpeted</h4>}
                </div>
              ),
              actions: (
                <MDButton
                  key={st.id}
                  variant="contained"
                  color={st.isAccepted ? "error" : "success"}
                  onClick={() => {
                    updateStatus(st.isAccepted, st.userId, st.geofenceId);
                  }}
                >
                  {!st.isAccepted ? <h4>Accept</h4> : <h4>Deny</h4>}
                </MDButton>
              ),
            };
          })
        : []
    );
  }, [request]);
  console.log(rows);

  //////////////////

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
                    Users Table
                  </MDTypography>
                  <Link to="/admins/add">
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
