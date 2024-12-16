import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import Clients from './components/Clients';
import { AppDispatch, RootState } from 'state/store';
import { fetchClients } from 'state/slices/clientsSlice';
import { Addresses } from 'components/Addresses';

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const hasClients = useSelector((state: RootState) => state.clients.hasClients);
  const [activeTab, setActiveTab] = React.useState<string>('clients');

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">OrionTek Management System</h2>
      <Tabs
        id="main-tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || 'clients')}
        className="mb-3"
      >
        <Tab eventKey="clients" title="Clients">
          <Clients />
        </Tab>
        <Tab eventKey="addresses" title="Addresses" disabled={!hasClients}>
          <Addresses />
        </Tab>
      </Tabs>
    </div>
  );
}