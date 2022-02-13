import React, { Fragment, useState } from "react";
import "./header.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import axios from 'axios'
import {Backdrop} from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import {logout} from '../../store/user-slice'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from "react-router-dom";
import {useDispatch,useSelector } from "react-redux";
const url = 'http://localhost:4000';


const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const history = useNavigate();
  const dispatch = useDispatch();
  

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    history("/admin/dashboard");
  }

  function orders() {
    history("/orders");
  }
  function account() {
    history("/profile");
  }
  function cart() {
    history("/cart");
  }
  async function logoutUser() {
   const {data} =  await axios.get(`${url}/api/logout`);
   

   dispatch(logout(data))

    alert(data.message);
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "11" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? (`${url}${user.avatar.url}`) : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"}
            alt="Profile"
          />
        }
      >
      {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;