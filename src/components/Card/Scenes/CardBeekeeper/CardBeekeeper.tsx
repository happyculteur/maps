import { Button, Typography } from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import GpsFixed from "@material-ui/icons/GpsFixed";
import React from "react";
import { useTranslation } from "react-i18next";
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
  const i18n = useTranslation();
  const {
    uuid,
    primary,
    location,
    interests,
    isVisible,
    seniority,
    training: { isPartner, isBilled, targets }
  } = props.beekeeper;
  const user = {
    category: userCategory.beekeeper,
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
        {i18n.t("Since: {{seniority}} years", { seniority })}
      </Typography>
      <Typography variant="subtitle1">{i18n.t("Training")}</Typography>
      <ul>
        <li>
          <Typography variant="subtitle2">
            {i18n.t("Billed: {{value}}", { value: isBilled.toString() })}
          </Typography>
        </li>
        <li>
          <Typography variant="subtitle2">
            {i18n.t("Public:")}
            {targets.map(
              (target, index) =>
                `${i18n.t(userLevel[target])}${
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
