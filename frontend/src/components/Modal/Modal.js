import React, { useState } from 'react';
import './Modal.css'

const Modal = () => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    if (modal) {
        document.body.classList.add('active-modal')
    }
    else {
        document.body.classList.remove('active-modal')
    }
    return (
        <>
            <button className="btn-modal" onClick={toggleModal}>
                Open
            </button>
            {modal && (
                <div className="modal">
                    <div className="overlay" onClick={toggleModal}></div>
                    <div className="modal-content">
                        <h2>Hello Modal</h2>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit quam expedita saepe architecto. Soluta, eligendi! Labore inventore quis voluptates placeat at veritatis optio quidem odit totam necessitatibus laborum nam doloremque, maiores vel ullam possimus laboriosam, eveniet, commodi rem! Cupiditate mollitia, recusandae alias dignissimos in voluptatem sit a officiis laboriosam. Facere.</p>
                        <button className="close-modal" onClick={toggleModal}>
                            Close
                        </button>
                    </div>
            </div>
            )}
        </>
    )
}

export default Modal