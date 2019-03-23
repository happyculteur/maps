import { Button, Typography } from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import GpsFixed from "@material-ui/icons/GpsFixed";
import React from "react";
import { Card } from "../../";
import space from "../../../../assests/space.svg";
import { UserContext } from "../../../../context/UserContext";
import { ISpace, spaceType, userCategory } from "../../../../types";

interface ICardSpaceOwnProps {
  space: ISpace;
}

const CardSpace: React.FunctionComponent<ICardSpaceOwnProps> = props => {
  const { uuid, location, description, type, size } = props.space;
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
      <Button className={className} onClick={onClickGps}>
        <GpsFixed />
      </Button>
      <Button className={className}>
        <Email />
      </Button>
    </>
  );

  const onClickGps: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void = event => {
    setFocus(location);
  };

  return (
    <Card avatar={space} user={user} actions={renderActions}>
      {className => renderContent(className)}
    </Card>
  );
};

export default CardSpace;
