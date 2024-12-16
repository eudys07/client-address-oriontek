import React, { useEffect, useState } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { BsPlus } from 'react-icons/bs';
import { fetchClients } from 'state/slices/clientsSlice';
import { AppDispatch, RootState } from 'state/store';
import { AddAddressModal } from './AddAddressModal';
import { AddClientModal } from './AddClientModal';

const Clients: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clients, status, error } = useSelector((state: RootState) => state.clients);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [selectedClientName, setSelectedClientName] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const handleRowClick = (clientId: number, clientName: string) => {
    setSelectedClientId(clientId);
    setSelectedClientName(clientName);
  };

  const openAddAddressModal = () => {
    setShowAddAddressModal(true);
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Filter clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="outline-success" onClick={() => setShowAddClientModal(true)} title="Add new client">
          <BsPlus size={24} />
        </Button>
      </InputGroup>

      {status === 'loading' && <p>Loading clients...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      <div style={{ height: '400px', overflowY: 'auto' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.filter(
              (client) => client.name.toLowerCase().includes(search.toLowerCase()))
              .map((client) => (
                <tr
                  key={client.id}
                  onClick={() => handleRowClick(client.id, client.name)}
                  style={{ cursor: 'pointer', backgroundColor: selectedClientId === client.id ? '#f0f8ff' : '' }}
                >
                  <td>{client.id}</td>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td className="text-center">
                    <Button
                      variant="primary"
                      disabled={selectedClientId !== client.id}
                      onClick={openAddAddressModal}
                      style={{ cursor: selectedClientId === client.id ? 'pointer' : 'default' }}
                      
                    >
                      Add Address
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      <AddClientModal
        show={showAddClientModal}
        handleClose={() => setShowAddClientModal(false)}
        fetchClients={() => dispatch(fetchClients())}
      />

{selectedClientId && selectedClientName && (
        <AddAddressModal
          show={showAddAddressModal}
          handleClose={() => setShowAddAddressModal(false)}
          clientId={selectedClientId}
          clientName={selectedClientName}
        />
      )}
    </div>
  );
};

export default Clients;
