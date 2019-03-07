import { Button, Typography } from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import GpsFixed from "@material-ui/icons/GpsFixed";
import React from "react";
import { Card } from "../../";
import beekeeper from "../../../../assests/beekeeper.svg";
import { IBeekeeper, userCategory, userLevel } from "../../../../types";

interface ICardBeekeeperOwnProps {
  beekeeper: IBeekeeper;
}

const CardBeekeeper: React.FunctionComponent<
  ICardBeekeeperOwnProps
> = props => {
  const {
    uuid,
    firstname,
    location,
    interests,
    seniority,
    training: { isPartner, isBilled, targets }
  } = props.beekeeper;
  const user = {
    category: userCategory.beekeeper,
    firstname,
    interests,
    location,
    uuid
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
  const renderActions = (className: string) => (
    // TODO: Action to define
    <>
      <Button className={className}>
        <GpsFixed />
      </Button>
      <Button className={className}>
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
