
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';

class CreateModal extends Component {
    
    render(){
        const {showModal, modalTittle, onSubmit, children} = this.props;
        return(
            <Modal show={showModal} animation={true} size="md">

                <form className="form-container" onSubmit={onSubmit}>
                  <Modal.Body>
                    <div className="row">
                      <p className="offset-md-1 title-create-film">{modalTittle}</p>
                    </div>

                    <div className="container">
                        {children}
                    </div>
                  </Modal.Body>

                  <div className="row">
                    <button type='submit' className="create-film-button col-md-5 offset-md-6 btn">+ {modalTittle}</button>
                  </div>

                </form>
            </Modal>
        );
    }
}

export default CreateModal;