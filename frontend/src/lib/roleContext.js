import { createContext, useContext, useState } from "react";

const RoleContext = createContext(null);

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState("customer");
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used inside RoleProvider");
  return ctx;
};
