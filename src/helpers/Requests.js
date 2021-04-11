import axiosInstance from "./axios";
import axios from "axios";
const requests = {
    // products
    fetchProduct: "/wp-json/api/v1/product/",
    fetchProducts: "/wp-json/api/v1/products?per_page=12",
    fetchProductVariations: "/wp-json/api/v1/products/",
    fetchProductsOnSale: "/wp-json/api/v1/products?per_page=16",
    // categories
    fetchCategories: "/wp-json/api/v1/products/categories/",
    // home page
    fetchHomePageData: "/wp-json/api/v1/pages/homepage",
};
// getUserValidate
export const getUserValidate = async (firebaseToken) => {
    var bodyFormData = new FormData();
    bodyFormData.append("idToken", firebaseToken);

    return await axios({
        method: "post",
        url: "https://v3be.infi.store/wp-json/api/v1/login",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
    });
};

// Aggregate
export const getAggregateData = async () => {
    return await axios.get("https://v3be.infi.store/wp-json/api/v1/aggregate");
};
// Homepage
export const getHomePageData = async () => {
    return await axios.get("https://v3be.infi.store/wp-json/api/v1/pages?page=homepage");
};
export const getCampaign = async () => {
    return await axios.get("https://v3be.infi.store/wp-json/api/v1/pages?page=sports-music-exercise");
};

// Categories
export const getAllCategories = async () => {
    return await axiosInstance.get(requests.fetchCategories);
};
export const getSubCategories = async (cat_id) => {
    return await axiosInstance.get(requests.fetchCategories + "?parent=" + cat_id);
};

// Products
export const getProducts = async () => {
    return await axiosInstance.get(requests.fetchProducts);
};
export const getAllProducts = async (page) => {
    return await axiosInstance.get(requests.fetchProducts + "&page=" + page);
};

export const getSingleProduct = async (id) => {
    return await axiosInstance.get(requests.fetchProduct + id);
};

export const getProductVariations = async (id) => {
    return await axiosInstance.get(requests.fetchProductVariations + id + "/variations");
};

export const getCategoryProducts = async (cat_id, page) => {
    return await axiosInstance.get(requests.fetchProducts + "&category=" + cat_id + "&orderby=date&order=desc" + "&page=" + page);
};

//  CatArchive products -- latest, featured, low,high

export const getCategoryProductsLatest = async (cat_id, page) => {
    return await axiosInstance.get(requests.fetchProducts + "&category=" + cat_id + "&orderby=date&order=desc" + "&page=" + page);
};
export const getCategoryProductsFeatured = async (cat_id, page) => {
    return await axiosInstance.get(requests.fetchProducts + "&category=" + cat_id + "&page=" + page);
};
export const getCategoryProductsLow = async (cat_id, page) => {
    return await axiosInstance.get(requests.fetchProducts + "&category=" + cat_id + "&orderby=price&order=asc" + "&page=" + page);
};
export const getCategoryProductsPopular = async (cat_id, page) => {
    return await axiosInstance.get(requests.fetchProducts + "&category=" + cat_id + "&orderby=popularity&order=desc" + "&page=" + page);
};
export const getCategoryProductsHigh = async (cat_id, page) => {
    return await axiosInstance.get(requests.fetchProducts + "&category=" + cat_id + "&orderby=price&order=desc" + "&page=" + page);
};

//  Search products -- latest, featured, low,high

export const getSearchResultPage = async (searchTerms, page) => {
    return await axiosInstance.get(requests.fetchProducts + "&search=" + searchTerms + "&page=" + page);
};

// for search page
export const getSearchProductsLatest = async (searchTerms, page) => {
    return await axiosInstance.get(requests.fetchProducts + "&search=" + searchTerms + "&orderby=date&order=desc" + "&page=" + page);
};
export const getSearchProductsFeatured = async (searchTerms, page) => {
    return await axiosInstance.get(requests.fetchProducts + "&search=" + searchTerms + "&orderby=popularity&order=desc" + "&page=" + page);
};
export const getSearchProductsLow = async (searchTerms, page) => {
    return await axiosInstance.get(requests.fetchProducts + "&search=" + searchTerms + "&orderby=price&order=asc" + "&page=" + page);
};
export const getSearchProductsHigh = async (searchTerms, page) => {
    return await axiosInstance.get(requests.fetchProducts + "&search=" + searchTerms + "&orderby=price&order=desc" + "&page=" + page);
};

export const getSalesItem = async () => {
    return await axiosInstance.get(requests.fetchProducts + "&on_sale=true");
};
export const getFeaturedProducts = async () => {
    return await axiosInstance.get(requests.fetchProducts + "&featured=true");
};
export const getFilteredData = async (cat_id, page, min, max) => {
    // https://dev.infi.store/wp-json/api/v1/products?per_page=12&category=544&min_price=600&max_price=1000
    return await axiosInstance.get(
        requests.fetchProducts + "&category=" + cat_id + "&min_price=" + min + "&max_price=" + max + "&page=" + page
    );
};

// Add to cart
export const postAddToCart = async (req) => {
    return await axiosInstance.post("wp-json/mobikul/v1/cart/?request=add&width=414&mFactor=3", req);
};

export const getAddToCart = async (cust_id, guest_id) => {
    if (cust_id) return await axiosInstance.get(`wp-json/mobikul/v1/cart/get/?customer_id=${cust_id}`);
    else return await axiosInstance.get(`wp-json/mobikul/v1/cart/get/?guest_id=${guest_id}`);
};

export const getGuestID = async () => {
    return await axiosInstance.get("wp-json/api/v1/loggedin");
};

export default requests;
