import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import CandidatsService from '../../services/candidat'
import DashboardService from '../../services/dashboard'
const Dashboard = () => {
    const [stats, setStats] = useState({
        Candidats: 0,
        Consultants: 0,
        Evaluateurs: 0,
        Administrateurs: 0,
        Evaluations: 0,
        EvaluationsGTE: 0,
        EvaluationsLT: 0,
        CandidatsAccepted: 0,
        CandidatsRefused: 0,
        CandidatsPassedTest: 0,
        CandidatsNotPassedTest: 0,
    })
    const [candidats, setCandidats] = useState([])
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
        colors: ["#5D87FF", '#13DEB9', "#FA896B"],

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
            categories: ['Nombre de candidats', 'Ont passé le test', 'N\'ont pas passé le test', 'Acceptés', 'Refusés', 'Nombre de notes +50%', 'Nombre de notes -50%']
        },
        yaxis: {
            show: true,
            min: 0,
            max: 10,
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
    var series = stats ? [
        { data: [stats.Candidats || 0, stats.CandidatsPassedTest, stats.CandidatsNotPassedTest, 0, 0, 0, 0] },
        { data: [0, 0, 0, stats?.CandidatsAccepted || 0, 0, stats.EvaluationsGTE, 0] },
        { data: [0, 0, 0, 0, stats.CandidatsRefused, 0, stats.EvaluationsLT] },
    ] : [
        { data: [0, 0, 0, 0, 0, 0, 0] },
        { data: [0, 0, 0, 0, 0, 0, 0] },
        { data: [0, 0, 0, 0, 0, 0, 0] },]
    useEffect(() => {
        const fetchStats = async () => {
            const response = await DashboardService.stats()
            setStats(response.data)
            console.log(response.data);
        }
        fetchStats()
    }, [])
    const fetchCandidats = async () => {
        const response = await CandidatsService.getAllCandidats()
        setCandidats(response.data)

    }
    useEffect(() => {
        fetchCandidats()
    }, [])


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-8 d-flex align-items-strech">
                    <div className="card w-100">
                        <div className="card-body">
                            <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
                                <div className="mb-3 mb-sm-0">
                                    <h5 className="card-title fw-semibold">Statistiques</h5>
                                </div>
                            </div>
                            {stats && <Chart
                                options={options}
                                series={series}
                                type="bar"
                                width="100%"
                            />}
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card overflow-hidden">
                                <div className="card-body p-4">
                                    <h5 className="card-title mb-9 fw-semibold">Candidats</h5>
                                    <div className="row align-items-center">
                                        <div className="col-12">
                                            {stats && <p className="fw-normal mb-3 text-dark" ><i className="fw-semibold h5 ti ti-users text-primary"></i> {stats.Candidats} <span className='text-dark'> Nombre de candidats inscrits</span></p>}
                                            <div className="d-flex align-items-center mb-3">
                                                <span
                                                    className="me-1 rounded-circle bg-light-success round-20 d-flex align-items-center justify-content-center">
                                                    <i className="ti ti-arrow-up-left text-success"></i>
                                                </span>
                                                <p className="text-dark me-1 fs-3 mb-0">{stats.CandidatsAccepted}</p>
                                                <p className="fs-3 mb-0">acceptés</p>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <span
                                                    className="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
                                                    <i className="ti ti-arrow-down-right text-danger"></i>
                                                </span>
                                                <p className="text-dark me-1 fs-3 mb-0">{stats.CandidatsRefused}</p>
                                                <p className="fs-3 mb-0">refusés</p>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <span
                                                    className="me-2 rounded-circle bg-light-secondary round-20 d-flex align-items-center justify-content-center">
                                                    <i className="ti ti-plus text-dark"></i>
                                                </span>
                                                <p className="text-dark me-1 fs-3 mb-0">{stats.CandidatsPassedTest}</p>
                                                <p className="fs-3 mb-0">ont passé le test</p>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <span
                                                    className="me-2 rounded-circle bg-light-secondary round-20 d-flex align-items-center justify-content-center">
                                                    <i className="ti ti-minus text-dark"></i>
                                                </span>
                                                <p className="text-dark me-1 fs-3 mb-0">{stats.CandidatsNotPassedTest}</p>
                                                <p className="fs-3 mb-0">n'ont pas passé le test</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-12 d-flex align-items-stretch">
                <div className="card w-100">
                    <div className="card-body p-4">
                        <h5 className="card-title fw-semibold mb-4">Liste des candidats</h5>
                        <div className="table-responsive">
                            <table className="table table-hover table-bordered text-nowrap mb-0 align-middle">
                                <thead className="text-dark fs-4">
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '50px' }}>
                                            <h6 className="fw-semibold mb-0">Id</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Nom</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Prenom</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Email</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Statut</h6>
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {candidats.length === 0 ?
                                        <tr>
                                            <td colSpan={6}><h4 className='text-center text-muted'>No candidats yet received</h4></td>
                                        </tr> :
                                        candidats?.map((data, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="border-bottom-0"><h6 className="fw-semibold mb-0">{index + 1}</h6></td>
                                                    <td className="border-bottom-0">
                                                        <h6 className="fw-normal mb-1">{data.nom.toUpperCase()}</h6>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <p className="mb-0 fw-normal">{data.prenom}</p>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <span>{data.email}</span>
                                                        </div>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <p className={`badge ${data.statut === 'Accepted' ? 'bg-success text-white' : data.statut === 'Refused' ? 'bg-danger text-white' : data.statut === undefined && 'bg-light text-dark'} rounded-3 fw-semibold`}>{data.statut === 'Accepted' ? 'Accepté' : data.statut === 'Refused' ? 'Refusé' : data.statut === undefined && 'N\'a pas passé le test'}</p>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard