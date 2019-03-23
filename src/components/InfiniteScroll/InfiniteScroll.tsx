import { makeStyles } from "@material-ui/styles";
import classnames from "classnames";
import React, { ReactElement, useEffect, useState } from "react";
import { usePrevious } from "../../hooks";
import { userType } from "../../types";
import { ScrollIcon } from "../ScrollIcon";

const useStyles = makeStyles({
  InfiniteScroll: {
    height: "100%",
    overflow: "auto"
  },
  information: {
    height: "20%",
    marginBottom: "10%",
    paddingTop: "10%"
  }
});

interface IInfiniteScrollProps {
  children: (element: any) => JSX.Element;
  className: string;
  elements: userType[];
  errorElement?: ReactElement;
  load: (numberToLoad: number) => Promise<void>;
  loaderElement?: ReactElement;
  numberToLoad: number;
}

const InfiniteScroll: React.FunctionComponent<IInfiniteScrollProps> = props => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const prevElements = usePrevious(props.elements);
  const classes = useStyles();

  useEffect(() => {
    if (prevElements === undefined) {
      loadElements();
    }
  }, [prevElements]);

  const loadElements = async () => {
    setIsLoading(true);

    try {
      const { load, numberToLoad } = props;

      await load(numberToLoad);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (error || isLoading) {
      return;
    }

    const eventTarget = event.currentTarget;

    if (
      eventTarget.offsetHeight + eventTarget.scrollTop >=
      eventTarget.scrollHeight
    ) {
      loadElements();
    }
  };

  return (
    <div
      className={classnames(classes.InfiniteScroll, props.className)}
      onWheel={onWheel}
    >
      {props.elements.map(props.children)}
      <div className={classes.information}>
        {!error && !isLoading && <ScrollIcon />}
        {error && (props.errorElement || <div>{error}</div>)}
        {isLoading && (props.loaderElement || <div>Loading...</div>)}
      </div>
    </div>
  );
};

export default InfiniteScroll;
