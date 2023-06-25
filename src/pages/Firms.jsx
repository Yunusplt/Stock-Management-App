import React, { useEffect, useState } from 'react'
import useStockCall from '../hooks/useStockCall'
import { Button, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import FirmCard from '../components/FirmCard'
import FirmModal from '../components/modals/FirmModal'
import { flex } from "../styles/globalStyle";


const Firms = () => {
  const { getStockData } = useStockCall();
  const { firms } = useSelector((state) => state.stock);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInfo({
      name: "",
      phone: "",
      image: "",
      address: "",
    });
  };

  const [info, setInfo] = useState({
    name: "",
    phone: "",
    image: "",
    address: "",
  });

  console.log(firms);
  useEffect(() => {
    getStockData("firms"); //todo dinamiklik buradan baslar...
  }, []); // eslint-disable-line

  return (
    <>
      <Typography variant="h4" color="red" mb={2}>
        Firms
      </Typography>
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
        new firm
      </Button>
      <FirmModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />
      <Grid container sx={flex}>
        {/* card yapisini neyle doldurcam gelen verilerle. nerdeler statelerimdeler.  */}
        {firms.map((firm) => (
          <Grid item key={firm.id}>
            <FirmCard firm={firm} handleOpen={handleOpen} setInfo={setInfo} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Firms


//! firms sayfasinin ilk hali 
// import React, { useEffect } from 'react'
// import axios from 'axios'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchFail, fetchStart, getSuccess } from '../features/stockSlice';



// const Firms = () => {

//   const dispatch = useDispatch();
//   const BASE_URL = process.env.REACT_APP_BASE_URL;
//   const {token} = useSelector(state=>state.auth)
//   const getFirms = async ()=>{
//     dispatch(fetchStart)
//     try {
//       const {data} = await axios.get(`${BASE_URL}stock/firms/`, {
//         headers:{Authorization: `Token ${token}`}
//       })
//       const url = "firms"
//       console.log(data);
//       dispatch(getSuccess({data,url}))

//     } catch (error) {
//       console.log(error);
//       dispatch(fetchFail)
//     }
//   }

//   useEffect(() => {
//     getFirms()
//   }, [])
  

//   return (
//     <div>Firms</div>
//   )
// }

// export default Firms