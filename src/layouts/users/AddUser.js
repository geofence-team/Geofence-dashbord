import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";

import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import { useRef, useState, useEffect } from "react";
import { useRequest } from "lib/hooks/useRequest";

function AddUser() {
    const [users, setUsers] = useState(null)
    const sendRequest = useRequest()

    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const passwordConfirmationRef = useRef(null)


    useEffect(()=> {
        fetch(process.env.REACT_APP_API_URL)
        .then(res => res.json)
        .then(json => {
            console.log(json);
            setUsers(json)
        })
    }, [])

    const AddUser = () => {
        const name = nameRef.current.querySelector('input[type=text]').value
        const email = emailRef.current.querySelector('input[type=email]').value
        const password = passwordRef.current.querySelector('input[type=password]').value
        const password_confirmation = passwordConfirmationRef.current.querySelector('input[type=password]').value


        sendRequest(`${process.env.REACT_APP_API_URL}users`, {}, {
            name,
            email,
            password,
            password_confirmation
        }, {
            auth: true,
            type: 'json',
            snackbar: true,
            redirect: '/Users'
        }, 'post')
    }



    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox pt={4} pb={3} px={3}>
                                <MDBox component="form" role="form">
                                    <MDBox mb={2}>
                                        <MDInput ref={nameRef} type="text" label="Name" variant="standard" fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput ref={emailRef} type="email" label="Email" variant="standard" fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput ref={passwordRef} type="password" label="Password" variant="standard" fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput ref={passwordConfirmationRef} type="password" label="Password Confirmation" variant="standard" fullWidth />
                                    </MDBox>

                                    <MDBox mt={4} mb={1}>
                                        <MDButton variant="gradient" color="info" fullWidth onClick={AddUser}>
                                            add User
                                        </MDButton>
                                    </MDBox>
                                </MDBox>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    )
}

export default AddUser;