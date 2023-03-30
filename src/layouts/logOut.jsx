import { useDispatch } from "react-redux";
import { logOut } from "../store/users";

const LogOut = () => {
  const dispatch = useDispatch();

  dispatch(logOut());
};

export default LogOut;
