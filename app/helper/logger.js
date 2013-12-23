var winston = require('winston');
winston.loggers.add('logger', {
    console: {
      level: 'silly',
      colorize: true,
      label: 'category one'
    },
    file: {
      filename: './logs/log.json'
    }
  });
winston.loggers.add('databaseLogger', {
    console: {
      level: 'error',
      colorize: true,
      label: 'Database'
    },
    file: {
      filename: './logs/errors.json'
    }
  });

	


module.exports= winston;