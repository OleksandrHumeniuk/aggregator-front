import ServiceAPI from '../index';

import type { GetQueryResponse, CreateQueryRequest, CreateQueryResponse } from './QueryService.types';

class QueryService extends ServiceAPI {
  public static getQuery(id: string) {
    return this.get<GetQueryResponse>(`/query/${id}`);
  }

  public static createQuery(query: CreateQueryRequest) {
    return this.post<CreateQueryRequest, CreateQueryResponse>('/query', query);
  }
}

export default QueryService;
