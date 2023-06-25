import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
//! Icons
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import StarsIcon from "@mui/icons-material/Stars";
import InventoryIcon from "@mui/icons-material/Inventory";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useSelector } from "react-redux";

//todo kendi JSON dosyamizi olusturuyoruz...
const internalLinks = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/stock/",
  },
  {
    title: "Sales",
    icon: <MonetizationOnIcon />,
    path: "/stock/sales/",
  },
  {
    title: "Purchases",
    icon: <ShoppingCartIcon />,
    path: "/stock/purchases/",
  },
  {
    title: "Firms",
    icon: <StoreIcon />,
    path: "/stock/firms/",
  },
  {
    title: "Brands",
    icon: <StarsIcon />,
    path: "/stock/brands/",
  },
  {
    title: "Products",
    icon: <InventoryIcon />,
    path: "/stock/products/",
  },
];

const externalLinks = [
  {
    title: "Admin Panel",
    icon: <SupervisorAccountIcon />,
    url: `${process.env.REACT_APP_BASE_URL}admin`,
  },
];

//todo nesting css
const iconStyle = {
  color: "white",
  "& .MuiSvgIcon-root": { color: "white" },
  "&:hover": {
    color: "red",
    "& .MuiSvgIcon-root": { color: "red" },
  },
};

const MenuListItems = () => {
  const navigate = useNavigate();
  const { isAdmin } = useSelector((state) => state.auth);



  return (
    <List>
      {internalLinks.map((item, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton sx={iconStyle} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        </ListItem>
      ))}
      {isAdmin &&
        externalLinks.map((item, index) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton sx={iconStyle} to={item.url} target="true">
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  );
};

export default MenuListItems;
