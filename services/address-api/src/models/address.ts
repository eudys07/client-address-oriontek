import { Schema, model, Document } from 'mongoose';

interface IAddress extends Document {
  clientId: number;
  address: string;
}

const AddressSchema = new Schema<IAddress>({
  clientId: { type: Number, required: true },
  address: { type: String, required: true },
});

export default model<IAddress>('Address', AddressSchema);
