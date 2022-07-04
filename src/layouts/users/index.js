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

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

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

  // const deactivate = (id) => {
  //   fetch(`${process.env.REACT_APP_API_URL}/admin/changeStatus/${id}`, {
  //     method: "PATCH",
  //     body: JSON.stringify(),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + ctx.token,
  //     },
  //   });
  //   setCounter(++counter)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setServerResponse(result.message.join(" "));
  //       if (result.success) {
  //         setSnackBarType("success");
  //       } else {
  //         setSnackBarType("error");
  //       }
  //       setOpenSnackBar(true);
  //     })
  //     .catch((error) => error);
  // };

  ////////////////

  const deactivate = async (id) => {
    const data = await axios({
      url: `${process.env.REACT_APP_API_URL}/admin/changeStatus/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ctx.token,
      },
      data: JSON.stringify(),
      method: "PATCH",
    });

    setIsAccept(data);
    setCounter(++counter);
    console.log(counter, "counterrrrrrrrrrr");

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
            console.log(st, "stjjjjjjjjjjjjjjjjjjjjjj");
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
                    Users Table
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
