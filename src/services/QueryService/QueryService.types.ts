import type { Query, QueryResponse } from '@/types/query';
import type { CreateQueryFormValues } from '@/views/CalculatorView/CalculatorView.vue';

export type GetQueryResponse = QueryResponse[];

export type CreateQueryRequest = Partial<CreateQueryFormValues>;

export type CreateQueryResponse = Query;
