import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";

const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //get the user from localStorage and accessToken
    const storedUser = localStorage.getItem("user");
    const storedAccessToken = localStorage.getItem("accessToken");

    if (storedUser && storedAccessToken) {
      dispatch(
        setCredentials({
          user: JSON.parse(storedUser),
          accessToken: storedAccessToken,
        })
      );
    }
  }, [dispatch]);

  return null;
};

export default AuthInitializer;
