import bunyan from 'bunyan';
import stream from 'stream';

const tryStdout = new stream.Writable();
tryStdout._write = (chunk, encoding, done) => {
  try {
    process.stdout._write(chunk, encoding, () => done());
  } catch (ignore) {
    done();
  }
};

export const log = bunyan.createLogger({
  name: 'lmw',
  serializers: bunyan.stdSerializers,
  streams: [{ stream: tryStdout }]
});
