import { Endpoints } from "./Api/endpoints";

export const fetchForgotPw = async (credentials: { email: string }) => {
  const url = Endpoints.forgotpw;
  try {
    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "omit",
      body: JSON.stringify(credentials),
    });
    const res = await data.json();
    if (res.status === "success") {
      return "success";
    } else if (res.status === "fail") {
      return res;
    } else {
      throw "Something went wrong";
    }
  } catch (error: any) {
    return error.message;
  }
};
interface fetchResetPw {
  otp: string;
  password: string;
  confirmPassword: string;
}
export const fetchResetPw = async (credentials:  fetchResetPw ) => {
  const url = Endpoints.resetpw;
  const payload=
    {
      "otp": credentials.otp,
      "newPassword": credentials.password,
      "newConfirmPassword": credentials.confirmPassword
  }
  
  try {
    const data = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "omit",
      body: JSON.stringify(payload),
    });
    const res = await data.json();
    if (res.status === "success") {
      return res;
    } else if (res.status === "fail") {
      return res;
    } else {
      throw "Something went wrong";
    }
  } catch (error: any) {
    return error.message;
  }
};
