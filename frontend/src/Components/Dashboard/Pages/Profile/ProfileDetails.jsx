import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import Input from '../../../Input/Input';
import Btn from '../../../Btn/Button';
import Message from '../../../Message/Message';

const ProfileDetails = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [user, setUser] = useState({
    username: '',
    email: '',
    image: '',
    password: '',
    role: '',
    name: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/auth/user/${id}`);
        if (response.data.Status) {
          const { username, email, image, password, role, name } = response.data.Result;
          console.log(response.data);
          setUser({
            username,
            email,
            image,
            password,
            role,
            name,
          });
        } else {
          console.error(response.data.Error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('name', user.name);
    formData.append('password', user.password);
    formData.append('role', user.role);
    // Only append 'image' if a new image is selected
    if (image) {
      formData.append('image', image);
    }
  
    try {
      const response = await axios.put(
        `http://localhost:9000/auth/user/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (response.data.Status) {
        console.log('User updated successfully');
        setStatus('success');
        setMessage('Successfully updated');
        // Redirect to profile or another page after successful update
        navigate('/dashboard/profile');
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
          <h2 className="mt-4">Edit Profile</h2>
          <Message status={status} message={message} />
          <form className="mb-3" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row justify-content-start">
              <div className="col-8">
                <Input
                  label="Name"
                  required
                  placeholder="Enter name"
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <Input
                  label="Email"
                  required
                  placeholder="Enter Email"
                  type="text"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <Input
                  label="Password"
                  required
                  placeholder="Enter Password"
                  type="password"
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
              </div>
              <div className="col-4">
                <Input
                  label="Username"
                  required
                  placeholder="Enter Username"
                  type="text"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                <Input
                  label="Role"
                  required
                  placeholder="Enter Role"
                  type="text"
                  value={user.role}
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                />
                <div className="mb-3">
                  <img src={`http://localhost:9000/uploads/userImg/${user.image}`} alt="" width={150} height={150} />
                  <input className="form-control" type="file" id="formFile" name="image" onChange={handleImageChange} />
                </div>
              </div>
            </div>
            <Btn label="Update" type="submit" className="btn btn-success mt-3" />
            <Link to="/dashboard/profile">
              <Btn label="Close" type="button" className="btn btn-danger mt-3 mx-3" />
            </Link>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProfileDetails;
