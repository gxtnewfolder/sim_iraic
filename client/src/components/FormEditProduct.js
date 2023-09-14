import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const FormEditProduct = () => {
    const params = useParams()
    const navigate = useNavigate()


    const [data, setData] = useState({
        name: '',
        detail: '',
        price: ''
    })

    const [fileold, setFileold] = useState()

    useEffect(() => {
        loadData(params.id)
    }, [])

    const loadData = async (id) => {
        return await axios.get('http://localhost:8000/api/product/' + id)
            .then((res) => {
                setData(res.data)
                setFileold(res.data.file)
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
        return await axios.put('http://localhost:8000/api/product/' + params.id, formWithImageData)
            .then(res => {
                console.log(res)
                navigate('/')
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>FormEditProduct

<form onSubmit={handleSubmit} encType='multipart/form-data'>
                <input
                    type='text'
                    name='name'
                    onChange={e => handleChange(e)}
                    placeholder='name'
                    value={data.name}
                /> <br />

                <input type='text'
                    name='detail'
                    placeholder='detail'
                    value={data.detail}
                    onChange={e => handleChange(e)}
                /><br />
                <input type='file'
                    name='file'
                    onChange={e => handleChange(e)}
                /><br />
                <input
                    type='text'
                    name='price'
                    placeholder='price'
                    value={data.price}
                    onChange={e => handleChange(e)} />
                <br />
                <button>Submit</button>
            </form>

        </div>
    )
}

export default FormEditProduct