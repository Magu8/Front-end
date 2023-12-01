export const searchArtworks = async (url) => {
  try {
    let response = await fetch(url);
    let data = await response.json();
    console.log();
    return data;
  } catch (e) {
    return new Error(e);
  }
};
