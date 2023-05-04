import { useDispatch } from "react-redux";
import { logOut } from "../store/users";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const LogOut = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logOut());
    history.push("/");
  }, []);
};

export default LogOut;
