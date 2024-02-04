import React, {useState} from 'react';
import axios from 'axios';
import Input from '../../../Input/Input';
import Btn from '../../../Btn/Button';
import { Link } from 'react-router-dom';
import Message from '../../../Message/Message';

const AddUser = () => {
    const [userData,
        setUserData] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        role: '',
        image: null
    });
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUserData({
            ...userData,
            image: file
        });
    };

    const handleFormSubmit = async(e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('username', userData.username);
            formData.append('email', userData.email);
            formData.append('password', userData.password);
            formData.append('name', userData.name);
            formData.append('role', userData.role);
            formData.append('image', userData.image);

            const response = await axios.post('http://localhost:9000/auth/add_user', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.Status) {
                console.log('User added successfully');
                setStatus('success');
                setMessage('User added successfully');
            } else {
                console.error(response.data.Error);
                setStatus('danger');
                setMessage('Error please check');
            }
        } catch (error) {
            console.error('Error during user addition:', error);
        }
    };

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h2 className="mt-4">Add User</h2>
                    <Message status={status} message={message}/>
                    <form className='form-control' onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="col">
                                <Input
                                    label="Username"
                                    type="text"
                                    name="username"
                                    placeholder="Enter username"
                                    value={userData.username}
                                    onChange={handleInputChange}/>
                                <Input
                                    label="Email"
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputChange}/>
                                <Input
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={userData.password}
                                    onChange={handleInputChange}/>
                            </div>
                            <div className="col">
                                <Input
                                    label="Name"
                                    type="text"
                                    placeholder="Enter name"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleInputChange}/>
                                <Input
                                    label="Role"
                                    type="text"
                                    placeholder="Enter role"
                                    name="role"
                                    value={userData.role}
                                    onChange={handleInputChange}/>
                                <Input
                                    label="Image"
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageChange}/>
                            </div>
                        </div>
                        <Btn
                            label='Add User'
                            type="submit" 
                            className='btn btn-success'
                        />
                        <Link to="/dashboard/all-users">
                        <Btn label="Close" type="button" className="btn btn-danger mx-3" />
                        </Link>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddUser;
