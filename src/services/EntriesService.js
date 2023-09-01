import Cookies from "js-cookie";

// const BASE_URL = "https://mapsback.exasolutions.gr/";
const BASE_URL = "http://localhost:3000";


export const getEntries = async (category_id) => {
  if (!category_id || category_id === undefined) {
    throw new Error("Request failed");
  }
  const jwt = Cookies.get("jwtToken");
  const response = await fetch(`${BASE_URL}/entries/${category_id}`, {
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


export const createEntryService = async (entry, category_id) => {
  if (!entry || entry === undefined) {
    throw new Error("Empty entry");
  }
//   {
//     "name": "Demo Entry 2",
//     "address": "Demo Address 2",
//     "category": "3f00b620-1ac3-44b9-a915-a3793f38d823",
//     "lat": 35.3176536,
//     "long": 25.1209503
// }
  const jwt = Cookies.get("jwtToken");
  const response = await fetch(`${BASE_URL}/entries/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(entry)
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

export const updateEntryService = async (entry) => {
  if (!entry || entry === undefined) {
    throw new Error("Empty entry");
  }
  const jwt = Cookies.get("jwtToken");
  const response = await fetch(`${BASE_URL}/entries/${entry.entryId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(entry.entryData)
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


export const deleteEntryService = async (entryId) => {
  console.log(entryId)
  if (!entryId || entryId === undefined) {
    throw new Error("Empty entry");
  }
  const jwt = Cookies.get("jwtToken");
  const response = await fetch(`${BASE_URL}/entries/${entryId}`, {
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
