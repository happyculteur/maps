import { Button, Typography } from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import GpsFixed from "@material-ui/icons/GpsFixed";
import Landscape from "@material-ui/icons/Landscape";
import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "../../";
import individual from "../../../../assests/individual.svg";
import { IIndividual, userCategory, userLevel } from "../../../../types";
import { IActionsTrigger } from "../../Card";

interface ICardIndividualOwnProps {
  individual: IIndividual;
}

const CardIndividual: React.FunctionComponent<
  ICardIndividualOwnProps
> = props => {
  const i18n = useTranslation();
  const {
    uuid,
    primary,
    location,
    interests,
    isVisible,
    level,
    hasSpace,
    spaces
  } = props.individual;
  const user = {
    category: userCategory.individual,
    interests,
    isVisible,
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
        ).replace("{{category}}", i18n.t(userCategory[user.category]))) ||
      "",
    to: process.env.REACT_APP_HAPPYCULTEUR_EMAIL || ""
  };

  const renderContent = (className: string) => (
    <div className={className}>
      <Typography variant="subtitle1">
        {i18n.t("Experience: {{experience}}", {
          experience: i18n.t(userLevel[level])
        })}
      </Typography>
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
      {hasSpace && (
        <Button
          className={className}
          onClick={trigger.focusMapOnLocation(spaces[0])}
        >
          <Landscape />
        </Button>
      )}
      <Button
        className={className}
        onClick={trigger.sendEmail(email.to, email.subject, email.body)}
      >
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
