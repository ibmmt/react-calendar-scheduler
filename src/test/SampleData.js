import { formatDate } from '../_utils';

export const samepleEvents = [
  {
    id: 1,
    title: 'All Day Event very long title',
    startDate: formatDate(new Date(), 'dd/MM/yyyy'),
    endDate: formatDate(new Date(), 'dd/MM/yyyy'),
    startTime: '12:30:00',
    endTime: '16:00:00',
    bg_color: '#FFAB91',
  },
];
