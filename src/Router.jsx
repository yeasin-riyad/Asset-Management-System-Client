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
const router = createBrowserRouter([

    {
        path:"/",
        element:<Main></Main>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:'join-hr',
                element:<JoinAsHR/>
            },
            {
                path:'join-employee',
                element:<JoinEmployee/>
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
                        element:<EmployeeHome/>,
            
                    },
                    {
                        path:'my-assets',
                        element:<MyAssets/>

                    },
                    {
                        path:'my-team',
                        element:<MyTeam/>
                    },
                    {
                        path:'request-for-an-asset',
                        element:<RequestForAnAsset/>
                    },
                    {
                        path:'my-profile',
                        element:<EmployeeProfile/>
                    }
                ]
            },
            {
                path:'hr',
                element:<HrMain></HrMain>,
                children:[
                    {
                        index:true,
                        element:<HrHome></HrHome>
                    },
                    {
                        path:'asset-list',
                        element:<AssetList></AssetList>
                    },
                    {
                        path:'add-an-asset',
                        element:<AddAnAsset></AddAnAsset>
                    },
                    {
                        path:'all-request',
                        element:<AllRequest></AllRequest>
                    },
                    {
                        path:'my-employee-list',
                        element:<MyEmployeeList></MyEmployeeList>
                    },
                    {
                        path:'add-an-employee',
                        element:<AddAnEmployee></AddAnEmployee>
                    },
                    {
                        path:'hr-profile',
                        element:<HrProfile></HrProfile>
                    }

                ]
            }
            
        ],

       
       
    },
    {
        path:'/login',
        element:<Login></Login>
    }

])

export default router;