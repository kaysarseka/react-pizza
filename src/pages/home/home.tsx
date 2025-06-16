import { Cards } from "../../components/cards/cards";
import { Navbar } from "../../components/nav-bar/navbar";
import { Frequently } from "../../components/frequently/frequently";
import { CarouselComp } from "../../components/carousel/carousel";
import { CartProvider } from "../../context/BasketContext";
import { FavoritesProvider } from "../../context/FavoritesContext";

export const Home = () => {
  return (
    <>
      <FavoritesProvider>
        <CartProvider>
          <Navbar></Navbar>
          <CarouselComp></CarouselComp>
          <Frequently></Frequently>
          <Cards></Cards>
        </CartProvider>
      </FavoritesProvider>
    </>
  );
};
