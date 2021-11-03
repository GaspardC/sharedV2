import React from "react";

const UseNetwork = ({errorMessage = 'no connection..'} : {errorMessage?}) => {
  return <p>{errorMessage}</p>;
};
export default UseNetwork;
