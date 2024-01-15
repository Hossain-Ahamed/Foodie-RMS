import { createBrowserRouter } from "react-router-dom";
import Login from "../../pages/Admin/Login/Login";
import PreventLogIn from "../PreventLogin/PreventLogIn";
import AdminSite from "../../Layouts/AdminSite/AdminSite";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyRestaurants from "../../pages/Admin/MyRestaurant/MyRestaurant";
import AddEmployee from "../../pages/Admin/AddEmployee/AddEmployee";
import Statistics from "../../pages/Admin/Statistics/Statistics";
import AddDish from "../../pages/Admin/Dish_Add/AddDish";
import ErrorPage from "../../pages/Shared/ErrorPage/ErrorPage";
import ViewAsMyProfile from "../../pages/Admin/ViewEmployee/ViewAsMyProfile";
import OngoingOrders from "../../pages/Admin/OngoingOrders/OngoingOrders";
import DishCategory_Add from "../../pages/Admin/Dish_Category/DishCategory_Add/DishCategory_Add";



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
                path: '/restaurant/:restaurantName/branch/:branchName/category',
                element: <AddDish />
            },
            {
                path: '/restaurant/:restaurantName/branch/:branchName/add-category',
                element: <DishCategory_Add />
            },
            {
                path: '/restaurant/:restaurantName/branch/:branchName/edit-category',
                element: <AddDish />
            },
            {
                path: '/restaurant/:restaurantName/branch/:branchName/dish',
                element: <AddDish />
            },
            {
                path: '/restaurant/:restaurantName/branch/:branchName/add-dish',
                element: <AddDish />
            },
            {
                path: '/restaurant/:restaurantName/branch/:branchName/add-employee',
                element: <AddEmployee />
            },
            {
                path: '/restaurant/:restaurantName/branch/:branchName/ongoing-orders',
                element: <OngoingOrders />
            },


        ]

    },
    {
        path: '/login',
        element: <PreventLogIn><Login /></PreventLogIn>
    }


])
