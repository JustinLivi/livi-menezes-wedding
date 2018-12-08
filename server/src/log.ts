import bunyan = require('bunyan');

export const log = bunyan.createLogger({
  name: 'livi-menezes-wedding',
  serializers: bunyan.stdSerializers
});
