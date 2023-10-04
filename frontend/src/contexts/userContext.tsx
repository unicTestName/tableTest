import React, { useContext, useState, createContext } from "react";
import axios from "axios";

import { User } from "../helpers/types";

//TODO Migrate to unified CRUD context with loading and err states handling

type IState = {
  users?: Array<User> | undefined;
};

type IFunc = {
  fetchUsers: () => Promise<void>;
};

type Props = IState & IFunc;

const APIContext = createContext({} as Props);

export function UserContextProvider({ children }: any) {
  const [users, setUsers] = useState<Array<User> | undefined>(undefined);

  async function fetchUsers() {
    const { data } = await axios.get(
      // !!TODO process url domains via env
      "https://jsonplaceholder.typicode.com/users"
    );
    setUsers(data);
  }

  return (
    <APIContext.Provider
      value={{
        users,
        fetchUsers,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export function useUserAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
