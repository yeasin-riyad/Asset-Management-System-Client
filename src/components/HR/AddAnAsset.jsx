import { useState } from "react";
import Swal from 'sweetalert2';
import axiosSecure from "../AxiosSecure";
import useAuth from "../useAuth";

const AddAnAsset = () => {
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [assetType, setAssetType] = useState("");

  const {currentUser}=useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !productType || !productQuantity || !assetType) {
      Swal.fire('Error!', 'Please fill out all fields.', 'error');
      return;
    }

    try {
      await axiosSecure.post('/manager-assets', {
        productName,
        productType,
        productQuantity: parseInt(productQuantity, 10),
        assetType,
        HREmail:currentUser?.email 
      });
      Swal.fire('Success!', 'Asset has been added.', 'success');
      // Clear the form
      setProductName("");
      setProductType("");
      setProductQuantity("");
      setAssetType("");
    } catch (error) {
      Swal.fire('Error!', 'Failed to add asset.', 'error');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
        <h2 className="text-2xl font-bold mb-4">Add New Asset</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Enter product name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Product Type</label>
            <input
              type="text"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Enter product type"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Product Quantity</label>
            <input
              type="number"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Enter product quantity"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Asset Type</label>
            <select
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select asset type</option>
              <option value="returnable">Returnable</option>
              <option value="non-returnable">Non-returnable</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAnAsset;
