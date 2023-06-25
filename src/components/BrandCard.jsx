import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import useStockCall from "../hooks/useStockCall";
import { btnStyle } from "../styles/globalStyle";

export default function MediaCard({brand, handleOpen, setInfo}) {
    const {deleteStockData} = useStockCall()
  return (
    <Card
      sx={{
        p: 2,
        width: "300px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography
          sx={{
            background: "green",
            color:"white",
            display: "inline-block",
            paddingX: 2,
            borderRadius: 2,
          }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {brand.name}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        image={brand.image}
        title={brand.name}
        alt={brand.name}
        sx={{ height: 130, objectFit: "cover" }}
      />
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <EditIcon
          sx={btnStyle}
          onClick={() => handleOpen(setInfo(brand))}
        />
        <DeleteOutlineIcon
          sx={btnStyle}
          onClick={() => deleteStockData("brands", brand.id, brand.name)}
        />
      </CardActions>
    </Card>
  );
}
