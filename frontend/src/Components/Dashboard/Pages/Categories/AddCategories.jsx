import axios from 'axios';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Input from '../../../Input/Input';
import Message from '../../../Message/Message';
import Btn from '../../../Btn/Button'

const AddCategories = () => {
    const [category,
        setCategory] = useState('');
    const [message,
        setMessage] = useState('');
    const [status,
        setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:9000/category/add_categories', {category})
            .then((result) => {
                if (result.data.Status) {
                    setStatus('success');
                    setMessage('Create successfully');
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h2 className="mt-4">Add Categories</h2>
                    <Message status={status} message={message}/>
                    <form className="mb-3" onSubmit={handleSubmit}>
                        <Input
                            label="Name categories"
                            required
                            type="text"
                            placeholder="Enter categories"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}/>
                        <Btn label="Create" type="submit" className="btn btn-success mt-3"/>
                        <Link to="/dashboard/all-categories">
                            <Btn label="Close" type="submit" className="btn btn-danger mt-3 mx-3"/>
                        </Link>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddCategories;
