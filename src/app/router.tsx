import { createBrowserRouter, Navigate } from "react-router";
import Home from "../features/home/pages/Home";
import Dashboard from "../features/project/pages/Dashboard";
import SelectProject from "../features/project/pages/SelectProject";
import AuthGuard from "@/components/AuthGuard";
import Login from "@/features/auth/pages/Login";
import GoogleCallback from "@/features/auth/pages/GoogleCallback";
import ProjectLayout from "@/features/project/layouts/ProjectLayout";
import Devices from "@/features/project/pages/Devices";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Settings from "@/features/project/pages/Settings";

export const router = createBrowserRouter([{
    path: '/',
    errorElement: <ErrorBoundary />,
    children: [{
        index: true, Component: Home
    }, {
        path: 'auth',
        children: [{
            path: 'login',
            Component: Login
        }, {
            path: 'callback',
            children: [{
                path: 'google',
                Component: GoogleCallback
            }]
        }]
    }, {
        path: 'project',
        Component: AuthGuard,
        children: [{
            index: true,
            element: <Navigate to="select-project" replace />
        },{
            path: 'select-project',
            Component: SelectProject
        }, {
            path: ':projectId',
            Component: ProjectLayout,
            children: [{
                index: true,
                element: <Navigate to="dashboard" replace />
            }, {
                path: 'dashboard',
                Component: Dashboard
            }, {
                path: 'settings',
                Component: Settings
            }, {
                path: 'devices',
                Component: Devices
            }]
        }]
    }]
}])
