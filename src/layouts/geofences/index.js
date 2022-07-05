import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState, useContext, useDeferredValue } from "react";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";
import { AuthContext } from "context/AuthContext";
import axios from "axios";

const columns = [
  { Header: "title", accessor: "title", align: "center" },
  { Header: "description", accessor: "description", align: "center" },
  { Header: "status", accessor: "status", align: "center" },

];
function Geofences() {
  const [rows, setRows] = useState([]);
  const ctx = useContext(AuthContext);
  const [serverResponse, setServerResponse] = useState(" ");
  const [snackBarType, setSnackBarType] = useState("success");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const closeSnackBar = () => setOpenSnackBar(false);
  const [geo, setGeo] = useState([]);

  const fetchAllGeo = async () => {
    const data = await axios({
      url: `${process.env.REACT_APP_API_URL}/geofences/allgeosadmin`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ctx.token,
      },
      method: "GET",
    });

    setGeo(data);

    return data;
  };
  useEffect(() => {
    fetchAllGeo();
  }, []);

  useEffect(() => {
    setRows(
      geo?.data?.result
        ? geo?.data?.result?.map((st, i) => {
            // console.log(st.id, "idddddddddddddddddddd");
            console.log(st, "statussssssssssss");
            return {
              title: <div>{st?.title}</div>,
              description: <div>{st?.description}</div>,
              status: (
                <MDTypography
                  variant="h6"
                  color={!st?.isActive ? "success" : "error"}
                >
                  {!st?.isActive ? <h4>active</h4> : <h4>not active</h4>}
                </MDTypography>
              ),
              // coordinates: <div>{st?.coordinates}</div>,
            };
          })
        : []
    );
  }, [geo]);

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
export default Geofences;
