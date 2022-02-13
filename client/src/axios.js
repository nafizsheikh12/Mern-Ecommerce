import axios from 'axios';
const url ='http://localhost:4000'

export const getProduct = async (data) =>  axios.get(`${url}/api/products`);

export const getsProduct = async (keyword = "",currentPage = 1,price = [0,25000]) =>  axios.get(`${url}/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`);


export const userRegister = async (data) =>  axios.post(`${url}/api/register`,data);
export const userLogin = async (data) =>  axios.post(`${url}/api/login`,data);