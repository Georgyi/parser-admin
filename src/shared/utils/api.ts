import { JobFilterType, SortType } from '@/pages/jobs/types';

export function sortToParams({ sort }: { sort: SortType }) {
  const list = Object.entries(sort).reduce((acc, [key, value]) => {
    if (!value) return acc;
    return [...acc, `sort=${key},${encodeURIComponent(value)}`];
  }, [] as Array<string>);

  return list.join('&');
}

export function filterToParams({ filter, prefix = '' }: { filter: JobFilterType; prefix?: string }): string {
  let str: string[] = [];

  for (let p in filter) {
    if (filter.hasOwnProperty(p)) {
      const fieldPath = prefix ? `${prefix}.${p}` : p;
      const v = filter[p];

      str.push(
        v !== null && typeof v === 'object'
          ? filterToParams({ filter: v, prefix: fieldPath })
          : v
            ? `${fieldPath}=${encodeURIComponent(v)}`
            : '',
      );
    }
  }

  return str.filter(Boolean).join('&');
}

export function getUrlWithParams({
  url,
  page,
  limit,
  sort,
  filter,
}: {
  url: string;
  page?: number;
  limit?: number;
  sort?: SortType;
  filter?: JobFilterType;
}) {
  const paramsList = [];

  if (page !== undefined) {
    paramsList.push(`page=${encodeURIComponent(page)}`);
  }

  if (limit !== undefined) {
    paramsList.push(`limit=${encodeURIComponent(limit)}`);
  }

  if (!!sort && Object.values(sort).length > 0) {
    paramsList.push(sortToParams({ sort }));
  }

  if (!!filter && Object.values(filter).length > 0) {
    paramsList.push(filterToParams({ filter: { filter } }));
  }

  return `${url}?${paramsList.filter(Boolean).join('&')}`;
}
