"use client";
import { useState, useEffect } from "react";
import {
  UserContext,
  User,
  UserContextType,
} from "@/app/components/UserContext";

// import

/**
 * Wraps the provided React components with the AppContext.
 *
 * It contains the user token, which will be used for subsequent requests.
 *
 * @param {Object} props - The props passed to the component.
 * @param {React.ReactNode} props.children - The child components to be wrapped.
 * @param {string | null | undefined} props.context - The context value to be provided to the UserContext.
 * @return {React.ReactNode} The wrapped components with the AppContext.
 */
export default function AppContextWrapper({
  children,
  context,
}: {
  children: React.ReactNode;
  context: any;
}) {
  // ? START
  const storedUser =
    typeof window !== "undefined" && window.localStorage.getItem("user");
  const initialUser: User = storedUser ? JSON.parse(storedUser) : context;
  const [user, setUser] = useState<User>(initialUser);

  useEffect(() => {
    window.localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const userContextValue: UserContextType = {
    user,
    setUser,
  };

  // ? END
  // console.log(token);
  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}
