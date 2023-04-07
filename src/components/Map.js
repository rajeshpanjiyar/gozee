import React from "react";
import mark from "../images/icons/gps.png";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import mapboxgl from "!mapbox-gl";
// import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";

// mapboxgl.workerClass = MapboxWorker;
const Map = () => {
  const [viewport, setViewport] = React.useState({
    latitude: 22.2512,
    longitude: 84.9063,
    // width: "100vw",
    // height: "80vh",
    zoom: 14,
  });
  return (
    <div>
      <h2
        style={{
          color: "black",
          marginBottom: "5rem",
          display: "block",
          fontWeight: "700",
        }}
      >
        OUR <span style={{ color: "#c2a3fd" }}>LOCATION</span>
      </h2>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibnVtYW5hbmVlcyIsImEiOiJja3kwMWExZmcwYTBuMnFxZGMwc2VtNngzIn0.AdcyN5u-Ab22UUFSYcaz8g"
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle={"mapbox://styles/numananees/cky01qc5u382o14l5u46kvve1"}
      >
        <Marker latitude={22.2512} longitude={84.9063}>
          <div className="marker">
            <a
              href="https://www.google.com/maps/place/Abrar+Center+wahdat+road+Muslim+town+lahore/@31.5192115,74.317498,17z/data=!4m5!3m4!1s0x391905d80a35cfb3:0x5e6fb4fe9f3d7055!8m2!3d31.5192555!4d74.3192881"
              target="_blank"
            >
              <img
                src={mark}
                alt="Our Location"
                style={{ height: "50px", width: "48px" }}
              />
            </a>
          </div>
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default Map;
