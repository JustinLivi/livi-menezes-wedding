import { HttpMethod, ReduxStandardApicallingAction, ReduxStandardApicallingActionBody, RSAA } from 'redux-api-middleware';

export type IRsaaCreatorMapper<
  Params,
  Body extends ReduxStandardApicallingActionBody
> = (p: Params) => Body;

export interface IBaseRsaaMeta {
  method: HttpMethod;
  endpoint: string;
  params?: object;
  body?: object;
}

export interface IBaseRsaaAction {
  meta: IBaseRsaaMeta;
}

export type RsaaActionCreatorFactory<
  Params,
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

export function createRsaaActionCreatorFactory<FactoryParams>(
  factory: RsaaActionCreatorFactory<FactoryParams>
) {
  return <ExtractorParams = never, Action extends IBaseRsaaAction = never>(
    extractor: (params: ExtractorParams) => FactoryParams
  ) => (params: ExtractorParams) => factory(extractor(params));
}
