import type { IUser } from "@/types/user";
import { createContext } from "react";

interface IAuthContext {
    loading: boolean;
    loggedIn: boolean;
    user: IUser | null;
    login: (user: IUser, access: string, csrf: string) => void;
    logout: () => void;
}
const initialState: IAuthContext = {
    loggedIn: false,
    loading: true,
    user: null,
    login: (_user: IUser, _access: string, _csrf: string) => {},// eslint-disable-line @typescript-eslint/no-unused-vars
    logout: () => {},
};

export const AuthContext = createContext<IAuthContext>(initialState);
