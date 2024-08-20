import PendingRequests from "./PendingRequests";
import TopRequestedItems from "./TopRequestedItems";
import LimitedStockItems from "./LimitedStockItems";
import ReturnableNonReturnablePieChart from "./ReturnableNonReturnablePieChart";
import useAuth from "../useAuth";
import RecentApprovals from "./RecentApprovals";
import AssetRequestHistory from "./AssetRequestHistory";

const HrHome = () => {
  const {currentUser}=useAuth()
  const email=currentUser?.email;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center font-semibold text-gray-800 dark:text-gray-100 mb-4">HR Manager Dashboard</h1>
      <PendingRequests email={email} />
      <TopRequestedItems email={email} />
      <LimitedStockItems email={email} />
      <ReturnableNonReturnablePieChart email={email} />
      <RecentApprovals email={email}/>
      <AssetRequestHistory email={email}/>
    </div>
  );
};

export default HrHome;
