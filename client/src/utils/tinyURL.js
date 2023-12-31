// set tinyURL path
export const TINY_URL_PATH = `https://api.tinyurl.com/create?api_token=${process.env.REACT_APP_TINY_URL_KEY}`;

export const createURL = (token) => {
  let uri =
    process.env.NODE_ENV === "development"
      ? `${process.env.REACT_APP_DEVELOPMENT_URL}/resetpassword/${token?.token}`
      : `${process.env.REACT_APP_PRODUCTION_URL}/resetpassword/${token?.token}`; //fix

  let encodedURI = encodeURI(uri);

  // console.log(encodedURI);

  return { encodedURI, uri };
};

// TINY URL API CALL
export const getTinyURL = async (token, data = {}) => {
  const encodedURI = createURL(token);

  const response = await fetch(TINY_URL_PATH, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      url: encodedURI.encodedURI,
      domain: "tiny.one",
    }),
  });

  // console.log(response);
  // console.log(response.body);
  // console.log(response.json());

  return response.json(); // parses JSON response into native JavaScript object
};
