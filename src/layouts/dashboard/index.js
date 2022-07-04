/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
//tomtom
import React from "react";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { useState, useEffect, useRef } from "react";
import "./style.css";
import * as tt from "@tomtom-international/web-sdk-maps";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [map, setMap] = useState();
  const mapContainer = useRef();
  const Aljaleyah = { lon: 28.7567138671875, lat: 41.062009478169955 };
  const Avceler = { lon: 28.7567138671875, lat: 41.062009478169955 };

  // { lon: 28.7567138671875, lat: 41.062009478169955 },
  // { lon: 28.7567138671875, lat: 41.062009478169955 },

  //{ lon: 28.7567138671875, lat: 41.062009478169955 };
  // 28.7567138671875,
  //               41.062009478169955

  useEffect(() => {
    let map = tt.map({
      key: "McTEXlkiGaZIuMnnDAiqJo5NtvSNOzs2",
      container: mapContainer.current.id,
      center: Aljaleyah,
      zoom: 15,
      language: "en-GB",
    });
    // let map1 = tt.map({
    //   key: "McTEXlkiGaZIuMnnDAiqJo5NtvSNOzs2",
    //   container: mapContainer.current.id,
    //   center: Avceler,
    //   zoom: 15,
    //   language: "en-GB",
    // });

    map.addControl(new tt.GeolocateControl());
    // map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());

    map.on("load", () => {
      fetch(
        "https://api.tomtom.com/geofencing/1/fences/24ca72d6-db94-4cc3-b9b2-67346dd87fe3?key=McTEXlkiGaZIuMnnDAiqJo5NtvSNOzs2"
      )
        .then((response) => response.json())
        .then((result) => {
          map.addLayer({
            id: "Fence ",
            type: "fill",
            source: {
              type: "geojson",
              data: result,
            },
            paint: {
              "fill-color": "purple",
              "fill-opacity": 0.6,
            },
          });
        });
    });

    // map1.on("load", () => {
    //   fetch(
    //     "https://api.tomtom.com/geofencing/1/fences/24ca72d6-db94-4cc3-b9b2-67346dd87fe3?key=McTEXlkiGaZIuMnnDAiqJo5NtvSNOzs2"
    //   )
    //     .then((response) => response.json())
    //     .then((result) => {
    //       map1.addLayer({
    //         id: "Fence ",
    //         type: "fill",
    //         source: {
    //           type: "geojson",
    //           data: result,
    //         },
    //         paint: {
    //           "fill-color": "purple",
    //           "fill-opacity": 0.6,
    //         },
    //       });
    //     });
    // });

    setMap(map);
    return () => {
      map.remove();
    };
    //eslint-disable-next-line
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="container">
        <div ref={mapContainer} className="map" id="map" />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
