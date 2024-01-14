import { createBrowserRouter } from "react-router-dom";
import Login from "../../pages/Admin/Login/Login";
import PreventLogIn from "../PreventLogin/PreventLogIn";
import AdminSite from "../../Layouts/AdminSite/AdminSite";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyRestaurants from "../../pages/Admin/MyRestaurant/MyRestaurant";
import AddEmployee from "../../pages/Admin/AddEmployee/AddEmployee";
import Statistics from "../../pages/Admin/Statistics/Statistics";
import AddDish from "../../pages/Admin/AddDish/AddDish";
import ErrorPage from "../../pages/Shared/ErrorPage/ErrorPage";
import ViewAsMyProfile from "../../pages/Admin/ViewEmployee/ViewAsMyProfile";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute><AdminSite /></PrivateRoute>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <MyRestaurants />
            },
            {
                path : '/my-profile',
                element : <ViewAsMyProfile/>
            },
            {
                path: '/restaurant/:restaurantName/branch/:branchName',
                element: <Statistics />
            },
            {
                path: '/restaurant/:restaurantName/branch/:branchName/add-dish',
                element: <AddDish />
            },
            {
                path: '/restaurant/:restaurantName/branch/:branchName/add-employee',
                element: <AddEmployee />
            },


        ]

    },
    {
        path: '/login',
        element: <PreventLogIn><Login /></PreventLogIn>
    }


])
