import Cookies from "js-cookie";

const BASE_URL = "https://mapsback.exasolutions.gr/"

export const getUsersService = async () => {
    const jwt = Cookies.get("jwtToken");
    const response = await fetch(`${BASE_URL}/users/`, {
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

  export const createUserService = async (user) => {
    console.log(user)
    if (!user || user === undefined) {
      throw new Error("Empty user");
    }
    const jwt = Cookies.get("jwtToken");
    const response = await fetch(`${BASE_URL}/users/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(user)
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

  export const updateUserService = async (user) => {
    console.log(user.userData)
    console.log(user.userId)
    
    if (!user || user === undefined) {
      throw new Error("Empty user");
    }

    let reqData = user.userData;
    if(reqData.password === "") {
      const { password: _, ...filteredUser } = reqData;
      reqData = filteredUser;
    }
    const jwt = Cookies.get("jwtToken");
    const response = await fetch(`${BASE_URL}/users/${user.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(reqData)
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

  export const deleteUserService = async (userId) => {
    console.log(userId)
    if (!userId || userId === undefined) {
      throw new Error("Empty user");
    }
    const jwt = Cookies.get("jwtToken");
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "DELETE",
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

