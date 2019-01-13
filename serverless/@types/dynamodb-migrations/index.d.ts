declare module 'dynamodb-migrations' {
  import { DocumentClient, DynamoDB } from 'aws-sdk';

  interface DynamoDbConfig {
    doc: DocumentClient;
    raw: DynamoDB;
  }

  interface TableOptions {
    prefix?: string;
    suffix?: string;
  }

  export function init(dynamodb: DynamoDbConfig, migrationDir: string): void;
  export function create(migrationName: string): Promise<any>;
  export function execute(
    migrationName: string,
    tableOptions: TableOptions
  ): Promise<any>;
  export function executeAll(tableOptions: TableOptions): Promise<any>;
}
