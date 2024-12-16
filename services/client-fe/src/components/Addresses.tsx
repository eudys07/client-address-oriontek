import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddresses } from '../state/slices/addressesSlice';
import { RootState, AppDispatch } from '../state/store';

export const Addresses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { addresses, status, error } = useSelector(
    (state: RootState) => state.addresses
  );

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  return (
    <div>
      <h2 className="mb-4">Address List</h2>
      {status === 'loading' && <p>Loading addresses...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client ID</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <tr key={address._id}>
                <td>{address._id}</td>
                <td>{address.clientId}</td>
                <td>{address.address}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center">
                No addresses available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
