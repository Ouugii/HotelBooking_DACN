import axios from "axios";
import axiosDefaults from "axios";
import {
  logOutFailed,
  logOutStart,
  logOutSuccess,
  loginFailed,
  loginStart,
  loginSuccess,
} from "./authSlice";
const urlLogout = "http://localhost:3030/v1/api/user/logout";
const urlLogin = "http://localhost:3030/v1/api/user/login";
const loginHeaders = {
  "Content-Type": "application/json",
};

const urlGetUser = (_id) => {
  return `http://localhost:3030/v1/api/user/${_id}`;
};

function HeadersTK(accessToken) {
  return {
    Authorization: `${accessToken}`,
    "Content-Type": "application/json",
  };
}

function AuthRoute(role, navigate) {
  switch (role) {
    case "USER":
      navigate("/");
      break;
    case "HOTEL_MANAGER":
      navigate("/hotel-manage/Dashboard");
      break;
    default:
      break;
  }
}

axios.defaults.withCredentials = true;

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const r = await axios.post(urlLogin, user, loginHeaders);

    const r2 = await axios.get(urlGetUser(r.data.metadata.user._id), {
      headers: HeadersTK(r.data.metadata.accessToken),
    });

    const data = {
      message: r.data.message,
      statusCode: r.data.statusCode,
      metadata: {
        user: r.data.metadata.user,
        userInfo: r2.data.metadata.user,
        accessToken: r.data.metadata.accessToken,
      },
    };

    // console.log(data);
    // console.log(r.data);
    // console.log(r2.data);

    dispatch(loginSuccess(data));
    AuthRoute(r.data.metadata.user.role, navigate);
  } catch (error) {
    dispatch(loginFailed());
    alert("Tên tài khoản hoặc mật khẩu không đúng");
  }
};

// export const logOut = async(dispatch, navigate,accessToken,axiosJWT) => {
//     dispatch(logOutStart())
//     try{
//         await axiosJWT.delete("http://localhost:3030/v1/api/user/logout",{
//             headers:{token: `${accessToken}`}
//         });
//         dispatch(logOutSuccess());
//         navigate("/");
//     }catch(error){
//         dispatch(logOutFailed());
//     }
// }

export const logOut = async (dispatch, accessToken, navigate) => {
  dispatch(logOutStart());
  try {
    await axios.delete(urlLogout, {
      headers: HeadersTK(accessToken),
    });
    dispatch(logOutSuccess());
    navigate("/");
  } catch (error) {
    dispatch(logOutFailed());
  }
};

export const apiGetPublicProvince = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefaults({
        method: "get",
        url: "http://localhost:3030/v1/api/province",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPublicDistrict = (province_code) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefaults({
        method: "get",
        url: `http://localhost:3030/v1/api/province/district/${province_code}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPublicWard = (district_code) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!district_code) {
        // If district_code is null or undefined, resolve immediately with empty data
        resolve({ data: { metadata: { ward: [] } } });
      } else {
        const response = await axiosDefaults({
          method: "get",
          url: `http://localhost:3030/v1/api/province/ward/${district_code}`,
        });
        resolve(response);
      }
    } catch (error) {
      reject(error);
    }
  });
