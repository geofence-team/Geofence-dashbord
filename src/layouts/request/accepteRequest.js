
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
  const [requests, setRequests] = useState([]);

  const Approve = (isAccepted , userId , geofenceId) => {
       fetch(`${process.env.REACT_APP_API_URL}/requests/approve`, {
        method: "PUT",
        body: JSON.stringify(
          {
            isAccepted : !isAccepted , 
            geofenceId : geofenceId,
            userId : userId
          }
        ),
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
              console.log(geofence, "hjgjhghjaghgjf")
              return {
                title: <>{geofence.Geofence.title}</>,
                userName: <>{geofence.User.name}</>,
                role:<>{geofence.User.roleId}</>,
                actions: (
                  <MDButton
                  key={geofence.id}
                  variant="contained"
                  color={geofence.isActive ? "error" : "success"}
                  onClick={() => {
                    Approve(geofence.isAccepted , geofence.userId , geofence.geofenceId);
                  }}
                >
                  {!geofence.isActive ? <h4>Accept</h4> : <h4>Decline</h4>}
                </MDButton>
                
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
  }, [setRequests]);

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

