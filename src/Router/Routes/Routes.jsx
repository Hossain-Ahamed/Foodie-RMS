import { createBrowserRouter } from "react-router-dom";
import Login from "../../pages/Admin/Login/Login";
import PreventLogIn from "../PreventLogin/PreventLogIn";
import AdminSite from "../../Layouts/AdminSite/AdminSite";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyRestaurants from "../../pages/Admin/MyRestaurant/MyRestaurant";
import Statistics from "../../pages/Admin/Statistics/Statistics";
import ErrorPage from "../../pages/Shared/ErrorPage/ErrorPage";
import ViewAsMyProfile from "../../pages/Admin/ViewEmployee/ViewAsMyProfile";
import OngoingOrders from "../../pages/Admin/Orders/OngoingOrders/OngoingOrders";
import DishCategory_Add from "../../pages/Admin/Dish_Category/DishCategory_Add/DishCategory_Add";
import DishCategory_List from "../../pages/Admin/Dish_Category/DishCategory_List/DishCategory_List";
import DishCategory_Edit from "../../pages/Admin/Dish_Category/DishCaregory_Edit/DishCatgory_Edit";
import AddEmployee from "../../pages/Admin/Employee/AddEmployee/AddEmployee";
import Dish_Add from "../../pages/Admin/DishManage/Dish_Add/Dish_Add";
import Dish_Edit from "../../pages/Admin/DishManage/DishEdit/Dish_Edit";
import EditRestaurant from "../../pages/Admin/EditRestaurant/EditRestaurant";
import TimeTable from "../../pages/Admin/ManageRestaurant/TimeTable/TimeTable";
import TableManagement from "../../pages/Admin/ManageRestaurant/TableManagement/TableManagement";
import CouponList from "../../pages/Admin/ManageOffer/ManageCoupon/CouponList/CouponList";
import AddCoupon from "../../pages/Admin/ManageOffer/ManageCoupon/AddCoupon/AddCoupon";
import ManagePaymentSystem from "../../pages/Admin/ManageRestaurant/ManagePaymentSystem/ManagePaymentSystem";

import Dish_List from "../../pages/Admin/DishManage/Dish_List/Dish_List";

import Test from "../../pages/Shared/VideoPlayer/Test";
import ViewAsAdmin from "../../pages/Admin/ViewEmployee/ViewAsAdmin";
import AddExpense from "../../pages/Admin/Expenses/AddExpense/AddExpense";
import SearchEmployeePage_ToAdd from "../../pages/Admin/Employee/AddEmployee/SearchEmployeePage_ToAdd";
import AddExistingEmployee from "../../pages/Admin/Employee/AddEmployee/AddExistingEmployee";
import EditEmployee from "../../pages/Admin/Employee/EditEmployee/EditEmployee";
import MembershipContainer from "../../pages/Admin/ManageOffer/ManageMembership/MembershipContainer/MembershipContainer";
import EditExpense from "../../pages/Admin/Expenses/EditExpense/EditExpense";
import ProtectedByRole from "../ProtectedByRole/ProtectedByRole";
import AllEmployeeList from "../../pages/Admin/Employee/AllEmployeeList/AllEmployeeList";
import AllBranches from "../../pages/Admin/AllBranches/AllBranches";
import BranchEdit from "../../pages/Admin/AllBranches/BranchEdit";
import AddBranch from './../../pages/Admin/ManageRestaurant/AddBranch/AddBranch';
import Payment from "../../pages/Others/Payment/Payment";
import Vendors from "../../pages/Admin/Expenses/Vendors/VendorsList";

import Reels from "../../pages/Admin/Promotionals/Reels/Reels";
import Story from "../../pages/Admin/Promotionals/Story/Story";
import InventoryReport from "../../pages/Admin/Inventory/InventoryReport/InventoryReport";
import RecipeList from "../../pages/Admin/Inventory/RecipeList/AddRecipe";

import AdminOrderPlace from "../../pages/Admin/Orders/AdminOrderPlace/AdminOrderPlace";
import AttendanceAdd from "../../pages/Admin/Employee/Attendance/AttendanceAdd";
import ExpenseList from "../../pages/Admin/Expenses/ExpensesAndSalary/ExpenseList/ExpenseList";
import PurchaseHistory from "../../pages/Admin/Expenses/ExpensesAndSalary/PurchaseHistory/PurchaseHistory";
import AddInventory from "../../pages/Admin/Inventory/AddInventory/AddInventory";





