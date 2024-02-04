import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Btn from '../../../Btn/Button';
import Input from '../../../Input/Input';

const AllPosts = () => {
    const [posts,
        setPosts] = useState([]);
    const [filteredPosts,
        setFilteredPosts] = useState([]);
    const [editMode,
        setEditMode] = useState(false);
    const [categories,
        setCategories] = useState([]);
    const [authors,
        setAuthors] = useState([]);
    const [editPost,
        setEditPost] = useState({
        id: '',
        title: '',
        text: '',
        image: '',
        category_id: '',
        author_id: ''
    });
    const [searchTerm,
        setSearchTerm] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:9000/posts/posts')
            .then((result) => {
                if (result.data.Status) {
                    setPosts(result.data.Result);
                    setFilteredPosts(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, [editMode]);

    useEffect(() => {
        axios
            .get('http://localhost:9000/category/categories')
            .then((categoryResult) => {
                if (categoryResult.data.Status) {
                    setCategories(categoryResult.data.Result);
                } else {
                    alert(categoryResult.data.Error);
                }
            })
            .catch((err) => console.log(err));

        axios
            .get('http://localhost:9000/auth/users')
            .then((userResult) => {
                if (userResult.data.Status) {
                    setAuthors(userResult.data.Result);
                } else {
                    alert(userResult.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = (postID) => {
        axios
            .delete(`http://localhost:9000/posts/post/${postID}`)
            .then((result) => {
                if (result.data.Status) {
                    setPosts(posts.filter((c) => c.id !== postID));
                    setFilteredPosts(filteredPosts.filter((c) => c.id !== postID));
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    };

    const handleSearch = () => {
        const filtered = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.id.toString().includes(searchTerm) || post.category_id.toString().includes(searchTerm));
        setFilteredPosts(filtered);
    };

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h2 className="mt-4">All Posts</h2>
                    <div className="mb-3">
                        <div className="input-group w-50">
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

                    </div>
                    <table className="table table-striped">
                        <thead className="bg-dark">
                            <tr>
                                <th className="text-light">ID</th>
                                <th className="text-light">Title</th>
                                <th className="text-light">Category</th>
                                <th className="text-light">Author</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPosts.map((c, index) => (
                                <tr key={c.id}>
                                    <td>{index + 1}</td>
                                    <td className=''>
                                        {' '}
                                        <Link to={`/dashboard/posts/${c.id}`}>{c.title}</Link>
                                    </td>
                                    <td className=''>
                                        {categories.find((category) => category.id === c.category_id)
                                            ?.name || 'Unknown Category'}
                                    </td>
                                    <td className='d-flex justify-content-between'>
                                        {authors.find((author) => author.id === c.author_id)
                                            ?.username || 'Unknown Author'}
                                        <div>
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
            </main>
        </div>
    );
};

export default AllPosts;
