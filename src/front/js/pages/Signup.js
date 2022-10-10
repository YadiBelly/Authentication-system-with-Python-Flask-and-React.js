import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const { store, actions } = useContext(Context);
  return (
    <>
      <div class="mb-3 row">
        <label for="staticEmail" class="col-sm-2 col-form-label">
          Email
        </label>
        <div class="col-sm-10">
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            class="form-control"
            id="staticEmail"
          />
        </div>
      </div>
      <div class="mb-3 row">
        <label for="inputPassword" class="col-sm-2 col-form-label">
          Password
        </label>
        <div class="col-sm-10">
          <input
            type="text"
            onChange={(e) => setPasword(e.target.value)}
            class="form-control"
            id="staticPassword"
          />
        </div>
        <button
          onClick={() => {
            actions.createUser({ email: email, password: password });
          }}
        >
          click here
        </button>
      </div>
    </>
  );
};
