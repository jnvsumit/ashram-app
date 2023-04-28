import React, { useContext } from "react";
import { LoadingContext } from "../../context/LoadingContextProvider";
import Loading from "../Loading/Loading";

const withLoading = (Component) => {
  return (props) => {
    const { loading } = useContext(LoadingContext);

    return (
      <>
        {false ? (
          <Loading />
        ) : (
          <Component {...props} />
        )}
      </>
    );
  };
};

export default withLoading;
