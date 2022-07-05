import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState, useContext } from "react";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import { AuthContext } from "context/AuthContext";
import { Link } from "react-router-dom";
import MDSnackbar from "components/MDSnackbar";
import * as React from "react";
import axios from "axios";

const columns = [
  { Header: "name", accessor: "name", align: "left" },
  { Header: "username", accessor: "username", align: "center" },
  { Header: "email", accessor: "email", align: "center" },
  { Header: "role", accessor: "role", align: "center" },
  { Header: "status", accessor: "status", align: "center" },
  { Header: "actions", accessor: "actions", align: "center" },
];

//////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////

function Users() {
  const [rows, setRows] = useState([]);
  const ctx = useContext(AuthContext);
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [serverResponse, setServerResponse] = useState(" ");
  const [snackBarType, setSnackBarType] = useState("success");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const closeSnackBar = () => setOpenSnackBar(false);
  const [Status, setStatus] = useState(true);
  let [counter, setCounter] = useState(0);
  const [users, setUsers] = useState([]);
  const [accept, setIsAccept] = useState([]);

  const fetchAllUsers = async () => {
    const data = await axios({
      url: `${process.env.REACT_APP_API_URL}/admin/getusers`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ctx.token,
      },
      method: "GET",
    });
    setUsers(data);

    return data;
  };

  const deactivate = async (id) => {
    const data = await axios({
      url: `${process.env.REACT_APP_API_URL}/admin/deactivate/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ctx.token,
      },
      data: JSON.stringify(),
      method: "PATCH",
    });

    setIsAccept(data);
    setCounter(++counter);

    return data;
  };

  /////////////////

  useEffect(() => {
    fetchAllUsers();
  }, [counter]);

  useEffect(() => {
    setRows(
      users?.data?.result
        ? users?.data?.result?.map((st, i) => {
            return {
              name: <div>{st?.name}</div>,
              username: <div>{st?.username}</div>,
              email: <div>{st?.email}</div>,
              role: <div>{st?.roleId}</div>,
              status: (
                <div>{st?.isActive ? <h4>active</h4> : <h4>inActive</h4>}</div>
              ),
              actions: (
                <MDButton
                  key={st.id}
                  variant="contained"
                  color={st.isActive ? "error" : "success"}
                  onClick={() => {
                    deactivate(st.id);
                  }}
                >
                  {!st.isActive ? <h4>Activate</h4> : <h4>deactivate</h4>}
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
                    Signup Acti Table
                  </MDTypography>
                  <Link to="/users/add">
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
      <MDSnackbar
        color={snackBarType}
        icon={snackBarType == "success" ? "check" : "warning"}
        title="User deleted"
        content={serverResponse}
        open={openSnackBar}
        onClose={closeSnackBar}
        close={closeSnackBar}
        dateTime=""
        bgWhite
      />
    </DashboardLayout>
  );
}

export default Users;