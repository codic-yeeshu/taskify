import { API_URL } from "./utils";

// Helper function to get the token from local storage
const getAuthToken = () => {
  return localStorage.getItem("token"); // Adjust this if you store the token differently
};

export const CreateTask = async (taskObj) => {
  const url = `${API_URL}/tasks`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`, // Add Authorization header
    },
    body: JSON.stringify(taskObj),
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const GetAllTasks = async () => {
  const url = `${API_URL}/tasks`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`, // Add Authorization header
    },
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const DeleteTaskById = async (id) => {
  const url = `${API_URL}/tasks/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`, // Add Authorization header
    },
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const UpdateTaskById = async (id, reqBody) => {
  const url = `${API_URL}/tasks/${id}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`, // Add Authorization header
    },
    body: JSON.stringify(reqBody),
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};

// import { API_URL } from "./utils";

// export const CreateTask = async (taskObj) => {
//   const url = `${API_URL}/tasks`;
//   // console.log('url ', url)
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(taskObj),
//   };
//   try {
//     const result = await fetch(url, options);
//     const data = await result.json();
//     return data;
//   } catch (err) {
//     return err;
//   }
// };
// export const GetAllTasks = async () => {
//   const url = `${API_URL}/tasks`;
//   // console.log('url ', url)
//   const options = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   try {
//     const result = await fetch(url, options);
//     const data = await result.json();
//     return data;
//   } catch (err) {
//     return err;
//   }
// };

// export const DeleteTaskById = async (id) => {
//   const url = `${API_URL}/tasks/${id}`;
//   // console.log('url ', url)
//   const options = {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   try {
//     const result = await fetch(url, options);
//     const data = await result.json();
//     return data;
//   } catch (err) {
//     return err;
//   }
// };

// export const UpdateTaskById = async (id, reqBody) => {
//   const url = `${API_URL}/tasks/${id}`;
//   // console.log('url ', url)
//   const options = {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(reqBody),
//   };
//   try {
//     const result = await fetch(url, options);
//     const data = await result.json();
//     return data;
//   } catch (err) {
//     return err;
//   }
// };
