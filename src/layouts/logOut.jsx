import { useDispatch } from "react-redux";
import { logOut } from "../store/users";
import { useEffect } from "react";

const LogOut = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logOut());
  }, []);
};

export default LogOut;
