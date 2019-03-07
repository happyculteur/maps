import { Button, Typography } from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import GpsFixed from "@material-ui/icons/GpsFixed";
import Landscape from "@material-ui/icons/Landscape";
import React from "react";
import { Card } from "../../";
import individual from "../../../../assests/individual.svg";
import { IIndividual, userCategory, userLevel } from "../../../../types";

interface ICardIndividualOwnProps {
  individual: IIndividual;
}

const CardIndividual: React.FunctionComponent<
  ICardIndividualOwnProps
> = props => {
  const { uuid, firstname, location, interests, level } = props.individual;
  const hasSpace = props.individual.spaces.length > 0;
  const user = {
    category: userCategory.individual,
    firstname,
    interests,
    location,
    uuid
  };
  const renderContent = (className: string) => (
    <div className={className}>
      <Typography variant="subtitle1">
        Experience: {userLevel[level.toString()]}
      </Typography>
    </div>
  );
  const renderActions = (className: string) => (
    // TODO: Action to define
    <>
      <Button className={className}>
        <GpsFixed />
      </Button>
      {hasSpace && (
        <Button className={className}>
          <Landscape />
        </Button>
      )}
      <Button className={className}>
        <Email />
      </Button>
    </>
  );

  return (
    <Card avatar={individual} user={user} actions={renderActions}>
      {className => renderContent(className)}
    </Card>
  );
};

export default CardIndividual;
