import { makeStyles } from "@material-ui/styles";
import { RouteComponentProps } from "@reach/router";
import classnames from "classnames";
import { GeoJsonObject } from "geojson";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { toast } from "react-toastify";
import { defaultTheme } from "../../configuration/materialUi";
import { UserContext } from "../../context/UserContext";
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
    [userCategory.beekeeper]: defaultTheme.palette.secondary.main,
    [userCategory.space]: defaultTheme.palette.primary.dark
  };
  const [map, setMap] = React.useState();
  const classes = useStyles();
  const userContextValue = React.useContext(UserContext);

  React.useEffect(() => {
    drawMap();
  }, []);
  React.useEffect(() => {
    if (userContextValue.userElements.length > 0 && map) {
      drawCircle(userContextValue.userElements);
    }
  }, [map, userContextValue.userElements]);

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
      // Bound map to defined area
      baseMap.setMaxBounds(baseMap.getBounds());

      setMap(baseMap);
    } catch (error) {
      toast.error(error);
    }
  };

  const drawCircle = (elements: userType[]) => {
    elements.forEach((element: userType) => {
      const color = colors[element.category];
      L.circle([element.location[0], element.location[1]], {
        color,
        fillColor: color,
        fillOpacity: 0.5,
        radius: 50
      }).addTo(map);
    });
  };

  return (
    <div className={classnames(classes.Map, props.className)}>
      <div id="mymap" className={classes.mapContainer} />
    </div>
  );
};

export default React.memo(Map);
