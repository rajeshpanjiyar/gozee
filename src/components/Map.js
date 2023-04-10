import React from "react";
import mark from "../images/icons/gps.png";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
;
const Map = () => {
  const [viewport, setViewport] = React.useState({
    latitude: 22.2512,
    longitude: 84.9063,
    width: "100vw",
    height: "80vh",
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
        mapboxApiAccessToken= "pk.eyJ1IjoibnVtYW5hbmVlcyIsImEiOiJja3kwMWExZmcwYTBuMnFxZGMwc2VtNngzIn0.AdcyN5u-Ab22UUFSYcaz8g"
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle={"mapbox://styles/numananees/cky01qc5u382o14l5u46kvve1"}
      >
        <Marker latitude={22.2512} longitude={84.9063}>
          <div className="marker">
            <a
              href="https://www.google.com/maps/place/National+Institute+of+Technology,+Rourkela/@22.2530706,84.8987868,17z/data=!3m1!4b1!4m6!3m5!1s0x3a201f72bbd561c3:0xab5c70e76a7b5a!8m2!3d22.2530656!4d84.9009808!16zL20vMGNnM2xr"
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
