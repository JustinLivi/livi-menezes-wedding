import { HttpMethod, ReduxStandardApicallingAction, ReduxStandardApicallingActionBody, RSAA } from 'redux-api-middleware';

export type IRsaaCreatorMapper<
  Params,
  Body extends ReduxStandardApicallingActionBody
> = (p: Params) => Body;

export interface BaseRsaaMeta {
  method: HttpMethod;
  endpoint: any;
  params?: object;
  body?: object;
}

export interface BaseRsaaAction {
  meta: BaseRsaaMeta;
}

export interface RsaaMeta<Method extends HttpMethod = any, Endpoint = any> {
  endpoint: Endpoint;
  method: Method;
}

export type RsaaActionCreatorFactory<
  Params extends RsaaMeta,
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

export function createRsaaActionCreatorFactory<FactoryParams extends RsaaMeta>(
  factory: RsaaActionCreatorFactory<FactoryParams>
) {
  return <ExtractorParams = never, Action extends BaseRsaaAction = never>(
    extractor: (
      params: ExtractorParams
    ) => RsaaMeta<Action['meta']['method'], Action['meta']['endpoint']>
  ) => (params: ExtractorParams) => factory(extractor(params) as FactoryParams);
}
