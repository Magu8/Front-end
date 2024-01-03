import { useContext, useEffect } from "react";
import { useAllArtworks } from "../hooks/useAllArtworks";
import UserContext from "../contexts/UserContext";
import Carousel from "./Carousel";
import "../styles/Main.scss";

export default function Main() {
  const { getAllArtworks, allArtworks } = useAllArtworks();
  const { activeUser } = useContext(UserContext);

  useEffect(() => {
    getAllArtworks();
  }, []); //el useEffect se ejecutará primero por sí solo, y luego cuando userPurchased se actualice

  function Shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      //recorremos el array desde el número que se encuentra en última posición hasta el primero
      const j = Math.floor(Math.random() * (i + 1)); //en la vatiable j se guarda un número aleatorio, vamos a decir 7 por ejemplo
      const temp = array[i]; //en otra variable guardamos la posición de i, que es la última posición. Por ejemplo, digamos que sería 148
      array[i] = array[j]; //el mayor cambio ocurre aquí, ahora 148 cambia a 7
      array[j] = temp; // y 7 lo guardamos en esta variable, para que luego cambie a la posición anterior, es deci 147, se le re-asigne un nuevo valor aleatorio con j gracias al math.random y así sucesivamente
    }
    return array;
  }
  const artworkSlides = Shuffle(allArtworks);

  return (
    <div className="main-div">
      {!activeUser ? (
        <div className="intro-noUser">
          <h1>Welcome to the <span>Galaxlery</span></h1>
          <h4>where artist are made up of stardust</h4>
          <h3>Check out what make our artists shine</h3>
        </div>
      ) : (
        <div className="intro-user">
          <h2>
            Greetings, <span>{activeUser.username}</span>
          </h2>
          <h3>Check the artworks that your fellow artists have posted!</h3>
        </div>
      )}
      <div className="carousel-div">
        <Carousel slides={artworkSlides} />
      </div>
    </div>
  );
}
