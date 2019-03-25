import { Button, Typography } from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import GpsFixed from "@material-ui/icons/GpsFixed";
import PersonPin from "@material-ui/icons/PersonPin";
import React from "react";
import { Card } from "../../";
import space from "../../../../assests/space.svg";
import { UserContext } from "../../../../context/UserContext";
import { ISpace, spaceType, userCategory } from "../../../../types";

interface ICardSpaceOwnProps {
  space: ISpace;
}

const CardSpace: React.FunctionComponent<ICardSpaceOwnProps> = props => {
  const { uuid, location, description, type, size, owner } = props.space;
  const user = {
    category: userCategory.space,
    location,
    primary: spaceType[type.toString()],
    uuid
  };
  const { setFocus } = React.useContext(UserContext);

  const renderContent = (className: string) => (
    <div className={className}>
      <Typography variant="subtitle1">Size : {size}</Typography>
      <Typography variant="subtitle1">Description : {description}</Typography>
    </div>
  );
  const renderActions = (className: string) => (
    <>
      <Button className={className} onClick={focusMapOnLocation(location)}>
        <GpsFixed />
      </Button>
      <Button
        className={className}
        onClick={focusMapOnLocation(owner.location)}
      >
        <PersonPin />
      </Button>
      <Button className={className}>
        <Email />
      </Button>
    </>
  );

  const focusMapOnLocation: (
    locationToFocus: number[]
  ) => (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void = locationToFocus => event => {
    setFocus(locationToFocus);
  };

  return (
    <Card avatar={space} user={user} actions={renderActions}>
      {className => renderContent(className)}
    </Card>
  );
};

export default CardSpace;
