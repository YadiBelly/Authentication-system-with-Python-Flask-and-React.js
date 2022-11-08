import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Login } from "../pages/Login.js";
export const Private = () => {
  const { store, actions } = useContext(Context);
  return (
    <div>
      {store.user ? (
        <p>
          Private Page,<button onClick={() => actions.Logout()}>Logout</button>
        </p>
      ) : (
        <Login />
      )}{" "}
    </div>
  );
  ß;
};
