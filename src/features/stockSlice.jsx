import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stock",

  initialState: {
    loading: false,
    error: false,
    products: [], //todo const [products, setProduct] = useState([]) products initialState icerisindeki producsta denk gelir. setProduct reducers a denk gelir. useState icindeki bos array productsin onundekine denk gelir.
    firms: [],
    brands: [],
    categories: [],
    sales: [],
    purchases: [],
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getSuccess: (state, { payload }) => {
      state.loading = false;
      state[payload.urlEnd] = payload.data;
    },
    getProCatBrandSuccess: (state, { payload }) => {
      state.loading = false;
      state.products = payload[0]; //! for Promise all
      state.brands = payload[1];
      state.categories = payload[2];
    },
    getProPurcFirBrandsSucces: (state, { payload }) => {
      state.loading = false;
      state.products = payload[0];
      state.purchases = payload[1];
      state.firms = payload[2];
      state.brands = payload[3];
    },
    getProSalBrandsSucces: (state, { payload }) => {
      state.loading = false;
      state.products = payload[0];
      state.brands = payload[1];
      state.sales = payload[2];
    },
    getPurcSalesSuccess: (state, { payload }) => {
      state.loading = false;
      state.purchases = payload[0];
      state.sales = payload[1];
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  getSuccess,
  getProCatBrandSuccess,
  getProSalBrandsSucces,
  getProPurcFirBrandsSucces,
  getPurcSalesSuccess,
} = stockSlice.actions;
export default stockSlice.reducer;
