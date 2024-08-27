import { useState } from "react";
import useManagerAssets from "./useManagerAssets";
import Swal from "sweetalert2";
import axiosSecure from "../AxiosSecure";
import Title from "../Helmet";

const AssetList = () => {
  const { data: assets, isLoading, error, refetch } = useManagerAssets();

  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAsset, setCurrentAsset] = useState(null);

  // Open modal and set current asset
  const openUpdateModal = (asset) => {
    setCurrentAsset(asset);
    setIsModalOpen(true);
  };

  // Close modal
  const closeUpdateModal = () => {
    setIsModalOpen(false);
    setCurrentAsset(null);
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedAsset = { ...currentAsset, productQuantity: parseInt(currentAsset.productQuantity) };
  
    try {
      await axiosSecure.put(`/manager-assets/${updatedAsset._id}`, updatedAsset);
      Swal.fire('Updated!', 'Asset has been updated.', 'success');
      refetch();
      closeUpdateModal();
    } catch (error) {
      Swal.fire('Error!', 'Failed to update asset.', 'error');
    }
  };
  

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axiosSecure.delete(`/manager-assets/${id}`);
        Swal.fire("Deleted!", "Asset has been deleted.", "success");
      }
      refetch();
    } catch (error) {
      Swal.fire("Error!", "Failed to delete asset.", "error");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading assets.</div>;
  }

  const filteredAssets = assets
    ?.filter((asset) => {
      // Filter by search term
      if (
        searchTerm &&
        !asset.productName.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      // Filter by stock status
      if (stockFilter === "available" && asset.productQuantity <= 0) {
        return false;
      }
      if (stockFilter === "out-of-stock" && asset.productQuantity > 0) {
        return false;
      }
      // Filter by asset type
      if (typeFilter !== "all" && asset.assetType !== typeFilter) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      // Sort by quantity
      if (sortOrder === "asc") {
        return a.productQuantity - b.productQuantity;
      } else {
        return b.productQuantity - a.productQuantity;
      }
    });

  return (
    <div className="container mx-auto p-4">
            <Title title={"Manager || Asset-List"}></Title>

      {/* Search Section */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by product name"
          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filters and Sorting Section */}
      <div className="mb-4 flex flex-wrap gap-4">
        {/* Filter by Stock Status */}
        <div>
          <label className="mr-2">Stock Status:</label>
          <select
            className="p-2 border rounded-md dark:bg-gray-800 dark:text-white"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="out-of-stock">Out-of-stock</option>
          </select>
        </div>

        {/* Filter by Asset Type */}
        <div>
          <label className="mr-2">Asset Type:</label>
          <select
            className="p-2 border rounded-md dark:bg-gray-800 dark:text-white"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="returnable">Returnable</option>
            <option value="non-returnable">Non-returnable</option>
          </select>
        </div>

        {/* Sort by Quantity */}
        <div>
          <label className="mr-2">Sort by Quantity:</label>
          <select
            className="p-2 border rounded-md dark:bg-gray-800 dark:text-white"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* List Section */}
      {filteredAssets?.length === 0 ? (
        <div className="p-4 text-center bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-md dark:bg-yellow-900 dark:border-yellow-800 dark:text-yellow-300">
          No assets match the selected filters. Please adjust your filters or
          try a different search term.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAssets?.map((asset) => (
            <div
              key={asset._id}
              className="p-4 border rounded-md shadow-md dark:bg-gray-800 dark:text-white"
            >
              <h3 className="text-xl font-bold">{asset.productName}</h3>
              <p>Type: {asset.productType}</p>
              <p>Quantity: {asset.productQuantity}</p>
              <p>
                Date Added: {new Date(asset.dateAdded).toLocaleDateString()}
              </p>
              <div className="mt-4 flex justify-between">
                <button
                  className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={() => openUpdateModal(asset)}
                >
                  Update
                </button>
                <button
                  className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => handleDelete(asset._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {isModalOpen && currentAsset && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
            <h2 className="text-2xl mb-4">Update Asset</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block mb-2">Product Name</label>
                <input
                  type="text"
                  value={currentAsset.productName}
                  onChange={(e) =>
                    setCurrentAsset({
                      ...currentAsset,
                      productName: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Product Type</label>
                <input
                  type="text"
                  value={currentAsset.productType}
                  onChange={(e) =>
                    setCurrentAsset({
                      ...currentAsset,
                      productType: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Quantity</label>
                <input
                  type="number"
                  value={currentAsset.productQuantity}
                  onChange={(e) =>
                    setCurrentAsset({
                      ...currentAsset,
                      productQuantity: parseInt(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Stock Status</label>
                <input
                  type="text"
                  value={currentAsset.stockStatus}
                  onChange={(e) =>
                    setCurrentAsset({
                      ...currentAsset,
                      stockStatus: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  onClick={closeUpdateModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetList;
