import moment from 'moment';
require('moment/locale/is.js');

moment.updateLocale('is', {
  weekdays: [
    'sunnudag',
    'mánudag',
    'þriðjudag',
    'miðvikudag',
    'fimmtudag',
    'föstudag',
    'laugardag'
  ]
});

export const momentFormatter = date => moment(date).locale('is');

export const timeFormatter = time => {
  const split = time && time.split(':');
  return split && `${Number(split[0])}:${split[1]}`;
};
