import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Btn from '../../../Btn/Button';

const Profile = () => {
    const [auth, setAuth] = useState(false);
    const [userDetails, setUserDetails] = useState('');
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
  
    useEffect(() => {
      axios
        .get(`http://localhost:9000/auth/user`, { withCredentials: true })
        .then((result) => {
          if (result.data.Status) {
            setAuth(true);
            setUserDetails(result.data);
            console.log(result.data);
          } else {
            console.error(result.data.Error);
            console.log(result.data.Error);
          }
        })
        .catch((err) => {
          console.error(err);
          // Additional error handling if needed
        });
    }, []);
  
    const handleEditProfile = () => {
      // Navigate to the edit profile page with the user ID as a search parameter
      navigate(`/dashboard/edit-profile/${userDetails.id}`);
    };
  
        

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <div className="d-flex mt-4 justify-content-between">
                      <h2 className="">Profile</h2>
                      <Btn
              label={<i className='fas fa-pen'></i>}
              type="submit"
              className="btn btn-primary mx-3"
              onClick={handleEditProfile}
            />
                    </div>
                    <div className="card shadow-sm p-3 mb-5 bg-body rounded border-0">
                    <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                        <div className="row align-items-center">
                            <div className="col-3 mb-4 mb-lg-0">
                                <img className='rounded-circle zindex-sticky'  src={`http://localhost:9000/uploads/userImg/${userDetails.image}`}
                                width={300}
                                height={300}
                                alt="..."/>
                            </div>
                            <div className="rounded col-lg-6 sb-sidenav accordion px-xl-10">
                                <div className=" d-lg-inline-block py-3 mb-1-9 rounded">
                                    <h3 className="h2 text-dark mb-0">{userDetails.name}</h3>
                                    <span className="text-info">{userDetails.role}</span>
                                </div>
                                <ul className="list-unstyled mb-1-9">
                                    <li className="mb-2 fs-5 mb-xl-3 text-dark display-28"><span className="display-26 text-secondary me-2 font-weight-600">Name:</span> {userDetails.name}</li>
                                    <li className="mb-2 fs-5 mb-xl-3 text-dark display-28"><span className="display-26 text-secondary me-2 font-weight-600">Email:</span> {userDetails.email}</li>
                                    <li className="mb-2 fs-5 mb-xl-3 text-dark display-28"><span className="display-26 text-secondary me-2 font-weight-600">Username:</span>{userDetails.username}</li>
                                    <li className="mb-2 fs-5 mb-xl-3 text-dark display-28"><span className="display-26 text-secondary me-2 font-weight-600">Role:</span> {userDetails.role}</li>
                                </ul>
                                <ul className="social-icon-style1 list-unstyled mb-0 ps-0">
                                    <li><a href="#!"><i className="ti-twitter-alt"></i></a></li>
                                    <li><a href="#!"><i className="ti-facebook"></i></a></li>
                                    <li><a href="#!"><i className="ti-pinterest"></i></a></li>
                                    <li><a href="#!"><i className="ti-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;