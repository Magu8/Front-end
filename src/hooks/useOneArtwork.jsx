import { useCallback, useState } from "react";
import { searchArtworks } from "../service/artworks";

export const useOneArtwork = () => {
  const [oneArt, setOneArt] = useState([]);
  const getOneArt = useCallback(async (art) => {
    try {
      console.log(art);
      let tempArray = await Promise.all(
        art.map(async (artEl) => {
          return await searchArtworks(
            `http://localhost:3000/artworks/${artEl}`
          );
        })
      );

      setOneArt(tempArray);
    } catch (e) {
      throw new Error(e);
    }
  }, []);

  return { getOneArt, oneArt };
};
