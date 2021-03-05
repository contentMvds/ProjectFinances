import { Schema, model } from 'mongoose';

const contasApagar = model(
  'contasApagar',
  new Schema({
    nome: { type: String, required: [true, 'Need name!'] },
    valorOriginal: { type: Number, required: [true, 'Need original value!'] },
    valorCorrigido: { type: Number, required: [true, 'Need corrected value!'] },
    qtDiasAtraso: { type: Number, default: 0 },
    regraAplicada: String,
    dateInsert: { type: Date, default: Date.now() },
    datePagamento: { type: Date, required: [true, 'Need payday!'] },
    dateVencimento: { type: Date, required: [true, 'Need Due date!'] },
  }),
);

export default contasApagar;
