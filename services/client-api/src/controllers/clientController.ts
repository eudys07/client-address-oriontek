import { Request, Response } from 'express';
import Client from '../models/client';
import eventEmitter from '../util/eventEmitter';

export const getClients = async (req: Request, res: Response) => {
  const clients = await Client.findAll();
  res.json(clients);
};

export const getClientById = async (req: Request, res: Response) => {
  const client = await Client.findByPk(req.params.id);
  if (client) res.json(client);
  else res.status(404).json({ message: 'Client not found' });
};

export const createClient = async (req: Request, res: Response) => {
  const { name, email, phone } = req.body;

  try {
    const existingClient = await Client.findOne({ where: { name } });

    if (existingClient) {
      res.status(400).json({ error: 'Client name must be unique.' });
    }

    const newClient = await Client.create({ name, email, phone });
    eventEmitter.emit('CLIENT_CREATED', { event: 'CLIENT_CREATED', clientId: newClient.id });

    res.status(201).json(newClient);
  } catch (error) {
    console.error('Error creating client:', error);
  }
};

export const updateClient = async (req: Request, res: Response) => {
  const { name, email, phone } = req.body;
  const client = await Client.findByPk(req.params.id);
  if (client) {
    await client.update({ name, email, phone });
    res.json(client);
  } else res.status(404).json({ message: 'Client not found' });
};

export const deleteClient = async (req: Request, res: Response) => {
  const client = await Client.findByPk(req.params.id);
  if (client) {
    await client.destroy();
    res.json({ message: 'Client deleted' });
  } else res.status(404).json({ message: 'Client not found' });
};
