import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import classnames from "classnames";
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from "react";
import { usePrevious } from "../../hooks";
import { userType } from "../../types";
import { ScrollIcon } from "../ScrollIcon";

const useStyles = makeStyles({
  InfiniteScroll: {
    height: "100%",
    overflow: "auto"
  },
  error: {
    border: "5px solid red",
    color: "red"
  },
  information: {
    height: "20%",
    marginBottom: "10%",
    paddingTop: "10%"
  }
});

interface IInfiniteScrollProps {
  children: (element: any) => JSX.Element;
  className?: string;
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

  const loadElements = useCallback(
    async (
      {
        load,
        numberToLoad
      }: {
        load: (numberToLoad: number) => Promise<void>;
        numberToLoad: number;
      },
      dispatchLoading: Dispatch<SetStateAction<boolean>>,
      dispatchError: Dispatch<SetStateAction<boolean>>
    ) => {
      dispatchLoading(true);

      try {
        await load(numberToLoad);
      } catch (error) {
        dispatchError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (error || isLoading) {
      return;
    }

    const eventTarget = event.currentTarget;

    if (
      eventTarget.offsetHeight + eventTarget.scrollTop >=
      eventTarget.scrollHeight
    ) {
      loadElements(props, setIsLoading, setError);
    }
  };

  useEffect(() => {
    if (prevElements === undefined) {
      loadElements(props, setIsLoading, setError);
    }
  }, [prevElements, loadElements, props]);

  /* TODO: Translation */
  return (
    <div
      className={classnames(classes.InfiniteScroll, props.className)}
      onWheel={onWheel}
    >
      {props.elements.map(props.children)}
      <div className={classes.information}>
        {!error && !isLoading && <ScrollIcon />}
        {error &&
          (props.errorElement || (
            <Typography variant="overline" className={classes.error}>
              {error}
            </Typography>
          ))}
        {isLoading &&
          (props.loaderElement || (
            <Typography variant="overline">...Loading</Typography>
          ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;
