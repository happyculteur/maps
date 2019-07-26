import { makeStyles } from "@material-ui/styles";
import { RouteComponentProps } from "@reach/router";
import classnames from "classnames";
import { GeoJsonObject } from "geojson";
import L, { LeafletEvent, Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UsersContext } from "../../context/UsersContext";
import { userType } from "../../types";
import boundaries from "./boundaries.json";
import { IColors } from "./types";
import { colors } from "./utils";

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
  const [map, setMap] = useState<LeafletMap>();
  const classes = useStyles();
  const { userElements, focus, setFocus } = React.useContext(UsersContext);

  const drawMap = useCallback(() => {
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
  }, []);
  const onClickCircle = useCallback(
    (event: LeafletEvent) => {
      const { lat, lng } = event.target._latlng;
      setFocus([lat, lng]);
    },
    [setFocus]
  );
  const drawCircle = useCallback(
    (element: userType, mapToDrawOn: LeafletMap, selectedColors: IColors) => {
      const color = selectedColors[element.category];
      L.circle([element.location[0], element.location[1]], {
        color,
        fillColor: color,
        fillOpacity: 0.5,
        radius: 100
      })
        .addTo(mapToDrawOn)
        .on("click", onClickCircle);

      // TODO: Bug type do not let us remove the deps array, but eslint is angry about it being empty
      // eslint-disable-next-line
    },
    [onClickCircle]
  );

  useEffect(() => {
    drawMap();
  }, [drawMap]);
  useEffect(() => {
    if (userElements.length && map) {
      userElements.forEach(userElement => drawCircle(userElement, map, colors));
    }
  }, [map, userElements, drawCircle]);
  useEffect(() => {
    if (focus[0] !== -1 && focus[1] !== -1 && map) {
      map.setView(focus, 15);
    }
  }, [map, focus]);

  return (
    <div className={classnames(classes.Map, props.className)}>
      <div id="mymap" className={classes.mapContainer} />
    </div>
  );
};

export default React.memo(Map);