export const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute><AdminSite /></PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <MyRestaurants />
            },
            {
                path: '/my-profile',
                element: <ViewAsMyProfile />
            },
            {
                path: '/all-branches',
                element: <ProtectedByRole allowedRoles={['Super-Admin']}><AllBranches /></ProtectedByRole>
            },

            {
                path: '/branch-detail/edit/:branchID',
                element: <ProtectedByRole allowedRoles={['Super-Admin']}><BranchEdit /></ProtectedByRole>
            },
            {
                path: '/add-new-branch',
                element: <ProtectedByRole allowedRoles={['Super-Admin']}><AddBranch /></ProtectedByRole>
            },
            {
                path: '/edit-restaurant',
                element: <ProtectedByRole allowedRoles={['Super-Admin']}><EditRestaurant /></ProtectedByRole>
            },
            {
                path: '/:res_id/branch/:branchID',
                element: <ProtectedByRole allowedRoles={['Admin', 'Super-Admin']}><Statistics /></ProtectedByRole>
            },
            {
                path: '/reels',
                element: <ProtectedByRole allowedRoles={['Admin', 'Super-Admin']}><Reels /></ProtectedByRole>
            },
            {
                path: '/story',
                element: <ProtectedByRole allowedRoles={['Admin', 'Super-Admin']}><Story /></ProtectedByRole>
            },
            {
                path: '/manage-shifts',
                element: <TimeTable />
                // '/restaurant/:res_id/branch/:branchID/manage-shifts',
            },
            {
                path: '/manage-tables',
                element: <TableManagement />
                // '/restaurant/:res_id/branch/:branchID/manage-tables',
            },
            {
                path: '/manage-payment-system',
                element: <ManagePaymentSystem />
                // 'restaurant/:res_id/branch/:branchID/manage-payment-system',
            },
            {
                path: '/coupon-list',
                element: <CouponList />
            },
            {
                path: '/recipe/:dishID',
                element: <RecipeList />
            },
            {
                path: '/inventory-report',
                element: <InventoryReport />
            },
            {
                path: '/membership',
                element: <MembershipContainer />
            },
            {
                path: '/add-coupon',
                element: <AddCoupon />
            },
            {
                path: '/expenses',
                element: <ExpenseList />
                // '/restaurant/:res_id/branch/:branchID/expenses',
            },
            {
                path: '/purchase',
                element: <PurchaseHistory />
                // '/restaurant/:res_id/branch/:branchID/expenses',
            },
            {
                path: '/add-inventory',
                element: <AddInventory />
                // '/restaurant/:res_id/branch/:branchID/expenses',
            },
            {
                path: '/vendors',
                element: <Vendors />
                // '/restaurant/:res_id/branch/:branchID/expenses',
            },
            {
                path: '/add-expenses',
                element: <AddExpense />
                // '/restaurant/:res_id/branch/:branchID/add-expenses',
            },
            {
                path: '/edit-expenses/:expenseID',
                element: <EditExpense />
                // '/restaurant/:res_id/branch/:branchID/edit-expenses',
            },

            {
                path: '/category',
                element: <DishCategory_List />
                // '/restaurant/:res_id/branch/:branchID/category',
            },
            {
                path: '/add-category',
                element: <DishCategory_Add />
                // '/restaurant/:res_id/branch/:branchID/add-category',
            },
            {
                path: '/edit-category/:categoryID',
                element: <DishCategory_Edit />
                // '/restaurant/:res_id/branch/:branchID/edit-category/:categoryID',
            },
            {
                path: '/dish-list',
                element: <Dish_List />
                // '/restaurant/:res_id/branch/:branchID/dish-list',
            },
            {
                path: '/add-dish',
                element: <Dish_Add />
                // '/restaurant/:res_id/branch/:branchID/add-dish',
            },
            {
                path: '/edit-dish/:dishID',
                element: <Dish_Edit />
                // '/restaurant/:res_id/branch/:branchID/edit-dish/:dishID',
            },
            {
                path: '/add-employee',
                element: <SearchEmployeePage_ToAdd />
            },
            {
                path: '/add-new-employee',
                element: <AddEmployee />
                //    '/restaurant/:res_id/branch/:branchID/add-new-employee',
            },
            {
                path: '/add-existing-employee/:employeeID',
                element: <AddExistingEmployee />
                // '/restaurant/:res_id/branch/:branchID/add-existing-employee/:employeeID',
            },
            {
                path: '/update-employee-profile/:employeeID',
                element: <ProtectedByRole allowedRoles={['Admin', 'Super-Admin']}><EditEmployee /></ProtectedByRole>
                // '/restaurant/:res_id/branch/:branchID/update-employee-profile/:employeeID',
            },
            {
                path: '/view-employee/:employeeID',
                element: <ViewAsAdmin />
                // '/restaurant/:res_id/branch/:branchID/view-employee/:employeeID',
            },
            {
                path: '/add-attendance',
                element: <AttendanceAdd />
                // '/restaurant/:res_id/branch/:branchID/view-employee/:employeeID',
            },
            {
                path: '/ongoing-orders',
                element: <OngoingOrders />
                // '/restaurant/:res_id/branch/:branchID/ongoing-orders',
            },
            {
                path: '/employee-list',
                element: <AllEmployeeList />
                // '/restaurant/:res_id/branch/:branchID/employee-list',
            },
            {
                path: '/all-employee-list',
                element: <AllEmployeeList />
                // '/restaurant/:res_id/branch/:branchID/employee-list',
            },
            // {

            //     //payment page for admin to pay for a branch
            //     path: '/subscription-payment/:branchID',
            //     element: <Payment />

            // },
            {
                path: '/place-order',
                element: <AdminOrderPlace />
            },

            {
                path: '/place-order',
                element: <>
                </>
            }


        ]

    },
    {

        //payment page for admin to pay for a branch
        path: '/subscription-payment/:branchID',
        element: <Payment />

    },
    {
        path: '/login',
        element: <PreventLogIn><Login /></PreventLogIn>
    },
    {
        path: '/test',
        element: <Test />
    }


])
