import React from 'react'

const Alerts = () => {
    return (
        <div className="container-fluid">
            <div className="container-fluid">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title fw-semibold mb-4">Alerts</h5>
                        <div className="card mb-0">
                            <div className="card-body p-4">
                                <div className="alert alert-primary" role="alert">
                                    A simple primary alert—check it out!
                                </div>
                                <div className="alert alert-secondary" role="alert">
                                    A simple secondary alert—check it out!
                                </div>
                                <div className="alert alert-success" role="alert">
                                    A simple success alert—check it out!
                                </div>
                                <div className="alert alert-danger" role="alert">
                                    A simple danger alert—check it out!
                                </div>
                                <div className="alert alert-warning" role="alert">
                                    A simple warning alert—check it out!
                                </div>
                                <div className="alert alert-info" role="alert">
                                    A simple info alert—check it out!
                                </div>
                                <div className="alert alert-light" role="alert">
                                    A simple light alert—check it out!
                                </div>
                                <div className="alert alert-dark" role="alert">
                                    A simple dark alert—check it out!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Alerts