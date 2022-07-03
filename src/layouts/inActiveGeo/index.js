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
import Admins from "layouts/admins";

const columns = [
  { Header: "title", accessor: "title", width: "45%", align: "left" },
  { Header: "description", accessor: "description", align: "left" },
  { Header: "actions", accessor: "actions", align: "center" },
];

function InActiveGeo() {
    
  const [rows, setRows] = useState([]);
  const ctx = useContext(AuthContext);
  const [serverResponse, setServerResponse] = useState(" ");
  const [snackBarType, setSnackBarType] = useState("success");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const closeSnackBar = () => setOpenSnackBar(false);


//   const deleteAdmin = (adminId) => {
//     if (window.confirm('Are you sure')) {
//         sendRequest(`${process.env.REACT_APP_API_URL}admins/${adminId}`, {}, {}, {
//             auth: true,
//             snackbar: true,
//         }, 'delete').then(() => {
//             const updatedRows = rows.filter(function(row) {
//                 console.log(row.id, adminId)
//                 return (row.id != adminId)
//             })
//             console.log(updatedRows)
//             setRows(updatedRows)
//         })
//     }
// }


const deleteGeo = (id) => {
  
  if (window.confirm("Are you sure you want to delete Geofence"))
    fetch(`${process.env.REACT_APP_API_URL}/geofences/delete/${id}`, {
      method: "DELETE",
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
    fetch(`${process.env.REACT_APP_API_URL}/geofences/allinactive`, {
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
            console.log(geofences, "hhhhhhhhh")
            const getGeofences = geofences.result.map((geofence) => {
              return {
                title: <>{geofence.title}</>,
                description: <>{geofence.description}</>,
                actions: (
                  <>
                   <MDButton variant="text" color="error" onClick={() => { deleteGeo(geofence.id) }}>
                    { console.log(geofence,"dmkckdfcjkw")}
                                    <Icon>delete</Icon>&nbsp;delete
                                </MDButton>
                  </>
                ),
              };
            });
            setRows(getGeofences);
          })
          .catch((e) => {});
      })
      // .catch((e) => {
      //   console.log(e);
      //   alert("you are not Admin");
      // });
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

export default InActiveGeo;
