import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  getProCatBrandSuccess,
  getProPurcFirBrandsSucces,
  getProSalBrandsSucces,
  getPurcSalesSuccess,
  getSuccess,
} from "../features/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios from "./useAxios";

const useStockCall = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  const getStockData = async (urlEnd) => {
    dispatch(fetchStart);
    try {
      const { data } = await axiosWithToken.get(`stock/${urlEnd}/`);
      dispatch(getSuccess({ data, urlEnd }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail);
    }
  };

  const deleteStockData = async (urlEnd, id, nameFirm) => {
    dispatch(fetchStart);
    try {
      await axiosWithToken.delete(`stock/${urlEnd}/${id}/`);
      getStockData(urlEnd);
      toastSuccessNotify(`${nameFirm} successfully deleted!`);
    } catch (error) {
      dispatch(fetchFail);
      toastErrorNotify(`${nameFirm} couldn't be deleted!`);
    }
  };

  const postStockData = async (urlEnd, info, nameFirm) => {
    dispatch(fetchStart);
    try {
      await axiosWithToken.post(`stock/${urlEnd}/`, info);
      getStockData(urlEnd);
      toastSuccessNotify(`${nameFirm} successfully created!`);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail);
      toastErrorNotify(`${nameFirm} couldn't be created!`);
    }
  };

  const putStockData = async (urlEnd, info, nameFirm) => {
    dispatch(fetchStart);
    try {
      await axiosWithToken.put(`stock/${urlEnd}/${info.id}/`, info);
      getStockData(urlEnd);
      toastSuccessNotify(`${nameFirm} successfully update!`);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail);
      toastErrorNotify(`${nameFirm} couldn't be update!`);
    }
  };

  //! //! for Promise all
  const getProCatBrand = async () => {
    dispatch(fetchStart);
    try {
      // const { data } = await axiosWithToken.get(`stock/${urlEnd}/`);
      const [products, brands, categories] = await Promise.all([
        axiosWithToken.get(`stock/products/`),
        axiosWithToken.get(`stock/brands`),
        axiosWithToken.get(`stock/categories`),
      ]);
      // dispatch(getSuccess({ data, urlEnd }));  //! bunu burada kullanamam artik 3 tane cevap geliyor bana buradan bunun icin yeni bir reducer lazim..
      dispatch(
        getProCatBrandSuccess([products?.data, brands?.data, categories?.data])
      );
    } catch (error) {
      console.log(error);
      dispatch(fetchFail);
    }
  };

  const getProSalBrands = async () => {
    dispatch(fetchStart());
    try {
      // const { data } = await axiosWithToken.get(`stock/${url}/`);
      const [products, brands, sales] = await Promise.all([
        axiosWithToken.get(`stock/products/`),
        axiosWithToken.get(`stock/brands/`),
        axiosWithToken.get(`stock/sales/`),
      ]);

      dispatch(
        getProSalBrandsSucces([products?.data, brands?.data, sales?.data])
      );
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const getProPurcFirBrands = async () => {
    dispatch(fetchStart());
    try {
      // const { data } = await axiosWithToken.get(`stock/${url}/`);
      const [products, purchases, firms, brands] = await Promise.all([
        axiosWithToken.get(`stock/products/`),
        axiosWithToken.get(`stock/purchases/`),
        axiosWithToken.get(`stock/firms/`),
        axiosWithToken.get(`stock/brands/`),
      ]);

      dispatch(
        getProPurcFirBrandsSucces([
          products?.data,
          purchases?.data,
          firms?.data,
          brands?.data,
        ])
      );
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const getPurcSales = async () => {
    dispatch(fetchStart());
    try {
      const [purchases, sales] = await Promise.all([
        axiosWithToken.get(`stock/purchases/`),
        axiosWithToken.get(`stock/sales/`),
      ]);

      dispatch(
        getPurcSalesSuccess([purchases?.data, sales?.data])
      );
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  return {
    getStockData,
    deleteStockData,
    postStockData,
    putStockData,
    getProCatBrand,
    getProSalBrands,
    getProPurcFirBrands,
    getPurcSales,
  };
};

export default useStockCall;

// todo her bir fetch islemi icin syntax kurmamak icin. dinamik bir yapi kurcaz yukarda
//   const getFirms = async () => {
//     dispatch(fetchStart);
//     try {
//       const { data } = await axios.get(`${BASE_URL}stock/firms/`, {
//         headers: { Authorization: `Token ${token}` },
//       });
//       const url = "firms";
//       console.log(data);
//       dispatch(getSuccess({ data, url }));
//     } catch (error) {
//       console.log(error);
//       dispatch(fetchFail);
//     }
//   };

//   const getBrands = async () => {
//     dispatch(fetchStart);
//     try {
//       const { data } = await axios.get(`${BASE_URL}stock/brands/`, {
//         headers: { Authorization: `Token ${token}` },
//       });
//       const url = "brands";
//       console.log(data);
//       dispatch(getSuccess({ data, url }));
//     } catch (error) {
//       console.log(error);
//       dispatch(fetchFail);
//     }
//   };

// todo axios instance den önceki hali
//   const getStockData = async (urlEnd) => {
//     dispatch(fetchStart);
//     try {
//       const { data } = await axios.get(`${BASE_URL}stock/${urlEnd}/`, {
//         headers: { Authorization: `Token ${token}` },
//       });
//       dispatch(getSuccess({ data, urlEnd }));
//     } catch (error) {
//       console.log(error);
//       dispatch(fetchFail);
//     }
//   };

//   const deleteStockData = async (urlEnd, id, nameFirm) => {
//     dispatch(fetchStart);
//     try {
//       await axios.delete(`${BASE_URL}stock/${urlEnd}/${id}/`, {
//         headers: { Authorization: `Token ${token}` },
//       });
//       getStockData(urlEnd);
//       toastSuccessNotify(`${nameFirm} successfully deleted!`);
//     } catch (error) {
//       dispatch(fetchFail);
//       toastErrorNotify(`${nameFirm} couldn't be deleted!`);
//     }
//   };
