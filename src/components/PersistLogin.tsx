import React from "react";
import { Outlet } from "react-router-dom";

import useRefreshToken from '../hooks/useRefreshToken.ts';
import useAuth from "../hooks/useAuth.ts";

import Loading from "./Loading.tsx";
import { Box } from "@mui/material";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  React.useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.token ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []); // warning: providing auth.token as a dependency will result in a looped cycle!

  return (
    <>
      {!persist
        ? <Outlet />
        : isLoading
          ?
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Loading />
          </Box>
          :
          <Outlet />
      }
    </>
  );
}

export default PersistLogin;
