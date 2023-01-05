const dateFns = require('date-fns');
const formatarData = (date) => {
  return dateFns.formatISO(date, {
    format: 'extended',
  });
};

module.exports = {
  formatarData,
};
