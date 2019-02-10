import { makeStyles } from "@material-ui/styles";
import classnames from "classnames";
import React, { ReactElement, UIEvent, useEffect, useState } from "react";

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
  load: (numberToLoad: number, elements: any[]) => Promise<any[]>;
  loaderElement?: ReactElement;
  errorElement?: ReactElement;
  numberToLoad: number;
  className: string;
}

const InfiniteScroll: React.FunctionComponent<IInfiniteScrollProps> = props => {
  const init: Array<{}> = [];
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [elements, setElements] = useState(init);
  const classes = useStyles();

  useEffect(() => {
    setElements([]);
    loadElements();
  }, [props.load]);

  const loadElements = async () => {
    setIsLoading(true);

    try {
      const { load, numberToLoad } = props;
      const nextElements = await load(numberToLoad, elements);

      setElements([...elements, ...nextElements]);
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
      {elements.map(props.children)}
      <div className={classes.information}>
        {error && (props.errorElement || <div>{error}</div>)}
        {isLoading && (props.loaderElement || <div>Loading...</div>)}
      </div>
    </div>
  );
};

export default InfiniteScroll;
