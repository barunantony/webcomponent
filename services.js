const API_KEY = '*your key*';
const url = `http://api.giphy.com/v1/gifs/trending?api_key=` + API_KEY + `&limit=1`;
export {API_KEY, url}; // export the url so that i can be used extrnally.