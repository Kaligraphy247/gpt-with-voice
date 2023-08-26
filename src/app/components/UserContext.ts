import { createContext } from "react";

// export type UserContextType = {
//   token: string | null | undefined;
//   authenticatedEmail: string | null | undefined;
//   setToken: React.Dispatch<React.SetStateAction<string | null | undefined>>;
//   setAuthenticatedEmail: React.Dispatch<React.SetStateAction<string | null | undefined>>;
// };

// // export const UserContext = createContext<UserContextType>({token: null, setToken: () => {}});
// export const UserContext = createContext<UserContextType>({
//   token: null,
//   authenticatedEmail: null,
//   setToken: () => {},
//   setAuthenticatedEmail: () => {},
// });

export type User = {
  email?: string | null | undefined;
  token?: string | null | undefined;
  voicePreference?: string | null | undefined;
};
export type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

// export const UserContext = createContext<UserContextType>({token: null, setToken: () => {}});
export const UserContext = createContext<UserContextType | null>(null);
