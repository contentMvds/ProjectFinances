import { differenceInDays, parse, format } from 'date-fns';
import { contasApagar } from '../model';

const regraJurosEndMulta = (
  valor,
  percentMulta,
  percentJuros,
  dias,
) => {
  // Somando valor da multa com o valor atual
  let valorComMulta = parseFloat(valor.replace(',', '.')) + parseFloat((valor.replace(',', '.') * percentMulta) / 100);
  for (let index = 1; index <= dias; index += 1) {
    valorComMulta = parseFloat(valorComMulta + parseFloat((valorComMulta * percentJuros) / 100));
  }
  return +valorComMulta.toFixed(2);
};

const formatStringtoDate = (date, formats) => parse(date, formats, new Date());

const formatDate = 'dd/MM/yyyy';

export const getContaApagar = async ({ _id }) => {
  if (!_id) throw new Error('indetificador unico não encontrado');

  const result = await contasApagar.find({ _id }).exec();

  return result.map((item) => ({
    nome: item.nome,
    valorOriginal: item.valorOriginal,
    valorCorrigido: item.valorCorrigido,
    qtDiasEmAtraso: item.qtDiasAtraso,
    datePagamento: format(item.datePagamento, formatDate),
  }));
};

export const getContasApagar = async () => {
  const result = await contasApagar.find().exec();

  return result.map((item) => ({
    nome: item.nome,
    valorOriginal: item.valorOriginal.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' }),
    valorCorrigido: item.valorCorrigido.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' }),
    qtDiasEmAtraso: item.qtDiasAtraso,
    datePagamento: format(item.datePagamento, formatDate),
  }));
};

export const postContaApagar = async ({
  nome,
  valorOriginal,
  datePagamento,
  dateVencimento,
}) => {
  if (!nome) return 'O nome da conta é obrigatorio';
  if (!valorOriginal) return 'O Valor da conta é obrigatorio';
  if (Number.isNaN(parseFloat(valorOriginal))) return 'Por favor Insira apenas numeros no valor da conta';
  if (!datePagamento) return 'A data de pagamento da conta é obrigatorio';
  if (!dateVencimento) return 'A data de vencimento da conta é obrigatorio';
  if (datePagamento.indexOf('/') === -1) return 'Formato da data de pagamento invalido';
  if (dateVencimento.indexOf('/') === -1) return 'Formato da data de Vencimento invalido';

  let valorCorrigido = 0;
  let regraAplicada = '';
  let qtDiasAtraso = differenceInDays(
    formatStringtoDate(datePagamento, formatDate),
    formatStringtoDate(dateVencimento, formatDate),
  );
  if (qtDiasAtraso > 0 && qtDiasAtraso <= 3) {
    valorCorrigido = regraJurosEndMulta(valorOriginal, 2, 0.1, qtDiasAtraso);
    regraAplicada = '2% de multa e 0.1% de juros/dia';
  }
  if (qtDiasAtraso > 3 && qtDiasAtraso <= 5) {
    valorCorrigido = regraJurosEndMulta(valorOriginal, 3, 0.2, qtDiasAtraso);
    regraAplicada = '3% de multa e 0.2% de juros/dia';
  }
  if (qtDiasAtraso > 5) {
    valorCorrigido = regraJurosEndMulta(valorOriginal, 5, 0.3, qtDiasAtraso);
    regraAplicada = '5% de multa e 0.3% de juros/dia';
  }
  if (qtDiasAtraso < 0) {
    qtDiasAtraso = 0;
  }

  const result = await contasApagar.create({
    nome,
    valorOriginal: parseFloat(valorOriginal.replace(',', '.')),
    valorCorrigido,
    qtDiasAtraso,
    regraAplicada,
    datePagamento: formatStringtoDate(datePagamento, formatDate),
    dateVencimento: formatStringtoDate(dateVencimento, formatDate),
  });

  if (result && result.nome) {
    return 'Conta criada com sucesso!!! , Volta para a listagem de contas';
  }
  return result;
};
