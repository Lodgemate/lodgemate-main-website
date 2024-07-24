import { Endpoints } from "./Api/endpoints";

export const GoogleAuth= async (credentials: {code: string}) => {
    const url = Endpoints.googleAuth;
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