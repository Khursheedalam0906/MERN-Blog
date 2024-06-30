import React, { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [usernamed, setUserName] = useState("");

  return (
    <DataContext.Provider value={{ name, setName, usernamed, setUserName }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
