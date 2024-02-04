import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Btn from '../../../Btn/Button';

const AllUsers = () => {
  const [users, setUsers] = useState([]); // Initialize users as an empty array

  useEffect(() => {
    axios
      .get('http://localhost:9000/auth/users')
      .then((result) => {
        if (result.data.Status) {
          setUsers(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (userID) => {
    axios
      .delete(`http://localhost:9000/auth/user/${userID}`)
      .then((result) => {
        if (result.data.Status) {
          setUsers(users.filter((c) => c.id !== userID));
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
          <h2 className="mt-4">All Users</h2>
          <table className="table table-striped">
            <thead className="bg-dark">
              <tr>
                <th className="text-light">ID</th>
                <th className="text-light">Username</th>
                <th className="text-light">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((c, index) => (
                <tr key={c.id}>
                  <td>{index + 1}</td>
                  <td>{c.username}</td>
                  <td className='d-flex justify-content-between'>
                    {c.email}
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
      </main>
    </div>
  );
};

export default AllUsers;
