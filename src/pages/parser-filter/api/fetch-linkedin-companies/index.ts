import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/basic/api-client';
import { PageType, Response } from '@/shared/types';
import { getUrlWithParams } from '@/shared/utils/api';

export type CompanyLinkedInType = {
  displayName: string;
  id: string;
  trackingId: string;
  type: string;
};

type CompaniesLinkedInRequestType = { text: string };

function fetchCompaniesLinkedInRequest(params: CompaniesLinkedInRequestType) {
  return apiClient
    .get<Response<PageType<CompanyLinkedInType[]>>>(
      getUrlWithParams({
        url: '/',
        ...params,
      }),
      {
        baseURL: '/lapi',
      },
    )
    .then((res) => res.data);
}

const companiesLinkedInMutation = useMutation({ mutationFn: fetchCompaniesLinkedInRequest });
