import { createBrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import Home from "./components/NoLogged/Home";
import JoinAsHR from "./components/JoinAsHR";
import Packages from "./components/HR/Packages";
import Login from "./components/Login";
import JoinEmployee from "./components/Employee/JoinEmployee";
import EmployeeHome from "./components/Employee/EmployeeHome";
import EmployeeMain from "./components/Employee/EmployeeMain";
import MyAssets from "./components/Employee/MyAssets";
import MyTeam from "./components/Employee/MyTeam";
import RequestForAnAsset from "./components/Employee/RequestForAnAsset";
import EmployeeProfile from "./components/Employee/EmployeeProfile";
import HrMain from "./components/HR/HrMain";
import HrHome from "./components/HR/HrHome";
import AssetList from "./components/HR/AssetList";
import AddAnAsset from "./components/HR/AddAnAsset";
import AllRequest from "./components/HR/AllRequest";
import MyEmployeeList from "./components/HR/MyEmployeeList";
import AddAnEmployee from "./components/HR/AddAnEmployee";
import HrProfile from "./components/HR/HrProfile";
import EmployeePrivate from "./components/Employee/EmpoyeePrivate";
import ManagerPrivate from "./components/HR/ManagerPrivate";
import ErrorPage from "./ErrorPage";
import NonUserPrivate from "./components/NoLogged/NonUserPrivate";
import CheckPayment from "./components/HR/CheckPayment";
import AdminMain from "./AdminMain";
import Admin from "./Admin";
import AdminPrivate from "./AdminPrivate";
import ManagerBlockedMessage from "./components/HR/ManagerBlockedMessage";
const router = createBrowserRouter([

    {
        path:"/",
        element:<Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                index:true,
                element:<NonUserPrivate><Home/></NonUserPrivate>
            },
            {
                path:'join-hr',
                element:<NonUserPrivate><JoinAsHR/></NonUserPrivate>
            },
            {
                path:'join-employee',
                element:<NonUserPrivate><JoinEmployee/></NonUserPrivate>
            },
            {
                path:'packages',
                element:<Packages/>
            },
          
         

            {
                path:'employee',
                element:<EmployeeMain/>,
                children:[
                    {
                        index:true,
                        element:<EmployeePrivate><EmployeeHome/></EmployeePrivate>,
            
                    },
                    {
                        path:'my-assets',
                        element:<EmployeePrivate><MyAssets/></EmployeePrivate>

                    },
                    {
                        path:'my-team',
                        element:<EmployeePrivate><MyTeam/></EmployeePrivate>
                    },
                    {
                        path:'request-for-an-asset',
                        element:<EmployeePrivate><RequestForAnAsset/></EmployeePrivate>
                    },
                    {
                        path:'my-profile',
                        element:<EmployeePrivate><EmployeeProfile/></EmployeePrivate>
                    }
                ]
            },
            {
                path:'hr',
                element:<HrMain></HrMain>,
                children:[
                    {
                        index:true,
                        element:<ManagerPrivate><CheckPayment><HrHome></HrHome></CheckPayment></ManagerPrivate>
                    },
                    {
                        path:'asset-list',
                        element:<ManagerPrivate><CheckPayment><AssetList></AssetList></CheckPayment></ManagerPrivate>
                    },
                    {
                        path:'add-an-asset',
                        element:<ManagerPrivate><CheckPayment><AddAnAsset></AddAnAsset></CheckPayment></ManagerPrivate>
                    },
                    {
                        path:'all-request',
                        element:<ManagerPrivate><CheckPayment><AllRequest></AllRequest></CheckPayment></ManagerPrivate>
                    },
                    {
                        path:'my-employee-list',
                        element:<ManagerPrivate><CheckPayment><MyEmployeeList></MyEmployeeList></CheckPayment></ManagerPrivate>
                    },
                    {
                        path:'add-an-employee',
                        element:<ManagerPrivate><CheckPayment><AddAnEmployee></AddAnEmployee></CheckPayment></ManagerPrivate>
                    },
                    {
                        path:'hr-profile',
                        element:<ManagerPrivate><HrProfile></HrProfile></ManagerPrivate>
                    },

                    {path:'manager-block',
                        element:<ManagerBlockedMessage></ManagerBlockedMessage>
                    }
                   

                ]
            },
            {
                path:'admin',
                element:<AdminMain></AdminMain>,
                children:[
                    {
                        index:true,
                        element:<AdminPrivate><Admin></Admin></AdminPrivate>
                    }
                ]
            }
            
        ],

       
       
    },
    {
        path:'/login',
        element:<Login></Login>
    },
    

])

export default router;