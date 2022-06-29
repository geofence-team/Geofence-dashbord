
///////////////////////////////////////////////////////////////////////////////////////////

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState, useContext } from "react";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import { AuthContext } from "context/AuthContext";
import { Link } from "react-router-dom";
import MDSnackbar from "components/MDSnackbar";

const columns = [
    { Header: "name", accessor: "name", align: "left" },
    { Header: "email", accessor: "email", align: "center" },
    // { Header: "phone", accessor: "phone", align: "center" },
    // { Header: "role", accessor: "role", align: "center" },
    { Header: "actions", accessor: "actions", align: "center" },
]

function Users() {
    const [rows, setRows] = useState([]);
    const ctx = useContext(AuthContext);

    const [serverResponse, setServerResponse] = useState(" ");
    const [snackBarType, setSnackBarType] = useState("success");
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const closeSnackBar = () => setOpenSnackBar(false);

    const deleteUser = async (id) => {
        if (window.confirm('Are you sure')) {
            await fetch(`${process.env.REACT_APP_API_URL}/admin/deactivate/${id}`, {
                method: "PATCH",
                body: JSON.stringify(),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + ctx.token
                },
            }).then(response => response.json())
                .then(result => {
                    setServerResponse(result.message.join(' '))
                    if (result.success) {
                        setSnackBarType('success')
                    } else {
                        setSnackBarType('error')
                    }
                    setOpenSnackBar(true);
                })
                .catch((error) => error);
        }
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/admin/getusers`, {
            body: JSON.stringify(),
            headers: {
                'Authorization': 'Bearer ' + ctx.token,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            response.json().then(users => {
                console.log(users, "users")
                const getusers = users.result.map((user) => {
                    console.log(user.id, "users.id")
                    return {
                        name: <>{user.name}</>,
                        email: <>{user.email}</>,
                        //  role: <>{user.role}</>,
                            actions: <>
                            <MDButton variant="text" color="error" onClick={() => { deleteUser(user.id) }}>
                                <Icon>Deactivate / Active</Icon>&nbsp;Deactivate / Active
                            </MDButton>
                            <Link to={`/users/edit/${user.id}`}>
                                <MDButton variant="text" color="info">
                                    <Icon>edit</Icon>&nbsp;edit
                                </MDButton>
                            </Link>
                        </>,
                    }
                })
                setRows(getusers)
            })
                .catch((e) => {
                    console.log(e, "llllllll")
                })
        }).catch((e) => {
            console.log(e)
            alert("you are not Admin")
        }
        )

    }, [])

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
                                    <Link to='/users/add'>
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
                icon={snackBarType == 'success' ? 'check' : 'warning'}
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

