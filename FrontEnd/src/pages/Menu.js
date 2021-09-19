import React from "react";
import { MenuList } from "../datalists/MenuList";
import MenuItem from "../RestaurantComponents/MenuItem";
import "../styles/Menu.css";

function Menu() {
  return (
    <div className="menu">
      <h1 className="menuTitle">MENU</h1>
      <div className="menuList">
        {MenuList.map((menuItem, key) => {
          return (
            <MenuItem
              key={key}
              image={menuItem.image}
              name={menuItem.name}
              price={menuItem.price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
