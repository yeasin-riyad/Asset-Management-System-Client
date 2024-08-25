import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axiosSecure from '../AxiosSecure';
import useAuth from '../useAuth';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyAssetPDF from './MyAssetPDF';

const MyAssets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  // Fetch requested assets
  const { data: assets = [], isLoading: isAssetsLoading } = useQuery({
    queryKey: ['employeeRequestedAssets', searchTerm, statusFilter, typeFilter, currentUser?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/employee-requested/${currentUser?.email}`, {
        params: {
          search: searchTerm,
          status: statusFilter,
          type: typeFilter,
        },
      });
      return response.data;
    },
    enabled: !!currentUser?.email,
  });

  // Cancel request mutation
  const cancelRequestMutation = useMutation({
    mutationFn: async ({assetId}) => {
      await axiosSecure.delete(`/employee-requested/${assetId}`);

    },
    onSuccess: () => {
      Swal.fire('Cancelled', 'Your request has been cancelled.', 'success');
      queryClient.invalidateQueries({ queryKey: ['employeeRequestedAssets'] });
    },
    onError: () => {
      Swal.fire('Error', 'Failed to cancel the request.', 'error');
    },
  });

  // Return asset mutation
  const returnAssetMutation = useMutation({
    mutationFn: async ({assetId,quantity}) => {
      await axiosSecure.patch(`/update-status/${assetId}`,{status:"returned"});
    },
    onSuccess: () => {
      Swal.fire('Returned', 'The asset has been returned.', 'success');
      queryClient.invalidateQueries({ queryKey: ['employeeRequestedAssets'] });
    },
    onError: () => {
      Swal.fire('Error', 'Failed to return the asset.', 'error');
    },
  });

  const handleCancelRequest = (assetId) => {
    
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        cancelRequestMutation.mutate({assetId});
      }
    });
  };

  const handleReturnAsset = (assetId,asset) => {
    const  totalAssets=parseInt(asset?.asset.productQuantity)+parseInt(asset?.quantity)

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to return this asset?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, return it!',
    }).then((result) => {
      if (result.isConfirmed) {
        returnAssetMutation.mutate({assetId,quantity:totalAssets});
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search Section */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by asset name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Filter Section */}
      <div className="mb-4 flex gap-4">
        <div>
          <label className="mr-2">Request Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>
        </div>

        <div>
          <label className="mr-2">Asset Type:</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          >
            <option value="">All</option>
            <option value="returnable">Returnable</option>
            <option value="non-returnable">Non-returnable</option>
          </select>
        </div>
      </div>

      {/* Asset List Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isAssetsLoading ? (
          <div>Loading assets...</div>
        ) : assets.length === 0 ? (
          <div className="p-4 text-center bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-md dark:bg-yellow-900 dark:border-yellow-800 dark:text-yellow-300">
            No assets found. Please adjust your search or filters.
          </div>
        ) : (
          assets.map((asset) => (
            <div key={asset._id} className="p-4 border rounded-md shadow-md dark:bg-gray-800 dark:text-white">
              <h3 className="text-xl font-bold">{asset.asset.productName}</h3>
              <p>Type: {asset.asset.assetType}</p>
              <p>Request Date: {new Date(asset.requestDate).toLocaleDateString()}</p>
              <p>Approval Date: {asset.status === 'approved' ? new Date(asset.approvalDate).toLocaleDateString() : 'N/A'}</p>
              <p>Status: {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}</p>
              <div className="mt-4">
                {asset.status === 'pending' && (
                  <button
                    onClick={() => handleCancelRequest(asset._id)}
                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Cancel Request
                  </button>
                )}
                {asset.status === 'approved' && (
                  <>
                    <PDFDownloadLink
                      document={<MyAssetPDF asset={asset} />}
                      fileName={`${asset.asset.productName}_details.pdf`}
                    >
                      {({ loading }) =>
                        loading ? (
                          <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Loading...</button>
                        ) : (
                          <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Print</button>
                        )
                      }
                    </PDFDownloadLink>
                    {asset.asset.assetType === 'returnable' && (
                      <button
                        onClick={() => handleReturnAsset(asset._id,asset)}
                        className="p-2 ml-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        disabled={asset.status === 'returned'}
                      >
                        {asset.status === 'returned' ? 'Returned' : 'Return'}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAssets;
