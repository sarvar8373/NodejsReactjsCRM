import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Input from '../../../Input/Input';
import Btn from '../../../Btn/Button';
import Message from '../../../Message/Message';

const PostDetails = () => {
  const { postId } = useParams();
  const [category, setCategory] = useState([]);
  const [users, setUsers] = useState([]);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [post, setPost] = useState({
    title: '',
    text: '',
    image: '',
    category_id: '',
    author_id: ''
  });
  const [editorValue, setEditorValue] = useState('');

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/posts/post/${postId}`);
        if (response.data.Status) {
          const { title, text, category_id, author_id, image } = response.data.Result;
          setPost({ title, text, category_id, author_id, image });
          setEditorValue(text);
         
        } else {
          console.error(response.data.Error);
          
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoryResult = await axios.get('http://localhost:9000/category/categories');
        if (categoryResult.data.Status) {
          setCategory(categoryResult.data.Result);
        } else {
          alert(categoryResult.data.Error);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchUsers = async () => {
      try {
        const userResult = await axios.get('http://localhost:9000/auth/users');
        if (userResult.data.Status) {
          setUsers(userResult.data.Result);
        } else {
          alert(userResult.data.Error);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchPostDetails();
    fetchCategories();
    fetchUsers();
  }, [postId]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('text', editorValue);
  
    // Only append 'image' if a new image is selected
    if (image) {
      formData.append('image', image);
    } else {
      // If no new image is selected, append the existing image file name to avoid removing it
      formData.append('image', post.image);
    }
  
    formData.append('category_id', post.category_id);
    formData.append('author_id', post.author_id);
  
    // Log the data being sent
    console.log('FormData:', formData);
  
    try {
      const response = await axios.put(`http://localhost:9000/posts/post/${postId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Make sure to set content type
        },
      });
  
      // Log the response from the server
      console.log('Response:', response);
  
      if (response.data.Status) {
        console.log('Post updated successfully');
        setStatus('success');
        setMessage('Successfully updated');
      } else {
        console.error(response.data.Error);
        setStatus('danger');
        setMessage('Please check the data error');
      }
    } catch (error) {
      console.error(error);
    }
  };
  


  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h2 className="mt-4">Edit Post</h2>
          <Message status={status} message={message} />
          <form className="mb-3" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row justify-content-start">
              <div className="col-8">
                <Input
                  label="Title"
                  required
                  placeholder="Enter title"
                  type="text"
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                />
                <label htmlFor="formFile" className="form-label">
                  Text
                </label>
                <ReactQuill tabIndex={4} theme="snow" value={editorValue} onChange={(value) => setEditorValue(value)} />

                <div className="mb-3">
                  <img src={`http://localhost:9000/uploads/${post.image}`} alt="" width={150} height={150} />
                  <input className="form-control" type="file" id="formFile" name="image"
                                    onChange={handleImageChange} />
                </div>
              </div>
              <div className="col-4">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Category
                </label>
                <select
                  className="form-select mb-4"
                  aria-label="Default select example"
                  value={post.category_id}
                  onChange={(e) => setPost({ ...post, category_id: e.target.value })}
                >
                  <option> Select Category</option>
                  {category.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Author
                </label>
                <select
                  className="form-select mb-4"
                  aria-label="Default select example"
                  value={post.author_id}
                  onChange={(e) => setPost({ ...post, author_id: e.target.value })}
                >
                  <option> Select Author</option>
                  {users.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.username}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Btn label="Update" type="submit" className="btn btn-success mt-3" />
            <Link to="/dashboard/all-posts">
              <Btn label="Close" type="button" className="btn btn-danger mt-3 mx-3" />
            </Link>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PostDetails;
