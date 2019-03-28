import { Button, Typography } from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import GpsFixed from "@material-ui/icons/GpsFixed";
import React from "react";
import { Card } from "../../";
import beekeeper from "../../../../assests/beekeeper.svg";
import { IBeekeeper, userCategory, userLevel } from "../../../../types";
import { IActionsTrigger } from "../../Card";

interface ICardBeekeeperOwnProps {
  beekeeper: IBeekeeper;
}

const CardBeekeeper: React.FunctionComponent<
  ICardBeekeeperOwnProps
> = props => {
  const {
    uuid,
    primary,
    location,
    interests,
    seniority,
    training: { isPartner, isBilled, targets }
  } = props.beekeeper;
  const user = {
    category: userCategory.beekeeper,
    interests,
    location,
    primary,
    uuid
  };
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
          user.primary
        ).replace("{{category}}", user.category)) ||
      "",
    to: process.env.REACT_APP_HAPPYCULTEUR_EMAIL || ""
  };

  const renderContent = (className: string) => (
    <div className={className}>
      <Typography variant="subtitle1">Since: {seniority} years</Typography>
      <Typography variant="subtitle1">Training</Typography>
      <ul>
        <li>
          <Typography variant="subtitle2">
            Billed: {isBilled.toString()}
          </Typography>
        </li>
        <li>
          <Typography variant="subtitle2">
            Public:{" "}
            {targets.map(
              (target, index) =>
                `${userLevel[target.toString()]}${
                  index < targets.length - 1 ? ", " : "."
                }`
            )}
          </Typography>
        </li>
      </ul>
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
        onClick={trigger.sendEmail(email.to, email.subject, email.body)}
      >
        <Email />
      </Button>
    </>
  );

  return (
    <Card
      user={user}
      avatar={beekeeper}
      isPartner={isPartner}
      actions={renderActions}
    >
      {className => renderContent(className)}
    </Card>
  );
};

export default CardBeekeeper;
