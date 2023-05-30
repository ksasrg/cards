import axios from "axios";

let url = "";
// url = "https://neko-back.herokuapp.com/2.0/";

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? url || "http://localhost:7542/2.0/"
      : "https://neko-back.herokuapp.com/2.0/",
  withCredentials: true,
});

// export const instance = axios.create({
//   baseURL: "https://neko-back.herokuapp.com/2.0/",
//   withCredentials: true,
// });
