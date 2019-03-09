import { makeStyles } from "@material-ui/styles";
import { RouteComponentProps } from "@reach/router";
import classnames from "classnames";
import { GeoJsonObject } from "geojson";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { toast } from "react-toastify";
import boundaries from "./boundaries.json";

const useStyles = makeStyles({
  Map: {
    gridArea: "Map",
    height: "100%",
    padding: "6px 0"
  },
  mapContainer: {
    height: "100%"
  }
});

interface IMapOwnProps {
  className?: string;
}

const Map: React.FunctionComponent<
  IMapOwnProps & RouteComponentProps
> = props => {
  const classes = useStyles();
  const drawMap = async () => {
    try {
      const osmURL = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
      const attribution =
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

      // Create map
      const map = L.map("mymap", {
        center: [48.858, 2.351499],
        layers: [
          L.tileLayer(osmURL, {
            attribution
          })
        ],
        zoom: 13
      });

      // Add GeoJson boundaries
      L.geoJSON(boundaries as GeoJsonObject).addTo(map);
      // Bound map to defined area
      map.setMaxBounds(map.getBounds());
    } catch (error) {
      toast.error(error);
    }
  };

  React.useEffect(() => {
    drawMap();
  }, []);

  return (
    <div className={classnames(classes.Map, props.className)}>
      <div id="mymap" className={classes.mapContainer} />
    </div>
  );
};

export default Map;
