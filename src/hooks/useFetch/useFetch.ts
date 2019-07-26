import { useEffect, useState } from "react";

export enum typeReturned {
  JSON = "JSON",
  TEXT = "TEXT"
}

function useFetch(
  url: string,
  valueToWatch: any,
  returnType: typeReturned
): string {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch(url)
      .then(response =>
        returnType === typeReturned.TEXT ? response.text() : response.json()
      )
      .then(responseData => setData(responseData));
  }, [valueToWatch, url, returnType]);

  return data;
}

export default useFetch;
