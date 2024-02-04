import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Input from '../../../Input/Input';
import Message from '../../../Message/Message';
import Btn from '../../../Btn/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PageDetails = () => {
  const { pageID } = useParams();
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

  useEffect(() => {
    const fetchPageDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/pages/page/${pageID}`);
        if (response.data.Status) {
          const { title, content } = response.data.Result;
          setPages({ title, content });
          setEditorValue(content);
        } else {
          console.error(response.data.Error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPageDetails();
  }, [pageID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(`http://localhost:9000/pages/page/${pageID}`, pages);
      console.log(result.data);
      setStatus('success');
      setMessage('Update successful');
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
          <h2 className="mt-4">Edit Page</h2>
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
              onChange={handleQuillChange}
            />
            <Btn label="Update" type="submit" className="btn btn-success mt-3" />
            <Link to="/dashboard/all-page">
              <Btn label="Close" type="button" className="btn btn-danger mt-3 mx-3" />
            </Link>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PageDetails;
