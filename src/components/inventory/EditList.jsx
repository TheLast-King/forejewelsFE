import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URLS from '../../config/config';

const Inventory = () => {

    const baseurl = API_URLS.baseurl;
    const req = API_URLS.request_base_url;
    const [inventory, setInventory] = useState([]);
    const [editableFields, setEditableFields] = useState({
        name: '',
        price: '',
        quantity: '',
        type: '',
    });
    const [editableRowIndex, setEditableRowIndex] = useState(null); 
    useEffect(() => {
        axios.get(`${baseurl}/${req}`)
            .then((res) => {
                console.log("Response ", res);
                setInventory(res.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    const handleEdit = (index) => {
        const item = inventory[index];
        setEditableFields({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            type: item.type,
        });
        setEditableRowIndex(index); 
    };

    const handleSave = (index) => {
        const updatedInventory = [...inventory];
        const modifiedFields = { ...editableFields };
        Object.keys(modifiedFields).forEach((key) => {
            if (modifiedFields[key] === '') {
                modifiedFields[key] = updatedInventory[index][key];
            }
        });
    
        updatedInventory[index] = {
            ...updatedInventory[index],
            ...modifiedFields,
        };
    
        // Update the inventory state with the modified data
        setInventory(prevInventory => {
            const newInventory = [...prevInventory];
            newInventory[index] = updatedInventory[index];
            return newInventory;
        });
    
        setEditableRowIndex(null); // Exit edit mode after saving
    
        // Log the updated row values
        console.log("Updated row:", updatedInventory[index]);
    };
    

    const handleInputChange = (event, field) => {
        const { value } = event.target;
        setEditableFields((prevFields) => ({
            ...prevFields,
            [field]: value,
        }));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Inventory</h1>
            <div className="">
                <table className="w-full border-collapse border border-gray-300">      
                <thead>
                        <tr>
                            <th className="w-20 border border-gray-300 px-4 py-2">Name</th>
                            <th className="w-20 border border-gray-300 px-4 py-2">Color</th>

                            <th className="w-20 border border-gray-300 px-4 py-2">Type</th>
                            <th className="w-20 border border-gray-300 px-4 py-2">Price</th>
                            <th className="w-20 border border-gray-300 px-4 py-2">Quantity</th>
                            <th className="w-20 border border-gray-300 px-4 py-2">Size</th>

                            <th className="w-20 border border-gray-300 px-4 py-2">Actions</th> {/* New column for edit button */}
                          
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map((data, index) => (
                            <tr key={index}>
                               
                                            <td className="w-24 border border-gray-300 px-4 py-2">
                                    {
                                        data.name
                                    }
                                </td>
                                <td className="w-24 border border-gray-300 px-4 py-2">
                                    Orange
                                </td>
                               
                                <td className="w-24 border border-gray-300 px-4 py-2">                                     
                                  { data.type  }     
                                      </td>

         <td className="w-28 border border-gray-300 px-4 py-2">
             {editableRowIndex === index ? (
                 <input type="number"  className="w-28 border-blue-500 border-2 px-2 py-1" defaultValue={data.price} 
                   onChange={(event) => handleInputChange(event, 'price')}
                                           
 />
             ) : (
                 data.price
             )}
         </td>
         <td className="w-28 border border-gray-300 px-4 py-2">
             {editableRowIndex === index ? (
                 <input type="number" className="w-28 border-blue-500 border-2 px-2 py-1" defaultValue={data.quantity} 
                    onChange={(event) => handleInputChange(event, 'quantity')}

                 />
             ) : (
                 data.quantity
             )}
         </td>
         <td className="w- 24 border border-gray-300 px-4 py-2">
         {editableRowIndex === index ? (
                 <input type="text"  className="w-24 border-blue-500 border-2 px-2 py-1" defaultValue={data.size} 
                                       onChange={(event) => handleInputChange(event, 'size')}

                 />
             ) : (
                 data.size
             )}                                 
         </td>
        


                                <td className="border border-gray-300 px-4 py-2">
                                    {editableRowIndex === index ? (
                                        <button
                                            onClick={() => handleSave(index)}
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(index)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;
