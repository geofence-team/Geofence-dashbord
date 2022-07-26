import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Box from "@mui/material/Box";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import { useEffect, useRef, useState } from "react";

import MDSnackbar from "components/MDSnackbar";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { AuthContext } from "context/AuthContext";
import { useContext } from "react";
import axios from "axios";

function Map({ center, zoom }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState();
  useEffect(() => {
    setMap(
      new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
      })
    );
  }, []);
}
function AddGeofence() {
  const [coordinates, setCoordinates] = useState([[]]);
  const GeofenceTitleRef = useRef(null);
  const GeofenceDecRef = useRef(null);
  const GeofenceCordRef = useRef(null);
  const ctx = useContext(AuthContext);
  const [serverResponse, setServerResponse] = useState(" ");
  const [snackBarType, setSnackBarType] = useState("success");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const closeSnackBar = () => setOpenSnackBar(false);

  const savePlace = () => {
    const title = GeofenceTitleRef.current.value;
    const description = GeofenceDecRef.current.value;
    const coordinates = GeofenceCordRef.current.value;
    var formdata = new FormData();
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("coordinates", coordinates);
    console.log(formdata);
    fetch(`${process.env.REACT_APP_API_URL}/geofences/`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + ctx.token,
      },
      body: formdata,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setServerResponse(result.message.join(" "));
        if (result.success) {
          setSnackBarType("success");
        } else {
          setSnackBarType("error");
        }
        setOpenSnackBar(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
                <MDTypography variant="h6" color="white">
                  Add Place
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Geofence Title"
                      name="title"
                      variant="standard"
                      fullWidth
                      ref={GeofenceTitleRef}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      name="description"
                      label="Geofence Description"
                      variant="standard"
                      fullWidth
                      ref={GeofenceDecRef}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      name="coordinates"
                      type="text"
                      label="Coordinates"
                      variant="standard"
                      fullWidth
                      ref={GeofenceCordRef}
                    />
                  </MDBox>
                  <MDBox mb={2}></MDBox>

                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      fullWidth
                      onClick={savePlace}
                    >
                      Save Place
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDSnackbar
        color={snackBarType}
        icon={snackBarType == "success" ? "check" : "warning"}
        title="Places App"
        content={serverResponse}
        open={openSnackBar}
        // onClose={closeSnackBar}
        close={closeSnackBar}
        dateTime=""
        bgWhite
      />
      <Footer />
    </DashboardLayout>
  );
}
export default AddGeofence;
