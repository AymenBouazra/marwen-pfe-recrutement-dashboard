import React from 'react'
import Chart from 'react-apexcharts'
const Dashboard = () => {
    var options = {
        chart: {
            type: "bar",
            height: 345,
            offsetX: -15,
            toolbar: { show: true },
            foreColor: "#adb0bb",
            fontFamily: 'inherit',
            sparkline: { enabled: false },
        },
        colors: ["#5D87FF", "#49BEFF"],

        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "45%",
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all'
            },
        },
        markers: { size: 0 },

        dataLabels: {
            enabled: false,
        },


        legend: {
            show: false,
        },


        grid: {
            borderColor: "rgba(0,0,0,0.1)",
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },

        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        },
        yaxis: {
            show: true,
            min: 0,
            max: 400,
            tickAmount: 4,
            labels: {
                style: {
                    cssClass: "grey--text lighten-2--text fill-color",
                },
            },
        },
        stroke: {
            show: true,
            width: 3,
            lineCap: "butt",
            colors: ["transparent"],
        },


        tooltip: { theme: "light" },

        responsive: [
            {
                breakpoint: 600,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 3,
                        }
                    },
                }
            }
        ]
    }
    var series = [
        { name: "Earnings this month:", data: [355, 390, 300, 350, 390, 180, 355, 390] },
        { name: "Expense this month:", data: [280, 250, 325, 215, 250, 310, 280, 250] },
    ]
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-8 d-flex align-items-strech">
                    <div className="card w-100">
                        <div className="card-body">
                            <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
                                <div className="mb-3 mb-sm-0">
                                    <h5 className="card-title fw-semibold">Sales Overview</h5>
                                </div>
                                <div>
                                    <select className="form-select">
                                        <option value="1">March 2023</option>
                                        <option value="2">April 2023</option>
                                        <option value="3">May 2023</option>
                                        <option value="4">June 2023</option>
                                    </select>
                                </div>
                            </div>
                            <Chart
                                options={options}
                                series={series}
                                type="bar"
                                width="100%"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card overflow-hidden">
                                <div className="card-body p-4">
                                    <h5 className="card-title mb-9 fw-semibold">Yearly Breakup</h5>
                                    <div className="row align-items-center">
                                        <div className="col-8">
                                            <h4 className="fw-semibold mb-3">$36,358</h4>
                                            <div className="d-flex align-items-center mb-3">
                                                <span
                                                    className="me-1 rounded-circle bg-light-success round-20 d-flex align-items-center justify-content-center">
                                                    <i className="ti ti-arrow-up-left text-success"></i>
                                                </span>
                                                <p className="text-dark me-1 fs-3 mb-0">+9%</p>
                                                <p className="fs-3 mb-0">last year</p>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="me-4">
                                                    <span className="round-8 bg-primary rounded-circle me-2 d-inline-block"></span>
                                                    <span className="fs-2">2023</span>
                                                </div>
                                                <div>
                                                    <span className="round-8 bg-light-primary rounded-circle me-2 d-inline-block"></span>
                                                    <span className="fs-2">2023</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row alig n-items-start">
                                        <div className="col-8">
                                            <h5 className="card-title mb-9 fw-semibold"> Monthly Earnings </h5>
                                            <h4 className="fw-semibold mb-3">$6,820</h4>
                                            <div className="d-flex align-items-center pb-1">
                                                <span
                                                    className="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
                                                    <i className="ti ti-arrow-down-right text-danger"></i>
                                                </span>
                                                <p className="text-dark me-1 fs-3 mb-0">+9%</p>
                                                <p className="fs-3 mb-0">last year</p>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="d-flex justify-content-end">
                                                <div
                                                    className="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                                                    <i className="ti ti-currency-dollar fs-6"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="earning"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body p-4">
                            <div className="mb-4">
                                <h5 className="card-title fw-semibold">Recent Transactions</h5>
                            </div>
                            <ul className="timeline-widget mb-0 position-relative mb-n5">
                                <li className="timeline-item d-flex position-relative overflow-hidden">
                                    <div className="timeline-time text-dark flex-shrink-0 text-end">09:30</div>
                                    <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                                        <span className="timeline-badge border-2 border border-primary flex-shrink-0 my-8"></span>
                                        <span className="timeline-badge-border d-block flex-shrink-0"></span>
                                    </div>
                                    <div className="timeline-desc fs-3 text-dark mt-n1">Payment received from John Doe of $385.90</div>
                                </li>
                                <li className="timeline-item d-flex position-relative overflow-hidden">
                                    <div className="timeline-time text-dark flex-shrink-0 text-end">10:00 am</div>
                                    <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                                        <span className="timeline-badge border-2 border border-info flex-shrink-0 my-8"></span>
                                        <span className="timeline-badge-border d-block flex-shrink-0"></span>
                                    </div>
                                    <div className="timeline-desc fs-3 text-dark mt-n1 fw-semibold">New sale recorded <div
                                        className="text-primary d-block fw-normal">#ML-3467</div>
                                    </div>
                                </li>
                                <li className="timeline-item d-flex position-relative overflow-hidden">
                                    <div className="timeline-time text-dark flex-shrink-0 text-end">12:00 am</div>
                                    <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                                        <span className="timeline-badge border-2 border border-success flex-shrink-0 my-8"></span>
                                        <span className="timeline-badge-border d-block flex-shrink-0"></span>
                                    </div>
                                    <div className="timeline-desc fs-3 text-dark mt-n1">Payment was made of $64.95 to Michael</div>
                                </li>
                                <li className="timeline-item d-flex position-relative overflow-hidden">
                                    <div className="timeline-time text-dark flex-shrink-0 text-end">09:30 am</div>
                                    <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                                        <span className="timeline-badge border-2 border border-warning flex-shrink-0 my-8"></span>
                                        <span className="timeline-badge-border d-block flex-shrink-0"></span>
                                    </div>
                                    <div className="timeline-desc fs-3 text-dark mt-n1 fw-semibold">New sale recorded <div
                                        className="text-primary d-block fw-normal">#ML-3467</div>
                                    </div>
                                </li>
                                <li className="timeline-item d-flex position-relative overflow-hidden">
                                    <div className="timeline-time text-dark flex-shrink-0 text-end">09:30 am</div>
                                    <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                                        <span className="timeline-badge border-2 border border-danger flex-shrink-0 my-8"></span>
                                        <span className="timeline-badge-border d-block flex-shrink-0"></span>
                                    </div>
                                    <div className="timeline-desc fs-3 text-dark mt-n1 fw-semibold">New arrival recorded
                                    </div>
                                </li>
                                <li className="timeline-item d-flex position-relative overflow-hidden">
                                    <div className="timeline-time text-dark flex-shrink-0 text-end">12:00 am</div>
                                    <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                                        <span className="timeline-badge border-2 border border-success flex-shrink-0 my-8"></span>
                                    </div>
                                    <div className="timeline-desc fs-3 text-dark mt-n1">Payment Done</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body p-4">
                            <h5 className="card-title fw-semibold mb-4">Recent Transactions</h5>
                            <div className="table-responsive">
                                <table className="table text-nowrap mb-0 align-middle">
                                    <thead className="text-dark fs-4">
                                        <tr>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Id</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Assigned</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Name</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Priority</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Budget</h6>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border-bottom-0"><h6 className="fw-semibold mb-0">1</h6></td>
                                            <td className="border-bottom-0">
                                                <h6 className="fw-semibold mb-1">Sunil Joshi</h6>
                                                <span className="fw-normal">Web Designer</span>
                                            </td>
                                            <td className="border-bottom-0">
                                                <p className="mb-0 fw-normal">Elite Admin</p>
                                            </td>
                                            <td className="border-bottom-0">
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className="badge bg-primary rounded-3 fw-semibold">Low</span>
                                                </div>
                                            </td>
                                            <td className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0 fs-4">$3.9</h6>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-bottom-0"><h6 className="fw-semibold mb-0">2</h6></td>
                                            <td className="border-bottom-0">
                                                <h6 className="fw-semibold mb-1">Andrew McDownland</h6>
                                                <span className="fw-normal">Project Manager</span>
                                            </td>
                                            <td className="border-bottom-0">
                                                <p className="mb-0 fw-normal">Real Homes WP Theme</p>
                                            </td>
                                            <td className="border-bottom-0">
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className="badge bg-secondary rounded-3 fw-semibold">Medium</span>
                                                </div>
                                            </td>
                                            <td className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0 fs-4">$24.5k</h6>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-bottom-0"><h6 className="fw-semibold mb-0">3</h6></td>
                                            <td className="border-bottom-0">
                                                <h6 className="fw-semibold mb-1">Christopher Jamil</h6>
                                                <span className="fw-normal">Project Manager</span>
                                            </td>
                                            <td className="border-bottom-0">
                                                <p className="mb-0 fw-normal">MedicalPro WP Theme</p>
                                            </td>
                                            <td className="border-bottom-0">
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className="badge bg-danger rounded-3 fw-semibold">High</span>
                                                </div>
                                            </td>
                                            <td className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0 fs-4">$12.8k</h6>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-bottom-0"><h6 className="fw-semibold mb-0">4</h6></td>
                                            <td className="border-bottom-0">
                                                <h6 className="fw-semibold mb-1">Nirav Joshi</h6>
                                                <span className="fw-normal">Frontend Engineer</span>
                                            </td>
                                            <td className="border-bottom-0">
                                                <p className="mb-0 fw-normal">Hosting Press HTML</p>
                                            </td>
                                            <td className="border-bottom-0">
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className="badge bg-success rounded-3 fw-semibold">Critical</span>
                                                </div>
                                            </td>
                                            <td className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0 fs-4">$2.4k</h6>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6 col-xl-3">
                    <div className="card overflow-hidden rounded-2">
                        <div className="position-relative">
                            <div ><img src="img/products/s4.jpg" className="card-img-top rounded-0" alt="..." /></div>
                            <div className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i className="ti ti-basket fs-4"></i></div>                      </div>
                        <div className="card-body pt-3 p-4">
                            <h6 className="fw-semibold fs-4">Boat Headphone</h6>
                            <div className="d-flex align-items-center justify-content-between">
                                <h6 className="fw-semibold fs-4 mb-0">$50 <span className="ms-2 fw-normal text-muted fs-3"><del>$65</del></span></h6>
                                <ul className="list-unstyled d-flex align-items-center mb-0">
                                    <li><div className="me-1" ><i className="ti ti-star text-warning"></i></div></li>
                                    <li><div className="me-1" ><i className="ti ti-star text-warning"></i></div></li>
                                    <li><div className="me-1" ><i className="ti ti-star text-warning"></i></div></li>
                                    <li><div className="me-1" ><i className="ti ti-star text-warning"></i></div></li>
                                    <li><div className="" ><i className="ti ti-star text-warning"></i></div></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-xl-3">
                    <div className="card overflow-hidden rounded-2">
                        <div className="position-relative">
                            <div ><img src="img/products/s5.jpg" className="card-img-top rounded-0" alt="..." /></div>
                            <div className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i className="ti ti-basket fs-4"></i></div>                      </div>
                        <div className="card-body pt-3 p-4">
                            <h6 className="fw-semibold fs-4">MacBook Air Pro</h6>
                            <div className="d-flex align-items-center justify-content-between">
                                <h6 className="fw-semibold fs-4 mb-0">$650 <span className="ms-2 fw-normal text-muted fs-3"><del>$900</del></span></h6>
                                <ul className="list-unstyled d-flex align-items-center mb-0">
                                    <li><div className="me-1" ><i className="ti ti-star text-warning"></i></div></li>
                                    <li><div className="me-1" ><i className="ti ti-star text-warning"></i></div></li>
                                    <li><div className="me-1" ><i className="ti ti-star text-warning"></i></div></li>
                                    <li><div className="me-1" ><i className="ti ti-star text-warning"></i></div></li>
                                    <li><div className="" ><i className="ti ti-star text-warning"></i></div></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-xl-3">
                    <div className="card overflow-hidden rounded-2">
                        <div className="position-relative">
                            <div ><img src="img/products/s7.jpg" className="card-img-top rounded-0" alt="..." /></div>
                            <div className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i className="ti ti-basket fs-4"></i></div>                      </div>
                        <div className="card-body pt-3 p-4">
                            <h6 className="fw-semibold fs-4">Red Valvet Dress</h6>
                            <div className="d-flex align-items-center justify-content-between">
                                <h6 className="fw-semibold fs-4 mb-0">$150 <span className="ms-2 fw-normal text-muted fs-3"><del>$200</del></span></h6>
                                <ul className="list-unstyled d-flex align-items-center mb-0">
                                    <li><div className="me-1" ><i className="ti ti-star text-warning"></i></div></li>
                                    <li><div className="me-1" ><i className="ti ti-star text-warning"></i></div></li>
                                    <li><div className="me-1" ><i className="ti ti-star text-warning"></i></div></li>
                                    <li><div className="me-1" ><i className="ti ti-star text-warning"></i></div></li>
                                    <li><div className="" ><i className="ti ti-star text-warning"></i></div></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-xl-3">
                    <div className="card overflow-hidden rounded-2">
                        <div className="position-relative">
                            <div ><img src="img/products/s11.jpg" className="card-img-top rounded-0" alt="..." /></div>
                            <div className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i className="ti ti-basket fs-4"></i></div>                      </div>
                        <div className="card-body pt-3 p-4">
                            <h6 className="fw-semibold fs-4">Cute Soft Teddybear</h6>
                            <div className="d-flex align-items-center justify-content-between">
                                <h6 className="fw-semibold fs-4 mb-0">$285 <span className="ms-2 fw-normal text-muted fs-3"><del>$345</del></span></h6>
                                <ul className="list-unstyled d-flex align-items-center mb-0">
                                    <li><div className="me-1" ><i className="ti ti-star text-warning"></i></div></li>
                                    <li><div className="me-1" ><i className="ti ti-star text-warning"></i></div></li>
                                    <li><div className="me-1" ><i className="ti ti-star text-warning"></i></div></li>
                                    <li><div className="me-1" ><i className="ti ti-star text-warning"></i></div></li>
                                    <li><div className="" ><i className="ti ti-star text-warning"></i></div></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard