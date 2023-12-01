import { useCallback, useState } from "react";
import { searchArtworks } from "../service/artworks";

export const useAllArtworks = () => {
  const [allArtworks, setAllArtworks] = useState([]);

  const getAllArtworks = useCallback(async () => {
    try {
      let art = "";
      let url = "http://localhost:3000/artworks";

      art = await searchArtworks(url); //aquí recibimos el json de lo que obtenemos del fetch
      setAllArtworks(art);
    } catch (e) {
      throw new Error(e);
    }
  }, []);

  return { getAllArtworks, allArtworks };
};
