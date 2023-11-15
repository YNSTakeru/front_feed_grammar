// import axios from 'axios'
import { errorHandler } from "./async"
import { axiosToken } from "./axios"

export async function setTokenToCookie() {
    await fetchToken()
}

async function fetchToken() {
    try {
        return await axiosToken.get(`/sanctum/csrf-cookie`)
    } catch (error) {
        errorHandler(error)
    }
}
