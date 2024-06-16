import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/basic/api-client';
import { JobsRequestParams, JobType } from '@/pages/jobs/types';
import { PageType, Response } from '@/shared/types';
import { getUrlWithParams } from '@/shared/utils/api';

function fetchJobsRequest(params: JobsRequestParams) {
  return apiClient
    .get<Response<PageType<JobType>>>(
      getUrlWithParams({
        url: '/jobs',
        ...params,
      }),
    )
    .then((res) => res.data);
}

export function useJobsQuery(params: JobsRequestParams) {
  return useQuery({ queryKey: ['jobs', params], queryFn: () => fetchJobsRequest(params) });
}
