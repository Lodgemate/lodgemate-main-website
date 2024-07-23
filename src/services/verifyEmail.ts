import { Endpoints } from "./Api/endpoints";
export const verifyEmail = async (credentials: { email: string }) => {
    const url = Endpoints.verifyEmail;
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
  export const fetchverifyEmailPost = async (credentials: {otp: string}) => {
    const url = Endpoints.verifyEmailPost;
    // const payload = {
    //   otp: credentials.otp,
    // };
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