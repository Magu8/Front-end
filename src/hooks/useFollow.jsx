import { useCallback, useState } from "react";
import { searchArtworks } from "../service/artworks";

export const useFollow = () => {
  const [follow, setFollow] = useState([]);
  const getFollowingArt = useCallback(async (author) => {
    try {
      let tempArray = await Promise.all(
        author.map(async (user) => {
          return await searchArtworks(
            `http://localhost:3000/artworks/${user}/byAuthor`
          );
        })
      );

      setFollow(tempArray);
    } catch (e) {
      throw new Error(e);
    }
  }, []);

  return { getFollowingArt, follow };
};
