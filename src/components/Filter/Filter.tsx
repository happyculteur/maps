import { Avatar, Paper, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import beekeeperIcon from "../../assests/beekeeper.svg";
import individualIcon from "../../assests/individual.svg";
import spaceIcon from "../../assests/space.svg";
import { UsersContext } from "../../context/UsersContext";

const useStyles = makeStyles(theme => ({
  Filter: {
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    justifyContent: "space-around",
    zIndex: 2
  },
  Switch: {
    display: "flex"
  }
}));

const Filter: React.FunctionComponent = () => {
  const i18n = useTranslation();
  const classes = useStyles();
  const { setFilter } = React.useContext(UsersContext);
  const [beekeeper, setBeekeeperFilter] = useState(true);
  const [individual, setIndividualFilter] = useState(true);
  const [space, setSpaceFilter] = useState(true);
  const filterSetter = {
    beekeeper: setBeekeeperFilter,
    individual: setIndividualFilter,
    space: setSpaceFilter
  };

  useEffect(() => {
    setFilter({ beekeeper, individual, space });
  }, [beekeeper, individual, space]);

  const toggleSwitch: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void = (event, checked) => {
    const { name } = event.currentTarget;

    filterSetter[name](checked);
  };

  return (
    <Paper className={classes.Filter}>
      <div className={classes.Switch}>
        <Avatar alt={i18n.t("Beekeeper")} src={beekeeperIcon} />
        <Switch
          checked={beekeeper}
          name="beekeeper"
          onChange={toggleSwitch}
          value={beekeeper}
        />
      </div>
      <div className={classes.Switch}>
        <Avatar alt={i18n.t("Individual")} src={individualIcon} />
        <Switch
          checked={individual}
          name="individual"
          onChange={toggleSwitch}
          value={individual}
        />
      </div>
      <div className={classes.Switch}>
        <Avatar alt={i18n.t("Space")} src={spaceIcon} />
        <Switch
          checked={space}
          name="space"
          onChange={toggleSwitch}
          value={space}
        />
      </div>
    </Paper>
  );
};

export default React.memo(Filter);
