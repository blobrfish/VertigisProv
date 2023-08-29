import axios from "axios";

export default axios.create({
    baseURL: "https://provwebapi20230829054949.azurewebsites.net",

    // headers: {
    //   'Access-Control-Allow-Origin': true,
    //   'Content-Type': 'application/json',
    // },
});

