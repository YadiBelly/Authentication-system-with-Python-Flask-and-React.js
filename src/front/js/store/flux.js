const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: false,
    },
    actions: {
      // Use getActions to call a function within a fuction
      Logout: () => {
        setStore({ user: false });
      },
      createUser: (email, password) => {
        fetch(
          "https://3001-yadibelly-authenticatio-jv8tyn21aza.ws-us74.gitpod.io/api/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password }),
          }
        )
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.log("error", error));
      },
      loginUser: (email, password) => {
        fetch(
          "https://3001-yadibelly-authenticatio-jv8tyn21aza.ws-us74.gitpod.io/api/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password }),
          }
        )
          .then((response) => response.json())
          .then((result) => getActions().verifyUser(result.access_token))
          .catch((error) => console.log("error", error));
      },
      verifyUser: (token) => {
        fetch(
          "https://3001-yadibelly-authenticatio-jv8tyn21aza.ws-us74.gitpod.io/api/verifyUser",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        )
          .then((response) => response.json())
          .then((result) => setStore({ user: result }))
          .catch((error) => console.log("error", error));
      },
      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
