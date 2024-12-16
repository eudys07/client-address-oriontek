import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { addClient } from '../services/clientService';

interface AddClientModalProps {
  show: boolean;
  handleClose: () => void;
  fetchClients: () => void;
}

export const AddClientModal = ({
  show,
  handleClose,
  fetchClients,
}: AddClientModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      await addClient({ name, email, phone });
      fetchClients();
      setName('');
      setEmail('');
      setPhone('');
      setError(null);
      handleClose();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add client.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Client</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>Client Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter client name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter client email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter client phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Client
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
