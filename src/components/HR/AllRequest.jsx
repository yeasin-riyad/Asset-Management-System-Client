import { useState } from "react";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../AxiosSecure";
import useAuth from "../useAuth";
import Title from "../Helmet";

const AllRequest = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  // Fetch unaffiliated users, affiliated count, and package limit
  const { data: unaffiliatedUsers = {} } = useQuery({
    queryKey: ["unaffiliatedUsers", currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/unaffiliated-users/${currentUser?.email}`
      );
      return data;
    },
  });

  // Get Current User Information...
  const { data: user = {} } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/my-Info/${currentUser?.email}`);
      return response.data;
    },
    enabled: !!currentUser?.email,
  });

  // Fetch requests with Tanstack Query
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["requests", searchTerm],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/employee-requested-assets-pending/${currentUser?.email}`,
        {
          params: {
            search: searchTerm,
          },
        }
      );
      return response.data;
    },
    enabled: !!currentUser?.email,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // Mutation for updating request status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, email }) => {
      if (status === "rejected") {
        await axiosSecure.patch(`/update-status/${id}`, { status });
      } else if (status === "approved") {
        const { affiliatedCount, packageLimit } = unaffiliatedUsers;
        if (
          !unaffiliatedUsers?.EmailArray.includes(email) &&
          parseInt(affiliatedCount) >= parseInt(packageLimit)
        ) {
      

          return Swal.fire({
            icon: "error",
            title: "Limit Exceeded",
            text: "You have reached the maximum number of affiliated members allowed by your package.",
            confirmButtonText: "Upgrade Package",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = `/packages?packageLimit=${packageLimit}`;
            }
          });
        } else {
          await axiosSecure.patch(`/update-status/${id}`, { status });
          await axiosSecure.patch(`/update-user-info/${email}`, {
            HrEmail: currentUser?.email,
            companyName: user?.companyName,
            companyLogoUrl: user?.companyLogoUrl,
          });
        }
      }
    },
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your request has been saved...",
        showConfirmButton: false,
        timer: 1500,
      });
      // Refetch the requests after a successful update
      queryClient.invalidateQueries(["requests"]);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update status.", "error");
    },
  });

  const handleStatusUpdate = async (id, status, email) => {
    const result = await Swal.fire({
      title: `Are you sure you want to ${status} this request?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${status} it!`,
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      updateStatusMutation.mutate({ id, status, email });
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search Section */}
      <Title title={"Manager || All-Request"}></Title>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by requester name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Requests List Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : requests.length === 0 ? (
          <div className="p-4 text-center bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-md dark:bg-yellow-900 dark:border-yellow-800 dark:text-yellow-300">
            No requests found.
          </div>
        ) : (
          requests.map((request) => (
            <div
              key={request._id}
              className="p-4 border rounded-md shadow-md dark:bg-gray-800 dark:text-white"
            >
              <h3 className="text-xl font-bold">{request.asset.productName}</h3>
              <p>Type: {request.asset.assetType}</p>
              <p>Email: {request.user.email}</p>
              <p>Name: {request.user.name}</p>
              <p>Date: {new Date(request.requestDate).toLocaleDateString()}</p>
              <p>Note: {request.notes}</p>
              <p>Status: {request.status}</p>
              <div className="flex gap-2 mt-4">
                <button
                  className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  onClick={() =>
                    handleStatusUpdate(
                      request._id,
                      "approved",
                      request?.user?.email
                    )
                  }
                >
                  Approve
                </button>
                <button
                  className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => handleStatusUpdate(request._id, "rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllRequest;
