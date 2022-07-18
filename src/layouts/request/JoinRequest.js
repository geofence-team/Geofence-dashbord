import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState, useContext } from "react";
import MDButton from "components/MDButton";
import { AuthContext } from "context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const columns = [
  { Header: "name", accessor: "name", width: "25%", align: "center" },
  { Header: "goefence", accessor: "goefence", width: "25%", align: "center" },
  { Header: "status", accessor: "status", width: "25%", align: "center" },
  { Header: "actions", accessor: "actions", width: "25%", align: "center" },
];

function JoinRequest() {
  const [rows, setRows] = useState([]);
  const ctx = useContext(AuthContext);

  const [request, setRequest] = useState([]);

  const [isActive, setIsActive] = useState();
  const [accept, setIsAccept] = useState([]);

  let [counter, setCounter] = useState(0);

  //   ///////////////////

  const fetchAllRequests = async () => {
    const data = await axios({
      url: `${process.env.REACT_APP_API_URL}/requests/getRequestedUsers`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ctx.token,
      },
      method: "GET",
    });
    setRequest(data);

    return data;
  };

  const updateStatus = async (id, userId) => {
    const data = await axios({
      url: `${process.env.REACT_APP_API_URL}/requests/approve/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ctx.token,
      },
      data: {
        id,
        userId
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
            return {
              name: <div>{st?.User?.name}</div>,
              goefence: <div>{st?.Geofence?.title}</div>,
              status: (
                <div>
                  {st.isAccepted ? <h4>Allowed to join</h4> : <h4>not Allowed to join </h4>}
                </div>
              ),
              actions: (
                <MDButton
                  key={st.id}
                  variant="contained"
                  color={st.isAccepted ? "error" : "success"}
                  onClick={() => {
                    updateStatus(st.id , st.userId);
                  }}
                >
                  {!st.isAccepted ? <h4>Allow</h4> : <h4>Don't Allow</h4>}
                </MDButton>
              ),
            };
          })
        : []
    );
  }, [request]);

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
                  Join Request Table
                  </MDTypography>
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

export default JoinRequest;
