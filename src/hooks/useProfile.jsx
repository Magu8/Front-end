import { useCallback, useState } from "react";
import { searchProfiles } from "../service/profiles";

export const useProfile = () => {
  const [profile, setProfile] = useState([]);

  const getProfile = useCallback(async (username) => {
    try {
      let user = "";
      console.log(username);
      user = await searchProfiles(username);
      setProfile(user);
    } catch (e) {
      throw new Error(e);
    }
  }, []);

  return { getProfile, profile };
};
