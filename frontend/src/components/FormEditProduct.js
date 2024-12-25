import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { read, update } from '../functions/product'

const FormEditProduct = () => {
    const params = useParams()
    const navigate = useNavigate()


    const [data, setData] = useState({
        name: '',
        detail: '',
        price: ''
    })
    const [fileold, setFileOld] = useState()

    useEffect(() => {
        loadData(params.id)
    }, [])

    const loadData = async (id) => {
        read(id)
            .then((res) => {
                setData(res.data)
                setFileOld(res.data.file)
            })
    }
    const handleChange = (e) => {
        if (e.target.name === 'file') {
            setData({
                ...data,
                [e.target.name]: e.target.files[0]
            })
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(data)
        console.log(fileold)
        const formWithImageData = new FormData()
        for (const key in data) {
            formWithImageData.append(key, data[key])
        }
        formWithImageData.append('fileold', fileold)
        update(params.id, formWithImageData)
            .then(res => {
                console.log(res)
                navigate('/admin/viewtable')
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Product</h1>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="space-y-4"
                >
                    {/* Name Field */}
                    <div>
                        <label className="block text-gray-600 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter product name"
                            value={data.name}
                            onChange={(e) => handleChange(e)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Detail Field */}
                    <div>
                        <label className="block text-gray-600 mb-1">Description</label>
                        <input
                            type="text"
                            name="detail"
                            placeholder="Enter product description"
                            value={data.description}
                            onChange={(e) => handleChange(e)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                     {/* cat Field */}
                     <div>
                        <label className="block text-gray-600 mb-1">Categories</label>
                        <input
                            type="text"
                            name="price"
                            placeholder="Enter product ca"
                            value={data.categories}
                            onChange={(e) => handleChange(e)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Price Field */}
                    <div>
                        <label className="block text-gray-600 mb-1">Price</label>
                        <input
                            type="text"
                            name="price"
                            placeholder="Enter product price"
                            value={data.price}
                            onChange={(e) => handleChange(e)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* tags Field */}
                    <div>
                        <label className="block text-gray-600 mb-1">Tags</label>
                        <input
                            type="text"
                            name="tags"
                            placeholder="Enter product price"
                            value={data.tags}
                            onChange={(e) => handleChange(e)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    {/* File Upload */}
                    <div>
                        <label className="block text-gray-600 mb-1">Upload File</label>
                        <input
                            type="file"
                            name="file"
                            onChange={(e) => handleChange(e)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* File2 Upload */}
                    <div>
                        <label className="block text-gray-600 mb-1">Upload File2</label>
                        <input
                            type="file"
                            name="file2"
                            onChange={(e) => handleChange(e)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default FormEditProduct