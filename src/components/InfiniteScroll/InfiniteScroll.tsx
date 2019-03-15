import { makeStyles } from "@material-ui/styles";
import classnames from "classnames";
import React, { ReactElement, UIEvent, useEffect, useState } from "react";
import { usePrevious } from "../../hooks/usePrevious";
import { userType } from "../../types";

const useStyles = makeStyles({
  InfiniteScroll: {
    height: "100%",
    overflow: "auto"
  },
  information: {
    flex: "1 1 100%",
    height: "4%",
    margin: "auto 0",
    padding: "2%",
    textAlign: "center"
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

  const onScroll = (event: UIEvent<HTMLDivElement>) => {
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
      onScroll={onScroll}
    >
      {props.elements.map(props.children)}
      <div className={classes.information}>
        {error && (props.errorElement || <div>{error}</div>)}
        {isLoading && (props.loaderElement || <div>Loading...</div>)}
      </div>
    </div>
  );
};

export default InfiniteScroll;
