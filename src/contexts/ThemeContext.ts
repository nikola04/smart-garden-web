import { createContext } from "react";

export type Theme = "system"|"dark"|"light"

export interface IThemeContext {
    theme: Theme|null,
    setTheme: (theme: Theme) => void
}
const initialState: IThemeContext = {
    theme: null,
    setTheme: () => {}
};

export const ThemeContext = createContext<IThemeContext>(initialState);
