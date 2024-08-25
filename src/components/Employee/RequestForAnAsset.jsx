import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axiosSecure from '../AxiosSecure';
import useAuth from '../useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const RequestForAnAsset = () => {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [assetTypeFilter, setAssetTypeFilter] = useState('');
  const [managerEmail,setManagerEmail]=useState(null)
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();


  useEffect(() => {
    const fetchAssetsAndRequests = async () => {
      try {
        const [HrEmail,assetsResponse, ] = await Promise.all([
          await axiosSecure.get(`/my-hr/${currentUser?.email}`),

         await axiosSecure.get(`/assets/${managerEmail}`, {
            params: {
              search: searchTerm,
              filter: {
                availability: availabilityFilter,
                assetType: assetTypeFilter
              }
            }
          }),

        ]);
        setManagerEmail(HrEmail?.data)
        setAssets(assetsResponse.data);
      } catch (error) {
        console.error('Error fetching assets or requests:', error);
      }
    };


    fetchAssetsAndRequests();



  }, [searchTerm, availabilityFilter, assetTypeFilter, currentUser?.email,managerEmail]);

    // Fetch Pending Requests
    const { data: requests = [], refetch} = useQuery({
      queryKey: ['pendingRequests', currentUser?.email],
      queryFn: async () => {
        const response = await axiosSecure.get(`/employee-requested-assets-pending-requests/${currentUser?.email}`);
        return response.data;
      },
      enabled: !!currentUser?.email, 
      
    });

     // Mutation to Request an Asset
  const requestMutation = useMutation({
    mutationFn: async ({ asset, quantity, notes }) => {
      const requestDate = new Date();
      const user = {
        name: currentUser?.displayName,
        email: currentUser?.email,
      };
      const status = 'pending';

      const response = await axiosSecure.post('/request-asset', {
        asset,
        quantity,
        notes,
        requestDate,
        user,
        status,
      });

      return response.data;
    },
    onSuccess: () => {
      Swal.fire('Success!', 'Your request has been submitted.', 'success');
      // queryClient.invalidateQueries(['assets', searchTerm, availabilityFilter, assetTypeFilter, managerEmail]);
      queryClient.invalidateQueries(['pendingRequests', currentUser?.email]);
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to submit the request.', 'error');
    },
  });
  


  const handleRequest = async (asset) => {
    refetch()
    const existingRequest = requests.find(request => 
      request?.asset?._id === asset?._id && request?.user.email === currentUser?.email && request?.status === 'pending'
    );

    if (existingRequest) {
      Swal.fire('Request Already Exists', 'You have already requested this asset and it is pending approval.', 'warning');
      return;
    }

    const { value: formValues } = await Swal.fire({
      title: 'Request Asset',
      html: `
        <div>
          <p>Product Name: ${asset.productName}</p>
          <p>Available Quantity: ${asset.productQuantity}</p>
          <input id="quantity" class="swal2-input" placeholder="Quantity" type="number" min="1" max="${asset.productQuantity}">
          <textarea id="notes" class="swal2-textarea" placeholder="Additional Notes"></textarea>
        </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const quantity = document.getElementById('quantity').value;
        const notes = document.getElementById('notes').value;
        return { quantity, notes };
      },
      confirmButtonText: 'Request',
      cancelButtonText: 'Cancel',
      showCancelButton: true
    });

    if (formValues) {
      const { quantity, notes } = formValues;
      if (quantity <= 0 || quantity > asset.productQuantity) {
        Swal.fire('Invalid Quantity', 'Please enter a valid quantity.', 'error');
        return;
      }

      requestMutation.mutate({ asset, quantity, notes });


      

        
    }
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
          <label className="mr-2">Availability:</label>
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          >
            <option value="">All</option>
            <option value="available">Available</option>
            <option value="out-of-stock">Out-of-stock</option>
          </select>
        </div>

        <div>
          <label className="mr-2">Asset Type:</label>
          <select
            value={assetTypeFilter}
            onChange={(e) => setAssetTypeFilter(e.target.value)}
            className="p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          >
            <option value="">All</option>
            <option value="returnable">Returnable</option>
            <option value="non-returnable">Non-returnable</option>
          </select>
        </div>
      </div>

      {/* Assets List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.length === 0 ? (
          <div className="p-4 text-center bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-md dark:bg-yellow-900 dark:border-yellow-800 dark:text-yellow-300">
            No assets found. Please adjust your search or filters.
          </div>
        ) : (
          assets.map((asset) => (
            <div key={asset._id} className="p-4 border rounded-md shadow-md dark:bg-gray-800 dark:text-white">
              <h3 className="text-xl font-bold">{asset.productName}</h3>
              <p>Type: {asset.assetType}</p>
              <p>Availability: {asset.productQuantity > 0 ? 'Available' : 'Out of stock'}</p>
              <button
                className={`p-2 mt-4 ${asset.productQuantity > 0 ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded-md hover:bg-blue-600`}
                onClick={() => asset.productQuantity > 0 && handleRequest(asset)}
                disabled={asset.productQuantity <= 0}
              >
                Request
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RequestForAnAsset;
