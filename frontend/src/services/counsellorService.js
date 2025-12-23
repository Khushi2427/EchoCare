import axios from "../utils/axios";

export const getCounsellors = async () => {
  const res = await axios.get("/counsellors");
  return res.data;
};
