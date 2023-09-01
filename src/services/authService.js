// const BASE_URL = "https://mapsback.exasolutions.gr";
const BASE_URL = "http://localhost:3000";


export const loginUser = async ({ username, password }) => {
  // Implement your login API request here
  // Return the response or throw an error
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username, //"admin@exa.com", //
      password: password, // "123456789", //
    }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  //   console.log(data);
  return data;
};




