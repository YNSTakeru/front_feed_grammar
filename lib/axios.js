import Axios from "axios"

const axios = Axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_URL}`,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials: true,
})

export const axiosToken = Axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_URL}`,
    withCredentials: true,
})

export default axios
