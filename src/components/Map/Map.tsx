import { makeStyles } from "@material-ui/styles";
import { RouteComponentProps } from "@reach/router";
import classnames from "classnames";
import { GeoJsonObject } from "geojson";
import L, { LeafletEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { defaultTheme } from "../../configuration/materialUi";
import { UsersContext } from "../../context/UsersContext";
import { userCategory, userType } from "../../types";
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
  const colors = {
    [userCategory.individual]: defaultTheme.palette.primary.main,
    [userCategory.beekeeper]: defaultTheme.palette.secondary.light,
    [userCategory.space]: defaultTheme.palette.secondary.dark
  };
  const [map, setMap] = useState();
  const classes = useStyles();
  const { userElements, focus, setFocus } = React.useContext(UsersContext);

  useEffect(() => {
    drawMap();
  }, []);
  useEffect(() => {
    if (userElements.length && map) {
      userElements.forEach(drawCircle);
    }
  }, [map, userElements]);
  useEffect(() => {
    if (focus.length && map) {
      map.setView(focus, 15);
    }
  }, [map, focus]);

  const drawMap = () => {
    try {
      const osmURL = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
      const attribution =
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

      // Create map
      const baseMap = L.map("mymap", {
        center: [48.858, 2.351499],
        layers: [
          L.tileLayer(osmURL, {
            attribution
          })
        ],
        zoom: 13
      });

      // Add GeoJson boundaries
      L.geoJSON(boundaries as GeoJsonObject).addTo(baseMap);

      setMap(baseMap);
    } catch (error) {
      toast.error(error);
    }
  };
  const drawCircle = (element: userType) => {
    const color = colors[element.category];
    L.circle([element.location[0], element.location[1]], {
      color,
      fillColor: color,
      fillOpacity: 0.5,
      radius: 100
    })
      .addTo(map)
      .on("click", onClickCircle);
  };

  const onClickCircle: (event: LeafletEvent) => void = event => {
    const { lat, lng } = event.target._latlng;
    setFocus([lat, lng]);
  };

  return (
    <div className={classnames(classes.Map, props.className)}>
      <div id="mymap" className={classes.mapContainer} />
    </div>
  );
};

export default React.memo(Map);
