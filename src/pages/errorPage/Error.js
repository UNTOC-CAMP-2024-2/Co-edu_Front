import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.error(error);

  return <div>{error.statusText || error.message}</div>;
};

export default Error;
