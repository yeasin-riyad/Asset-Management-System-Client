import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axiosSecure from '../AxiosSecure';

const RequestForAnAsset = () => {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [assetTypeFilter, setAssetTypeFilter] = useState('');

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axiosSecure.get('/assets', {
          params: {
            search: searchTerm,
            filter: JSON.stringify({
              availability: availabilityFilter,
              assetType: assetTypeFilter
            })
          }
        });
        setAssets(response.data);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, [searchTerm, availabilityFilter, assetTypeFilter]);

  const handleRequest = async (asset) => {
    const { value: formValues } = await Swal.fire({
      title: 'Request Asset',
      html: `
        <div>
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

      try {
        await axiosSecure.post(`/request-asset/${asset._id}`, { quantity, notes });
        Swal.fire('Success!', 'Your request has been submitted.', 'success');
        setAssets(assets.map(a => a._id === asset._id ? { ...a, productQuantity: a.productQuantity - quantity } : a)); // Update UI
      } catch (error) {
        Swal.fire('Error!', 'Failed to submit the request.', 'error');
      }
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
