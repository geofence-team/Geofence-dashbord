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

import { Wrapper, Status } from "@googlemaps/react-wrapper";

function AddGeofence() {
  const titleRef = useRef(null);
  const isActiveRef = useRef(null);
  const descriptionRef = useRef(null);
  const coordinatesRef = useRef(null);

  const title = titleRef.value;
  const isActive = isActiveRef.value;
  const description = descriptionRef.value;
  const coordinates = coordinatesRef.value;

  let ctx = useContext(AuthContext);

  let [geo, setGeo] = useState();
  const createGeo = async () => {
    const data = await axios({
      url: `${process.env.REACT_APP_API_URL}/geofences`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ctx.token,
      },
      body: JSON.stringify({
        title,
        isActive,
        description,
        coordinates,
      }),
      method: "POST",
    });
    console.log(data, "dataaaaa");
    setGeo(data);

    return data;
  };

  useEffect(() => {
    createGeo();
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
                <MDTypography variant="h6" color="white">
                  Add Place
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Place Title"
                      variant="standard"
                      fullWidth
                      ref={titleRef}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Place Description"
                      variant="standard"
                      fullWidth
                      ref={isActiveRef}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      // value={latitude}
                      type="text"
                      label="Latitude"
                      variant="standard"
                      fullWidth
                      ref={descriptionRef}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      // value={longitude}
                      type="text"
                      label="longitude"
                      variant="standard"
                      fullWidth
                      ref={coordinatesRef}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Category
                        </InputLabel>
                        {/* <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={category}
                          label="Category"
                          style={{ padding: "20px 0" }}
                          onChange={handleCategoryChange}
                        >
                          {categoriesData.map((category, i) => {
                            return (
                              <MenuItem value={category.id} key={category.id}>
                                {category.title}
                              </MenuItem>
                            );
                          })}
                        </Select> */}
                      </FormControl>
                    </Box>
                  </MDBox>
                  <MDBox mb={2}>
                    {/* <MDInput
                      type="file"
                      label="Picture"
                      variant="standard"
                      fullWidth
                      ref={PlacePicRef}
                    /> */}
                  </MDBox>
                  <MDBox mb={2}>
                    {/* <Wrapper apiKey={""}>
                      <Map
                        center={{ lat: latitude, lng: longitude }}
                        setLat={setLatitude}
                        setLng={setLongitude}
                        zoom={8}
                      />
                    </Wrapper> */}
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    {/* <MDButton
                      variant="gradient"
                      color="info"
                      fullWidth
                      onClick={savePlace}
                    >
                      Save Place
                    </MDButton> */}
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* <MDSnackbar
        color={snackBarType}
        icon={snackBarType == "success" ? "check" : "warning"}
        title="Places App"
        content={serverResponse}
        open={openSnackBar}
        // onClose={closeSnackBar}
        close={closeSnackBar}
        dateTime=""
        bgWhite
      /> */}
      <Footer />
    </DashboardLayout>
  );
}
export default AddGeofence;
