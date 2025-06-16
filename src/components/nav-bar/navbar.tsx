import { useState } from "react";
import { Input, Button } from "antd";
import type { GetProps } from "antd";
import { HeartOutlined, ShoppingOutlined } from "@ant-design/icons";
import "./navbar.scss";
import { Basket } from "../basket/basket";
import { Favorites } from "../favorites/favorites";


type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

export const Navbar = () => {
  const [openf, setOpenf] = useState<boolean>(false);
  const [openb, setOpenb] = useState<boolean>(false);

  return (
    <nav className="navbar">
      <img
        src="https://upload.wikimedia.org/wikipedia/ru/thumb/9/91/Dodo_Logo.svg/2560px-Dodo_Logo.svg.png"
        alt="no image"
        className="nav-left"
      />
      <Search
        placeholder="Искать товары и категории"
        onSearch={onSearch}
        style={{ width: 400 }}
        className="nav-center"
      />
      <div className="nav-right">
        <Button type="text" 
        icon={<HeartOutlined />}
        onClick={() => setOpenf(true)}
        >
          Избранное
        </Button>
        <Button
          type="text"
          icon={<ShoppingOutlined />}
          onClick={() => setOpenb(true)}
        >
          Корзина
        </Button>
      </div>

      <Favorites openf={openf} setOpenf={setOpenf}></Favorites>
      <Basket openb={openb} setOpenb={setOpenb}></Basket>
    </nav>
  );
};
