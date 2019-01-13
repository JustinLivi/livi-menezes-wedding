import { HttpMethod, ReduxStandardApicallingAction, ReduxStandardApicallingActionBody, RSAA } from 'redux-api-middleware';

export type IRsaaCreatorMapper<
  Params,
  Body extends ReduxStandardApicallingActionBody
> = (p: Params) => Body;

export interface IBaseRsaaMeta {
  method: HttpMethod;
  endpoint: any;
  params?: object;
  body?: object;
}

export interface IBaseRsaaAction {
  meta: IBaseRsaaMeta;
}

export interface IRsaaMeta<Method extends HttpMethod = any, Endpoint = any> {
  endpoint: Endpoint;
  method: Method;
}

export type RsaaActionCreatorFactory<
  Params extends IRsaaMeta,
  Body extends ReduxStandardApicallingActionBody = ReduxStandardApicallingActionBody
> = (params: Params) => ReduxStandardApicallingAction<Body>;

export function configureRsaaActionCreatorFactory<
  Params,
  Body extends ReduxStandardApicallingActionBody = ReduxStandardApicallingActionBody
>(mapper: IRsaaCreatorMapper<Params, Body>) {
  return (params: Params): ReduxStandardApicallingAction<Body> => ({
    [RSAA]: mapper(params)
  });
}

export function createRsaaActionCreatorFactory<FactoryParams extends IRsaaMeta>(
  factory: RsaaActionCreatorFactory<FactoryParams>
) {
  return <ExtractorParams = never, Action extends IBaseRsaaAction = never>(
    extractor: (
      params: ExtractorParams
    ) => IRsaaMeta<Action['meta']['method'], Action['meta']['endpoint']>
  ) => (params: ExtractorParams) => (factory as any)(extractor(params));
}
