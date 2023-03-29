import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logOut } from "../store/users";

const LogOut = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  dispatch(logOut());
  history.push("/");
};

export default LogOut;
