import { createBrowserRouter } from "react-router";
import Home from "../features/home/pages/Home";
import Dashboard from "../features/dashboard/pages/Dashboard";

export const router = createBrowserRouter([{
    path: '/',
    children: [{
        index: true, Component: Home
    }, {
        path: 'dashboard',
        Component: Dashboard
    }]
}])
