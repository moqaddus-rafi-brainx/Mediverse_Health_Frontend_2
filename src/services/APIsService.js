import axios from "axios";
import jwtDecode from "jwt-decode";
import { refreshToken } from "./authService";
const baseURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000/api/v1";

// Helper function to get access token from either storage
const getAccessToken = () => {
  return localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
};

// Helper function to set access token in appropriate storage
const setAccessToken = (token) => {
  const rememberMe = localStorage.getItem("rememberMe") === "true";
  if (rememberMe) {
    localStorage.setItem("access_token", token);
  } else {
    sessionStorage.setItem("access_token", token);
  }
};

const authorizedAxios = axios.create();

authorizedAxios.interceptors.request.use(
  async (config) => {
    const currentDate = new Date();
    const accessToken = getAccessToken();
    if (!accessToken) return config;

    const decodedToken = jwtDecode(accessToken);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await refreshToken();
      setAccessToken(data.accessToken);
      localStorage.setItem("refresh_token", data.refreshToken);
      config.headers["authorization"] = "Bearer " + data.accessToken;
    } else {
      config.headers["authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

authorizedAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error;
    if (res?.response?.status === 401 || res === "Invalid token specified") {
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      sessionStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = `${process.env.REACT_APP_HOST}`;
    }

    console.error(`Looks like there was a problem. Status Code: ` + res?.response?.status);
    return error;
  }
);

export const postCall = async (url, data) => {
  console.log(baseURL + url);
  return new Promise((resolve, reject) => {
    axios
      .post(baseURL + url, data)
      .then((data) => {
        resolve({
          ...data.data,
          ...(data.headers.refresh_token && {
            refresh_token: data.headers.refresh_token,
          }),
          ...(data.headers.access_token && {
            access_token: data.headers.access_token,
          }),
        });
      })
      .catch((err) => reject(err));
  });
};

export const getCall = async (url) => {
  console.log(baseURL + url);
  return new Promise((resolve, reject) => {
    axios
      .get(baseURL + url)
      .then((data) => {
        resolve(data.data);
      })
      .catch((err) => reject(err));
  });
};

export const authorizedPostCall = async (url, data) => {
  return new Promise((resolve, reject) => {
    authorizedAxios
      .post(baseURL + url, data, {
        headers: {
          authorization: "Bearer " + getAccessToken(),
        },
      })
      .then((data) => {
        if (data?.status >= 200 && data?.status <= 299) resolve(data.data);
        else reject(data);
      })
      .catch((err) => reject(err));
  });
};

export const authorizedPutCall = async (url, data) => {
  return new Promise((resolve, reject) => {
    authorizedAxios
      .put(baseURL + url, data, {
        headers: {
          authorization: "Bearer " + getAccessToken(),
        },
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch((err) => reject(err));
  });
};

export const authorizedDeleteCall = async (url) => {
  return new Promise((resolve, reject) => {
    authorizedAxios
      .delete(baseURL + url, {
        headers: {
          authorization: "Bearer " + getAccessToken(),
        },
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch((err) => reject(err));
  });
};

export const authorizedGetCall = async (url) => {
  return new Promise((resolve, reject) => {
    authorizedAxios
      .get(baseURL + url, {
        headers: {
          authorization: "Bearer " + getAccessToken(),
        },
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch((err) => reject(err));
  });
};
