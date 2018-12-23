declare module 'serverless-http' {
  import { APIGatewayEvent, Context } from 'aws-lambda';
  import { Express, Request, Response } from 'express';

  function s(app: Express, opts?: s.Options);

  namespace s {
    interface Transform {
      (req: Request, event: APIGatewayEvent, context: Context): void | Promise<
        void
      >;
    }
    interface Transform {
      (res: Response, event: APIGatewayEvent, context: Context): void | Promise<
        void
      >;
    }
    interface Transform extends Object {}
    interface Options {
      requestId?: false | string;
      request: Transform;
      response: Transform;
    }
  }

  export = s;
}
