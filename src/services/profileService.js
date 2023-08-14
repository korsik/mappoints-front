import Cookies from "js-cookie";

const BASE_URL = "https://mapsback.exasolutions.gr/";
// const BASE_URL = "http://localhost:3000";

export const getProfilesSerivce = async (category_id) => {
    if (!category_id || category_id === undefined) {
      throw new Error("Request failed");
    }

    category_id = 'all';
    const jwt = Cookies.get("jwtToken");
    const response = await fetch(`${BASE_URL}/profiles/${category_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
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

  export const createProfilesService = async (profile) => {
    // console.log(jwt)
    const jwt = Cookies.get("jwtToken");
    profile.forEach((value, key) => {
      console.log(`Key: ${key}, Value: ${value}`);
    });
    // console.log(jwt)
      const response = await fetch(`${BASE_URL}/profiles/createProfileImage`, {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data",//"application/json",
            'Authorization': `Bearer ${jwt}`,
        },
        body: profile //JSON.stringify(profile)
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