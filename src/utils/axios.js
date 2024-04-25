import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
const getAllTweet = ()=> {
  return axios.get(API_URL + 'all',{
    headers: { Authorization: `Bearer ${authHeader()} ` },
  })
}
export default customAxios;
