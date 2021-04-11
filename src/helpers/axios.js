import axios from "axios";
const baseURL = "https://v3be.infi.store/";
const token = "";
// const auth = {
//     username: "ck_69c0a2885d8c01da26a0b51e08e88f6eca80e299",
//     password: "cs_d399c9bfdb4ec187558363f9d34f077ee1943545",
// };
const config = {
    headers: { Authorization: `Bearer ${token}` },
};
const axiosInstance = axios.create({
    baseURL,
});
export default axiosInstance;
