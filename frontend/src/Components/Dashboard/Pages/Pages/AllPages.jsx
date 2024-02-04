import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Btn from '../../../Btn/Button';
import { Link } from 'react-router-dom';

const AllPages = () => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    axios
      .get('http://localhost:9000/pages/all_pages')
      .then((result) => {
        if (result.data.Status) {
          setPosts(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (pagesID) => {
    axios
      .delete(`http://localhost:9000/pages/page/${pagesID}`)
      .then((result) => {
        if (result.data.Status) {
          setPosts(posts.filter((c) => c.id !== pagesID));
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
          <h2 className="mt-4">All Pages</h2>
          <div className="mt-3">
            <table className="table table-striped">
              <thead className="bg-dark">
                <tr>
                  <th className="text-light">ID</th>
                  <th className="text-light">Title</th>
                  
                </tr>
              </thead>
              <tbody>
                {posts.map((c, index) => (
                  <tr key={c.id}>
                    <td>{index + 1}</td>
                    <td className='d-flex justify-content-between'>
                    <Link to={`/dashboard/page/${c.id}`}>{c.title}</Link>
                      <div>
                        <Btn
                          onClick={() => handleDelete(c.id)}
                          label={<i className='fas fa-trash-alt'></i>}
                          className="btn btn-danger"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllPages;