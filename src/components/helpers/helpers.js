import axios from 'axios';

const baseURL = 'http://localhost:8000/api/products/';


// Higher order function to define error handling just once
// You are not expected to understand this
const handleError = (fn) => (...params) => 
    fn(...params).catch((error) => {
        console.log(error);
    });

// CRUD operator of lego model
export const api = {
    getProduct: handleError(async (id) => {
        const res = await axios.get(baseURL + id);
        return res.data;
    }),
    getProducts: handleError(async () => {
        const res = await axios.get(baseURL);
        return res.data;
    }),
    deleteProduct: handleError(async (id) => {
        const res = await axios.delete(baseURL + id);
        return res.data;
    }),
    createProduct: handleError(async (payload) => {
        const res = await axios.post(baseURL, payload);
        return res.data;
    }),
    updateProduct: handleError(async (payload) => {
        const res = await axios.put(baseURL + payload._id, payload);
        return res.data
    })
};
