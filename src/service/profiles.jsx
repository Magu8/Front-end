export const searchProfiles = async (username) => {
    try {
      let response = await fetch(`http://localhost:3000/users/profile/${username}`);
      let data = await response.json();
      return data;
    } catch (e) {
      return new Error(e);
    }
  };