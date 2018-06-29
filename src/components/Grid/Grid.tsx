import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import ListSubheader from "@material-ui/core/ListSubheader";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import * as React from "react";
import { format } from "./format";
import { IUserDetails } from "./types";

const styles = (theme: Theme) =>
  createStyles({
    categorie: {
      height: "auto"
    },
    gridList: {
      height: 450,
      width: 500
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)"
    },
    root: {
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden"
    }
  });

interface IGridOwnProps {
  data: IUserDetails[];
}

interface IGridProps extends WithStyles<typeof styles>, IGridOwnProps {}

export const Grid: React.SFC<IGridProps> = props => {
  const { classes, data } = props;
  const formattedData = format(data);

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        {formattedData.map(categorie => {
          return (
            <GridListTile
              key={categorie.uuid}
              cols={3}
              className={classes.categorie}
            >
              <ListSubheader component="div">categorie.name</ListSubheader>
            </GridListTile>
          );
          {
            categorie.data.map(user => {
              return (
                <GridListTile key={user.uuid}>
                  <img src="" alt="" />
                  <GridListTileBar
                    title={`${user.name} ${user.surname}`}
                    subtitle={<span>by: {user.address}</span>}
                    actionIcon={
                      <IconButton className={classes.icon}>
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              );
            });
          }
        })}
      </GridList>
    </div>
  );
};

const GridWithStyles = withStyles(styles)(Grid);

export default GridWithStyles;
