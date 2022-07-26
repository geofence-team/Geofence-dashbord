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

const columns = [
  { Header: "title", accessor: "title", width: "45%", align: "left" },
  { Header: "description", accessor: "description", align: "left" },
  { Header: "coordinates", accessor: "coordinates", align: "left" },
  { Header: "actions", accessor: "actions", align: "center" },
];

function MyGeofences() {
    
  const [rows, setRows] = useState([]);
  const ctx = useContext(AuthContext);
  const [serverResponse, setServerResponse] = useState(" ");
  const [snackBarType, setSnackBarType] = useState("success");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const closeSnackBar = () => setOpenSnackBar(false);

  const deactivateGeofence = (id) => {
	if (window.confirm('Are you sure you want to deactivate Geofence'))
     fetch(`${process.env.REACT_APP_API_URL}/admin/deactivateGeofence/${id}`, {
      method: "PATCH",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ctx.token,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setServerResponse(result.message.join(" "));
        if (result.success) {
          setSnackBarType("success");
        } else {
          setSnackBarType("error");
        }
        setOpenSnackBar(true);
      })
      .catch((error) => error);
  };

  const activateGeofence = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/admin/activateGeofence/${id}`, {
      method: "PATCH",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ctx.token,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setServerResponse(result.message.join(" "));
        if (result.success) {
          setSnackBarType("success");
        } else {
          setSnackBarType("error");
        }
        setOpenSnackBar(true);
      })
      .catch((error) => error);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/geofences`, {
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
                title: <>{geofence.title}</>,
                description: <>{geofence.description}</>,
                coordinates: <>{geofence.coordinates}</>,
                actions: (
                  <>
                    <MDButton
                      variant="text"
                      color="info"
                      onClick={() => {
                        activateGeofence(geofence.id);
                      }}
                    >
                      Activate
                    </MDButton>
                    <MDButton
                      variant="text"
                      color="error"
                      onClick={() => {
                        deactivateGeofence(geofence.id);
                      }}
                    >
                      Deactivate
                    </MDButton>
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

export default MyGeofences;
