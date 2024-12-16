import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createAddress } from '../state/slices/addressesSlice';
import { AppDispatch } from '../state/store';

interface AddAddressModalProps {
  show: boolean;
  handleClose: () => void;
  clientId: number;
  clientName: string;
}

export const AddAddressModal = ({ show, handleClose, clientId, clientName }: AddAddressModalProps) => {
  const [address, setAddress] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    dispatch(createAddress({ clientId, address }));
    setAddress('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Selected Client</Form.Label>
          <Form.Control type="text" value={clientName} readOnly />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Address
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

