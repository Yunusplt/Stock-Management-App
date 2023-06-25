import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchFail,
  fetchStart,
  registerSuccess,
  loginSuccess,
  logoutSuccess,
} from "../features/authSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  console.log(BASE_URL);
   const { token } = useSelector((state) => state.auth);  //!!!!!!!!!!!!!!!!
console.log(token);
  const register = async (userInfo) => {
    dispatch(fetchStart);
    try {
      const { data } = await axios.post(
        `${BASE_URL}account/register/`,
        userInfo
      );
      console.log(data); //todo apiden gelen... bana burdan username ve token lazim
      console.log(userInfo); //todo apiye giden...
      dispatch(registerSuccess(data));
      toastSuccessNotify("Register performed");
      navigate("/stock");
    } catch (error) {
      dispatch(fetchFail);
      toastErrorNotify("Register can not be performed");
      console.log(error);
    }
  };

  const login = async (userInfo) => {
    dispatch(fetchStart);
    try {
      const { data } = await axios.post(
        `${BASE_URL}account/auth/login/`,
        userInfo
      );
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login performed");
      navigate("/stock");
    } catch (error) {
      dispatch(fetchFail);
      toastErrorNotify("Login not performed");
      console.log(error);
    }
  };

    const logout = async () => {
      dispatch(fetchStart);
      try {
        await axios.post(
          `${BASE_URL}account/auth/logout/`,
          null,{
            headers: {
                Authorization:  `Token ${token}`  //todo token gidecek ve backend bilecek ben hangi oturumu sonlandiracam. her oturum bir tokenen sahip. ben cikis yaptiktan sonra eski token ele gecirilirse bir ise yaramaz.
            }  
          }
        );   //! bu islem backend de tokeni sifirlarken
        dispatch(logoutSuccess());  //! bu islem frondend de tokeni sifirlar
        toastSuccessNotify("Logout performed");
        navigate("/");
        console.log(token);
      } catch (error) {
        dispatch(fetchFail);
        toastErrorNotify("Logout can not be performed");
        console.log(error);
      }
    };

  // const logout = async ()=>{

  // }

  return { register, login, logout };
};

export default useAuthCall;
