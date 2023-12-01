import { useCallback, useState } from "react";
import { faveOrRemove } from "../service/faveRemove";

export const useRemoveFave = () => {
  const [removedFave, setRemovedFave] = useState([]);

  const removeFromFaves = useCallback(
    async (activeUsername, artworkId, token) => {
      try {
        let remove = "";
        let url = `http://localhost:3000/artworks/${activeUsername}/removeFromFav/${artworkId}`;
        remove = await faveOrRemove(url, token);
        setRemovedFave(remove);
      } catch (e) {
        throw new Error(e);
      }
    },
    []
  );

  return { removeFromFaves, removedFave };
};
