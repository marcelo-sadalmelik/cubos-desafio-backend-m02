const dateFns = require('date-fns');
const formatarData = (date) => {
  return dateFns.formatISO(date, {
    format: 'extended',
  });
};

const buscarConta = (numero_conta, contas) => {
  return contas.find((conta) => conta.numero === numero_conta);
};

module.exports = {
  formatarData,
  buscarConta,
};
