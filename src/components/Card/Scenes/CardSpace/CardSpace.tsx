import { Button, Typography } from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import GpsFixed from "@material-ui/icons/GpsFixed";
import PersonPin from "@material-ui/icons/PersonPin";
import React from "react";
import { Card } from "../../";
import space from "../../../../assests/space.svg";
import { ISpace, spaceType, userCategory } from "../../../../types";
import { IActionsTrigger } from "../../Card";

interface ICardSpaceOwnProps {
  space: ISpace;
}

const CardSpace: React.FunctionComponent<ICardSpaceOwnProps> = props => {
  const {
    uuid,
    location,
    description,
    isVisible,
    type,
    size,
    owner
  } = props.space;
  const user = {
    category: userCategory.space,
    isVisible,
    location,
    primary: spaceType[type],
    uuid
  };
  // TODO: Translation
  const email = {
    body:
      (process.env.REACT_APP_HAPPYCULTEUR_EMAIL_BODY &&
        process.env.REACT_APP_HAPPYCULTEUR_EMAIL_BODY.replace(
          "{{uuid}}",
          user.uuid
        ).replace(
          "{{location}}",
          `${user.location[0]} - ${user.location[1]}`
        )) ||
      "",
    subject:
      (process.env.REACT_APP_HAPPYCULTEUR_EMAIL_SUBJECT &&
        process.env.REACT_APP_HAPPYCULTEUR_EMAIL_SUBJECT.replace(
          "{{primary}}",
          `${user.primary} of ${owner.name}`
        ).replace("{{category}}", userCategory[user.category])) ||
      "",
    to: process.env.REACT_APP_HAPPYCULTEUR_EMAIL || ""
  };

  // TODO: Translation
  const renderContent = (className: string) => (
    <div className={className}>
      <Typography variant="subtitle1">Size : {size}</Typography>
      <Typography variant="subtitle1">Description : {description}</Typography>
    </div>
  );
  const renderActions = (className: string, trigger: IActionsTrigger) => (
    <>
      <Button
        className={className}
        onClick={trigger.focusMapOnLocation(location)}
      >
        <GpsFixed />
      </Button>
      <Button
        className={className}
        onClick={trigger.focusMapOnLocation(owner.location)}
      >
        <PersonPin />
      </Button>
      <Button
        className={className}
        onClick={trigger.sendEmail(email.to, email.subject, email.body)}
      >
        <Email />
      </Button>
    </>
  );

  return (
    <Card avatar={space} user={user} actions={renderActions}>
      {className => renderContent(className)}
    </Card>
  );
};

export default CardSpace;
