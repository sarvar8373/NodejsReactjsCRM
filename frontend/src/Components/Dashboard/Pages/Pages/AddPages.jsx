import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../Input/Input';
import Message from '../../../Message/Message';
import Btn from '../../../Btn/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddPages = () => {
  const [pages, setPages] = useState({
    title: '',
    content: '',
  });
  const [message, setMessage] = useState('');
  const [editorValue, setEditorValue] = useState('');
  const [status, setStatus] = useState('');

  const handleQuillChange = (value) => {
    setEditorValue(value);
    setPages({ ...pages, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(pages);

  // Use pages.content, not editorValue

    try {
      const result = await axios.post('http://localhost:9000/pages/add_pages', pages);
      console.log(result.data);
      setStatus('success');
      setMessage('Create successfully');
    } catch (error) {
      console.error(error);
      setStatus('danger');
      setMessage('Error, please check');
    }
  };

  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h2 className="mt-4">Add Page</h2>
          <Message status={status} message={message} />
          <form className="mb-3" onSubmit={handleSubmit}>
            <Input
              label="Name page"
              required
              type="text"
              placeholder="Enter page"
              value={pages.title}
              onChange={(e) => setPages({ ...pages, title: e.target.value })}
            />
            <ReactQuill
              theme="snow"
              value={editorValue}
              onChange={handleQuillChange} // Handle Quill change event
            />
            <Btn label="Create" type="submit" className="btn btn-success mt-3" />
            <Link to="/dashboard/all-page">
              <Btn label="Close" type="button" className="btn btn-danger mt-3 mx-3" />
            </Link>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddPages;
