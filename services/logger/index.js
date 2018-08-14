import winston from 'winston'
winston.add(winston.transports.File, { filename: 'log/output.log' });

export default winston
