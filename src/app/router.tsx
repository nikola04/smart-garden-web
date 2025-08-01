import { createBrowserRouter } from "react-router";
import Home from "../features/home/pages/Home";
import Dashboard from "../features/project/pages/Dashboard";
import SelectProject from "../features/project/pages/SelectProject";
import AuthGuard from "@/components/AuthGuard";
import Login from "@/features/auth/pages/Login";

export const router = createBrowserRouter([{
    path: '/',
    children: [{
        index: true, Component: Home
    }, {
        path: 'auth',
        children: [{
            path: 'login',
            Component: Login
        }]
    }, {
        path: 'project',
        Component: AuthGuard,
        children: [{
            index: true,
            Component: SelectProject
        },{
            path: 'select-project',
            Component: SelectProject
        }, {
            path: ':projectId',
            children: [{
                index: true,
                Component: Dashboard
            }, {
                path: 'dashboard',
                Component: Dashboard
            }]
        }]
    }]
}])
