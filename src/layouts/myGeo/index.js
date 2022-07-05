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
  { Header: "description", accessor: "description", align: "center" },
  { Header: "coordinates", accessor: "coordinates", align: "center" },
  { Header: "status", accessor: "status", align: "center" },
  { Header: "actions", accessor: "actions", align: "center" },
];

function MyGeofences() {
  const [rows, setRows] = useState([]);
  const ctx = useContext(AuthContext);
  const [serverResponse, setServerResponse] = useState(" ");
  const [snackBarType, setSnackBarType] = useState("success");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const closeSnackBar = () => setOpenSnackBar(false);

  const [users, setUsers] = useState([]);

  const [isActive, setIsActive] = useState([]);
  let [counter, setCounter] = useState(0);


  const fetchAllGeo = async () => {
    const data = await axios({
      url: `${process.env.REACT_APP_API_URL}/geofences`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ctx.token,
      },
      method: "GET",
    });
    setUsers(data);

    return data;
  };

  const updageGeo = async (id, isActive) => {
    const data = await axios({
      url: `${process.env.REACT_APP_API_URL}/geofences`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ctx.token,
      },
      data: {
        isActive: !isActive,
        id: id,
      },
      method: "PUT",
    });

    setIsActive(data);
    setCounter(++counter);
    console.log(counter, "counterrrrrrrrrrr");

    return data;
  };

  useEffect(() => {
    fetchAllGeo();
  }, [counter]);

  useEffect(() => {
    setRows(
      users?.data?.result
        ? users?.data?.result?.map((st, i) => {
            return {
              title: <div>{st?.title}</div>,
              description: <div>{st?.description}</div>,
              coordinates: <div>{st?.coordinates}</div>,
              status: (
                <div>{st?.isActive ? <h4>active</h4> : <h4>inActive</h4>}</div>
              ),
              actions: (
                <MDButton
                  key={st.id}
                  variant="contained"
                  color={st.isActive ? "error" : "success"}
                  onClick={() => {
                    updageGeo(st.id, st.isActive);
                  }}
                >
                  {st.isActive ? <h4>DeActivate</h4> : <h4>Activate</h4>}
                </MDButton>
              ),
            };
          })
        : []
    );
  }, [users]);
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
