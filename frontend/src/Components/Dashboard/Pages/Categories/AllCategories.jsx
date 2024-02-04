import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Btn from '../../../Btn/Button';

const AllCategories = () => {
    const [category, setCategory] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editCategory, setEditCategory] = useState({ id: '', name: '' });
    const [showModal, setShowModal] = useState(false);
    const [filteredPosts,setFilteredPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:9000/category/categories')
            .then((result) => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                    setFilteredPosts(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, [editMode]);

    const handleDelete = (categoryId) => {
        axios
            .delete(`http://localhost:9000/category/categories/${categoryId}`)
            .then((result) => {
                if (result.data.Status) {
                    setCategory(category.filter((c) => c.id !== categoryId));
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    };

    const handleEdit = (categoryId) => {
        const selectedCategory = category.find((c) => c.id === categoryId);
        setEditCategory({ id: selectedCategory.id, name: selectedCategory.name });
        setEditMode(true);
        setShowModal(true);
    };

    const handleEditSubmit = () => {
        axios
            .put(`http://localhost:9000/category/categories/${editCategory.id}`, { newCategoryName: editCategory.name })
            .then((result) => {
                if (result.data.Status) {
                    setCategory(category.map((c) => (c.id === editCategory.id ? { ...c, name: editCategory.name } : c)));
                    setEditMode(false);
                    setEditCategory({ id: '', name: '' });
                    setShowModal(false); // Close the modal after submitting
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditMode(false);
        setEditCategory({ id: '', name: '' });
    };
    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            // If search term is empty, reset filteredPosts to the original list
            setFilteredPosts(category);
        } else {
            const filtered = category.filter(
                (category) =>
                    category.name.toLowerCase().includes(searchTerm.toLowerCase()) || category.id.toString().includes(searchTerm)
            );
            setFilteredPosts(filtered);
        }
    };
    
    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h2 className="mt-4">All Categories</h2>
                    <div className="mt-3">
                    <div className="input-group w-50 m-2">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Search for..."
                                aria-label="Search for..."
                                aria-describedby="btnNavbarSearch"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}/>
                            <button
                                className="btn btn-primary srch"
                                id="btnNavbarSearch"
                                type="button"
                                onClick={handleSearch}>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                        <table className="table table-striped">
                            <thead className="bg-dark">
                                <tr>
                                    <th className="text-light">ID</th>
                                    <th className="text-light">Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPosts.map((c, index) => (
                                    <tr key={c.id}>
                                        <td>{index + 1}</td>
                                        <td className='d-flex justify-content-between'>{c.name}
                                            <div>
                                                <Btn
                                                    onClick={() => handleEdit(c.id)}
                                                    label="Edit"
                                                    className="btn btn-warning mx-2"/>
                                                <Btn
                                                    onClick={() => handleDelete(c.id)}
                                                    label={<i className='fas fa-trash-alt'></i>}
                                                    className="btn btn-danger"/>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formCategoryName">
                                    <Form.Label>Category Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter category name"
                                        value={editCategory.name}
                                        onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleEditSubmit}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </main>
        </div>
    );
};

export default AllCategories;
