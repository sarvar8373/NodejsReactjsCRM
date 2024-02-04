import React, { useEffect, useState } from 'react'
import './Home.css'
import Footer from '../Footer/Footer'
import axios from 'axios';
import { Link } from 'react-router-dom';
import PieChart from '../../PieChart/PieChart';

const Home = () => {
    const [staticts, setStaticts] = useState('');
    const chartData = {
        labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
        values: [20, 30, 15, 10, 25],
      };
    useEffect(() => {
        axios
          .get('http://localhost:9000/statistics')
          .then((result) => {
            if (result.data.Status) {
                setStaticts(result.data.Result);
                
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));
      }, []);
  return (
    <div id="layoutSidenav_content">
                <main>
                <div className="container-fluid px-4">
                        <h1 className="mt-4">Dashboard</h1>
                        <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                        <div className="row">
                            <div className="col-xl-3 col-md-6">
                                <div className="card bg-dark text-white mb-4">
                                    <div className="card-body"><h1>{staticts.posts}</h1><h5>Posts</h5></div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <Link className="small text-white stretched-link" to='/dashboard/all-posts'>View Details</Link>
                                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card sb-sidenav-dark text-white mb-4">
                                    <div className="card-body"><h1>{staticts.users}</h1><h5>Users</h5></div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <Link className="small text-white stretched-link" to='/dashboard/all-users'>View Details</Link>
                                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card bg-dark text-white mb-4">
                                    <div className="card-body"><h1>{staticts.categories}</h1><h5>Categories</h5></div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <Link className="small text-white stretched-link" to='/dashboard/all-categories'>View Details</Link>
                                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card sb-sidenav-dark text-white mb-4">
                                    <div className="card-body"><h1>{staticts.pages}</h1><h5>Pages</h5></div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <a className="small text-white stretched-link" href="#">View Details</a>
                                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="card mb-4">
                                    <div className="card-header">
                                        <i className="fas fa-chart-area me-1"></i>
                                        Area Chart Example
                                    </div>
                                    {/* <div className="card-body"> <PieChart data={chartData} /></div> */}
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="card mb-4">
                                    <div className="card-header">
                                        <i className="fas fa-chart-bar me-1"></i>
                                        Bar Chart Example
                                    </div>
                                    <div className="card-body"><canvas id="myBarChart" width="100%" height="40"></canvas></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                
                <Footer/>
            </div>
  )
}

export default Home