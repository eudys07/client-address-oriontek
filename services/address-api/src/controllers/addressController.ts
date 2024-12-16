import { Request, Response } from 'express';
import Address from '../models/address';
import eventEmitter from '../util/eventEmitter';

export const getAddresses = async (req: Request, res: Response) => {
  const addresses = await Address.find();
  res.json(addresses);
};

export const getAddressById = async (req: Request, res: Response) => {
  const address = await Address.findById(req.params.id);
  if (address) res.json(address);
  else res.status(404).json({ message: 'Address not found' });
};

export const createAddress = async (req: Request, res: Response) => {

try {
    const { address, clientId } = req.body;

    if (!address || !clientId) {
      console.error('Error: Missing required fields - street or clientId');
      res.status(400).json({ error: 'Street and clientId are required fields.' });
    }

    const newAddress = await Address.create({ address, clientId });
    eventEmitter.emit('ADDRESS_CREATED', { event: 'ADDRESS_CREATED', clientId: newAddress.clientId, addressId: newAddress._id});
    res.status(201).json(newAddress);
  } catch (error) {
    console.error('Error saving the address:', error);
  }
};

export const updateAddress = async (req: Request, res: Response) => {
    const newAddress = req.body;
  const address = await Address.findByIdAndUpdate(
    req.params.id,
    newAddress,
    { new: true }
  );
  if (address) res.json(address);
  else res.status(404).json({ message: 'Address not found' });
};

export const deleteAddress = async (req: Request, res: Response) => {
  const address = await Address.findByIdAndDelete(req.params.id);
  if (address) res.json({ message: 'Address deleted' });
  else res.status(404).json({ message: 'Address not found' });
};
