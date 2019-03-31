import { RouteComponentProps } from "@reach/router";
import React from "react";
import ReactMarkdown from "react-markdown";
import { typeReturned, useFetch } from "../../hooks";

const Thanks: React.FunctionComponent<RouteComponentProps> = () => {
  const response = useFetch(
    `${process.env.PUBLIC_URL}/thanks.md`,
    null,
    typeReturned.TEXT
  );

  return <ReactMarkdown source={response} />;
};

export default Thanks;
