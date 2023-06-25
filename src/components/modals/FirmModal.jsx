import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import useStockCall from "../../hooks/useStockCall";
import { flexColumn, modalStyle } from "../../styles/globalStyle";

export default function FirmModal({ open, handleClose, info, setInfo }) {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);
  //todo lifting state up
  //! statelerimizi lifting state up yaparak bir üst componente taşıdık oradan gerekli olan yerlere dağıtım yapabilelim. Bizim örneğimizde FirmModal componenti hem yeni firma eklemek için hemde var olan firmayı update edebilmek için kullanılıyor. Bu nedenle modalı açabilmek ve update işleminde içini doldurabilmek için Firms componentine statelerimizi taşımış olduk oradan da FirmCard componentine props yoluyla göndermiş olduk.

  //   const [info, setInfo] = useState({
  //     name: "",
  //     phone: "",
  //     image: "",
  //     address: "",
  //   });

  const { postStockData, putStockData } = useStockCall();
  const handleChange = (e) => {
    console.log(e.target.name);
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  //! inputların name attributelarındaki isimler ile info statetimin içindeki keyler aynı olduğu için bu şekilde tek bir fonksiyonla inputdaki verilerimi state e aktarabildim.
  console.log(info);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (info.id) {
      putStockData("firms", info, info.name);
    } else {
      postStockData("firms", info, info.name);
    }

    // setInfo({
    //   name: "",
    //   phone: "",
    //   image: "",         //todo handleClose icine attik
    //   address: "",
    // });
    handleClose(); //! submit işleminden sonra modalın kapanması için burada handleClose fonksiyonunu çağırıyoruz.
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={() => {
          handleClose();
          //     setInfo({
          //   name: "",
          //   phone: "",
          //   image: "",
          //   address: "",
          // })
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={flexColumn}
            component={"form"}
            onSubmit={handleSubmit}
          >
            <TextField
              label="Firm Name"
              name="name"
              id="name"
              type="text"
              variant="outlined"
              value={info.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Address"
              name="address"
              id="address"
              type="text"
              variant="outlined"
              value={info.address}
              onChange={handleChange}
              required
            />
            <TextField
              label="Phone"
              name="phone"
              id="phone"
              type="tel"
              variant="outlined"
              value={info.phone}
              onChange={handleChange}
              required
            />
            <TextField
              label="Image"
              name="image"
              id="image"
              type="url"
              variant="outlined"
              value={info.image}
              onChange={handleChange}
              required
            />
            <Button variant="contained" type="submit">
              {info.id ? "Update Firm" : "Submit Firm"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
