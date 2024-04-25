import { jwtDecode } from "jwt-decode";

export const getRole = () => {
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  console.log(decode);
  return decode.role;
};

export const getId = () => {
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  // console.log(decode);
  return decode.id;
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  try {
    const decode = jwtDecode(token);
    console.log(decode);
    const currentTime = Date.now() / 1000;
    return decode.exp > currentTime;
  } catch (e) {
    return false;
  }
};

export const checkPermission = (roles) => {
  const loggedInUserRole = getRole();
  return roles.includes(loggedInUserRole);
};


