import React from 'react'

const Buttons = () => {
    return (
        <div className="container-fluid">
            <div className="container-fluid">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title fw-semibold mb-4">Buttons</h5>
                        <div className="card">
                            <div className="card-body p-4">
                                <button type="button" className="btn btn-primary m-1">Primary</button>
                                <button type="button" className="btn btn-secondary m-1">Secondary</button>
                                <button type="button" className="btn btn-success m-1">Success</button>
                                <button type="button" className="btn btn-danger m-1">Danger</button>
                                <button type="button" className="btn btn-warning m-1">Warning</button>
                                <button type="button" className="btn btn-info m-1">Info</button>
                                <button type="button" className="btn btn-light m-1">Light</button>
                                <button type="button" className="btn btn-dark m-1">Dark</button>
                                <button type="button" className="btn btn-link m-1">Link</button>
                            </div>
                        </div>
                        <h5 className="card-title fw-semibold mb-4">Outline buttons</h5>
                        <div className="card mb-0">
                            <div className="card-body p-4">
                                <button type="button" className="btn btn-outline-primary m-1">Primary</button>
                                <button type="button" className="btn btn-outline-secondary m-1">Secondary</button>
                                <button type="button" className="btn btn-outline-success m-1">Success</button>
                                <button type="button" className="btn btn-outline-danger m-1">Danger</button>
                                <button type="button" className="btn btn-outline-warning m-1">Warning</button>
                                <button type="button" className="btn btn-outline-info m-1">Info</button>
                                <button type="button" className="btn btn-outline-light m-1">Light</button>
                                <button type="button" className="btn btn-outline-dark m-1">Dark</button>
                                <button type="button" className="btn btn-outline-link m-1">Link</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Buttons