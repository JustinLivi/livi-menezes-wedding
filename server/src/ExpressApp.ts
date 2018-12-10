import express, { Express } from 'express';
import { Server } from 'http';
import { mapValues } from 'lodash';
import { Socket } from 'net';

import { log } from './log';
import { awaitMap } from './util';

export interface IConnections {
  [key: string]: Socket;
}

export abstract class ExpressApp {
  public readonly express: Express = express();

  protected readonly connections: IConnections = {};
  protected server?: Server;

  constructor() {
    this.connections = {};
    this.handleOpenConnection = this.handleOpenConnection.bind(this);
    this.createCloseConnection = this.createCloseConnection.bind(this);
    this.configureMiddleware();
  }

  public async start(port: string | number) {
    try {
      if (this.server) {
        await this.server.close();
      }
      this.server = this.express.listen(port);
      return new Promise((resolve, reject) => {
        if (!this.server) {
          return reject(new Error('No running server'));
        }
        this.server.on('listening', () => {
          log.info({ port }, 'Server listening');
          resolve();
        });
        this.server.on('error', reject);
      });
    } catch (error) {
      throw error;
    }
  }

  public stop(timeout: number = 1000) {
    return new Promise((resolve, reject) => {
      if (!this.server) {
        return reject(new Error('No running server'));
      }
      this.server.close(resolve);
    }).then(() =>
      awaitMap(mapValues(this.connections, this.createCloseConnection(timeout)))
    );
  }

  protected abstract configureMiddleware(): void;

  protected createCloseConnection(timeout: number) {
    return (connection: Socket, key: string) =>
      new Promise((resolve, reject) => {
        log.info('Closing connection', { key });
        let closed = false;
        const timeoutId = setTimeout(() => {
          if (closed) {
            return;
          }
          closed = true;
          connection.destroy();
          delete this.connections[key];
          resolve();
        }, timeout);
        connection.end(() => {
          if (closed) {
            return;
          }
          closed = true;
          clearTimeout(timeoutId);
          delete this.connections[key];
          resolve();
        });
        connection.on('error', reject);
      });
  }

  protected handleOpenConnection(conn: Socket) {
    const key = `${conn.remoteAddress}:${conn.remotePort}`;
    this.connections[key] = conn;
    conn.on('close', () => {
      delete this.connections[key];
    });
  }
}
