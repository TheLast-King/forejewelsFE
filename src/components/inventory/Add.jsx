import React, { useState } from 'react';
import axios from 'axios';

const AddInventory = () => {

 
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    color: '',
    price: 0,
    quantity: 0,
    type: 'beads',
    size: '',
  });

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);  
    try {
      const response = await axios.post(`${baseurl}/${req}`, formData);
      console.log('Response:', response.data);
      setFormData({
        name: '',
        color: '',
        price: 0,
        quantity: 0,
        type: '',
        size: '',
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Error:', error.response.data); // Log the specific error response from the server
    }
  };
  


  return (
    <div className="m-4">
      <button
        onClick={toggleForm}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Inventory
      </button>
      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-4">

          <div className='flex flex-col md:flex-row'>
         
            <div className="m-2 flex-1 md:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-400 rounded-md p-2 w-full"
                required
              />
            </div>
            

            <div className="m-2 flex-1 md:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
                Color
              </label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="border border-gray-400 rounded-md p-2  w-full"
                required
              />
            </div>

            <div className="m-2 flex-1 md:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="border border-gray-400 rounded-md p-2  w-full"
                required
              />
            </div>

            <div className="m-2 w-full md:w-auto">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="border border-gray-400 rounded-md p-2 w-full"
                required
              />
            </div>

            <div className="m-2 w-full md:w-auto">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="size">
                Size
              </label>
              <input
                type="text"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="border border-gray-400 rounded-md p-2 w-full"
                required
              />
            </div>

            <div className="m-2 w-full md:w-auto">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="border border-gray-400 rounded-md p-2 w-full"
                required
              >
                <option value="Beads">Beads</option>
                <option value="Lock">Lock</option>
                <option value="Colorful charm">Colorful charm</option>
                <option value="Balls">Balls</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default AddInventory;
