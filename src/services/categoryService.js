import Cookies from "js-cookie";

const BASE_URL = "https://mapsback.exasolutions.gr/";
// const BASE_URL = "http://localhost:3000";

export const getCategories = async () => {
  // console.log(jwt)
  const jwt = Cookies.get("jwtToken");
  // console.log(jwt)
    const response = await fetch(`${BASE_URL}/categories/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
          'Authorization': `Bearer ${jwt}`,
      },
    });
  
    if (response.status === 401) {
      return 401;
    }
  
    if (!response.ok) {
      throw new Error("Request failed");
    }
  
    const data = await response.json();
    return data;
  };

  export const createCategoryService = async (category) => {
    // console.log(jwt)
    const jwt = Cookies.get("jwtToken");
    // console.log(jwt)
      const response = await fetch(`${BASE_URL}/categories/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify(category)
      });
    
      if (response.status === 401) {
        return 401;
      }
    
      if (!response.ok) {
        throw new Error("Request failed");
      }
    
      const data = await response.json();
      return data;
    };