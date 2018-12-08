import bodyParser = require('body-parser');
import express, { Express } from 'express';
import { Server } from 'http';
import { mapValues } from 'lodash';
import { Socket } from 'net';

export interface IConnections {
  [key: string]: Socket;
}

export class App {
  private readonly connections: IConnections = {};
  private readonly express: Express = express();
  private server?: Server;

  constructor() {
    this.connections = {};
    this.handleOpenConnection = this.handleOpenConnection.bind(this);
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
        this.server.on('listening', resolve);
        this.server.on('error', reject);
      });
    } catch (error) {
      throw error;
    }
  }

  public stop() {
    return new Promise((resolve, reject) => {
      if (!this.server) {
        return reject(new Error('No running server'));
      }
      this.server.close(resolve);
    }).then(() => {
      mapValues(this.connections, (connection, key) => {
        connection.end();
        delete this.connections[key];
      });
    });
  }

  private configureMiddleware() {
    this.express.use(bodyParser.json);
  }

  private handleOpenConnection(conn: Socket) {
    const key = `${conn.remoteAddress}:${conn.remotePort}`;
    this.connections[key] = conn;
    conn.on('close', () => {
      delete this.connections[key];
    });
  }
}
