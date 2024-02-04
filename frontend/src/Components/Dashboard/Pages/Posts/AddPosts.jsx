import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import TextArea from '../../../TextArea/TextArea';
import Input from '../../../Input/Input';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Btn from '../../../Btn/Button';
import Message from '../../../Message/Message';

const AddPosts = () => {
  const [category,setCategory] = useState([]);
  const [users,setUsers] = useState([]);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [editorValue, setEditorValue] = useState('');
  const [status, setStatus] = useState('');
  const [posts,setPosts] = useState({
      title:'',
      text: '',
      image: '',
      category_id: '',
      author_id: '',
  });
    const handleImageChange = (e) => {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
    };
    useEffect(() => {
      // Fetch categories
      axios
        .get('http://localhost:9000/category/categories')
        .then((categoryResult) => {
          if (categoryResult.data.Status) {
            setCategory(categoryResult.data.Result);
          } else {
            alert(categoryResult.data.Error);
          }
        })
        .catch((err) => console.log(err));
    
      // Fetch users
      axios
        .get('http://localhost:9000/auth/users')
        .then((userResult) => {
          if (userResult.data.Status) {
            setUsers(userResult.data.Result);
          } else {
            alert(userResult.data.Error);
          }
        })
        .catch((err) => console.log(err));
    }, []);
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const formData = new FormData();
      formData.append('title', posts.title);
      formData.append('text', editorValue);
      formData.append('category_id', posts.category_id);
      formData.append('author_id', posts.author_id);
      formData.append('image', image); // Append the image file
    
      try {
        const result = await axios.post('http://localhost:9000/posts/add_posts', formData);
        console.log(result.data);
        setStatus('success');
        setMessage('Create successfully');
      } catch (error) {
        console.error(error);
        setStatus('danger');
        setMessage('Error please check');
      }
    };
    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h2 className="mt-4">Add Posts</h2>
                    <Message status={status} message={message}/>
                    <form className="mb-3" onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="row justify-content-start">
                            <div className="col-8">
                                <Input
                                    label="Title"
                                    required
                                    placeholder="Enter title"
                                    type="text"
                                    value={posts.title}
                                    onChange={(e) => setPosts({...posts, title: e.target.value})}/>
                                  <label htmlFor="formFile" class="form-label">Text</label>
                                  <ReactQuill
                                    theme="snow"
                                    value={editorValue}
                                    onChange={(value) => setEditorValue(value)}
                                  />
                                
                                <div class="mb-3">
                                  <label htmlFor="formFile" class="form-label">Choose Image</label>
                                  <input
                                    class="form-control"
                                    type="file" id="formFile" name="image"
                                    onChange={handleImageChange} 
                                  />
                                </div>
                            </div>
                            <div className="col-4">
                                <label htmlFor="exampleFormControlInput1" className="form-label">
                                    Category
                                </label>
                                <select
                                  class="form-select mb-4"
                                  aria-label="Default select example"
                                  onChange={(e) => setPosts({...posts, category_id: e.target.value} )}
                                ><option> Select Category</option>
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
                                  class="form-select mb-4"
                                  aria-label="Default select example"
                                  onChange={(e) => setPosts( {...posts, author_id: e.target.value })}
                                ><option> Select Author</option>
                                  {users.map((c) => (
                                      
                                      <option key={c.id} value={c.id}>
                                        {c.username}
                                      </option>
                                    ))}
                                </select>
                                
                            </div>
                        </div>

                        <Btn label="Create" type="submit" className="btn btn-success mt-3"/>
                        <Link to="/dashboard/all-posts">
                            <Btn label="Close" type="submit" className="btn btn-danger mt-3 mx-3"/>
                        </Link>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default AddPosts