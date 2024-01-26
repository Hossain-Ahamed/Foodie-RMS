// TableManagement.js
import React, { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useQuery, useMutation } from 'react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import QRCode from 'qrcode.react';



const TableManagement = () => {
    const { handleSubmit, control, setValue } = useForm();
    const axiosSecure = useAxiosSecure();
    const { res_id, branchID ,res_name } = useRestauarantAndBranch();

    // Fetch existing table data
    const { data: existingTableData = [], isLoading: existingTableLoading, error: existingTableError, refetch: tableRefetch } = useQuery(
        ['tabledata', res_id, branchID],
        {
            enabled: true,
            cacheTime: 0,
            queryFn: async () => {
                // const res = await axiosSecure.get(`/restaurant/${res_id}/branch/${branchID}/tables`);
                return [
                    { number: 1, capacity: 4, location: 'Window', qrCodeData: 'flowbite.com/docs/components/buttons/' },
                    { number: 2, capacity: 6, location: 'Center', qrCodeData: 'flowbite.com/docs/components/buttons/' },
                    // Add more tables as needed
                ];
            },
        }
    );

    // Mutation for adding a new table
    const addTableMutation = useMutation(
        async (newTableData) => {
            const res = await axiosSecure.post(`/restaurant/${res_id}/branch/${branchID}/tables`, newTableData);
            return res?.data;
        },
        {
            onSuccess: () => {
                // Refetch existing table data after a new table is added
                tableRefetch();
                // Show success message using SweetAlert
                Swal.fire('Success', 'Table added successfully!', 'success');
            },
            onError: () => {
                // Show error message using SweetAlert
                Swal.fire('Error', 'An error occurred. Please try again.', 'error');
            },
        }
    );

    // Mutation for updating existing table data
    const updateTableMutation = useMutation(
        async (updatedTableData) => {
            const res = await axiosSecure.put(`/restaurant/${res_id}/branch/${branchID}/tables`, updatedTableData);
            return res?.data;
        },
        {
            onSuccess: () => {
                // Show success message using SweetAlert
                Swal.fire('Success', 'Table data updated successfully!', 'success');
            },
            onError: () => {
                // Show error message using SweetAlert
                Swal.fire('Error', 'An error occurred. Please try again.', 'error');
            },
        }
    );

    // Mutation for deleting a table
    const deleteTableMutation = useMutation(
        async (tableNo) => {
            const res = await axiosSecure.delete(`/restaurant/${res_id}/branch/${branchID}/tables/${tableNo}`);
            return res?.data;
        },
        {
            onSuccess: () => {
                // Refetch existing table data after a table is deleted
                tableRefetch();
                // Show success message using SweetAlert
                Swal.fire('Success', 'Table deleted successfully!', 'success');
            },
            onError: () => {
                // Show error message using SweetAlert
                Swal.fire('Error', 'An error occurred. Please try again.', 'error');
            },
        }
    );

    // Function to handle form submission
    const onSubmit = async (formData) => {
        const existingTableIndex = existingTableData.findIndex((table) => table.id === formData.id);

        if (existingTableIndex !== -1) {
            // Table with the same ID exists, update its data
            const updatedData = [...existingTableData];
            updatedData[existingTableIndex] = formData;
            await updateTableMutation.mutateAsync(updatedData);
        } else {
            // Table with the given ID doesn't exist, add a new table
            await addTableMutation.mutateAsync([...existingTableData, formData]);
        }
    };

    // Function to handle table deletion
    const onDeleteTable = async (tableNo) => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirmDelete.isConfirmed) {
            await deleteTableMutation.mutateAsync(tableNo);
        }
    };

     // download QR code
     const downloadQRCode = (id, number) => {
        const qrCodeDataURL = document.getElementById(id).toDataURL("image/png");
    
        const canvas = document.createElement('canvas');
        const canvasWidth = 3 * 96; // 4 inches width at 96 DPI
        const canvasHeight = 4 * 96; // 3 inches height at 96 DPI
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
    
        const ctx = canvas.getContext('2d');
    
        // Set white background
        ctx.fillStyle = '#ffffff'; // White background
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
        // Add padding and calculate QR code size
        const padding = 20;
        const qrCodeSize = 2 * 96; // 2 inches by 2 inches at 96 DPI
    
        // Draw QR code at the center with padding
        const qrCodeX = (canvasWidth - qrCodeSize) / 2;
        const qrCodeY = (canvasHeight - qrCodeSize) / 2 - padding / 2;
        ctx.drawImage(document.getElementById(id), qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);
    
        // Customize the appearance (res_id at the bottom)
        const resIdText = res_name + " | Table : "+ number; // Replace with the actual res_id
        const resIdFontSize = 12;
        const resIdY = canvasHeight - padding - 20; // Adjust the Y position for more space
        ctx.fillStyle = '#666'; // Lighter dark text color
        ctx.font = `${resIdFontSize}px Arial`; // Font size and family
        ctx.textAlign = 'center'; // Center align the text
        ctx.fillText(resIdText, canvasWidth / 2, resIdY);
    
        // Customize the appearance (Powered by line at the bottom center)
        const poweredByText = 'Powered by: Foodie';
        const poweredByFontSize = 12;
        const poweredByY = canvasHeight - padding; // Adjust the Y position for more space
        ctx.fillStyle = '#666'; // Lighter dark text color
        ctx.font = `${poweredByFontSize}px Arial`; // Font size and family
        ctx.textAlign = 'center'; // Center align the text
        ctx.fillText(poweredByText, canvasWidth / 2, poweredByY);
    
        // Convert the customized canvas to data URL
        const customQRCodeDataURL = canvas.toDataURL('image/png');
    
        let aEl = document.createElement("a");
        aEl.href = customQRCodeDataURL;
        aEl.download = `table-${number}-qr-code.png`;
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
    };
    
    
    
    
    
    if (existingTableError) {
        return <ErrorPage />;
    }

    if (existingTableLoading) {
        return <LoadingPage />;
    }

    return (
        <div className="container mx-auto mt-8">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
                        Table No
                    </label>
                    <Controller
                        name="id"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                readOnly={!existingTableLoading && existingTableData.length > 0} // Make ID readOnly if there are existing tables
                            />
                        )}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">
                        Table Number
                    </label>
                    <Controller
                        name="number"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="number"
                                className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        )}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">
                        Table Capacity
                    </label>
                    <Controller
                        name="capacity"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="number"
                                className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        )}
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Save Table
                    </button>
                </div>
            </form>

            {/* Display existing table data */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Existing Tables</h2>
                <ul>
                    {existingTableData.map((table, _idx) => (
                        <div key={_idx} className="border p-4 mb-4">

                            <p>Table No: {table?.number}</p>
                            <p>Table Capacity: {table?.capacity}</p>
                            <p>Location: {table?.location}</p>

                            {/* Generate QR Code directly with react-qrcode */}
                            <div>
                                <QRCode value={table?.qrCodeData} id={table?.qrCodeData + _idx + table?.number} />
                                <button onClick={() => downloadQRCode(table?.qrCodeData + _idx + table?.number, table?.number)}
                                    className="mt-2 cursor-pointer  bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Download QR Code
                                </button>
                            </div>

                            <div className="mt-4">
                                {/* Option to delete table */}
                                <button
                                    onClick={() => onDeleteTable(table?.number)}
                                    className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Delete Table
                                </button>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};


export default TableManagement;
