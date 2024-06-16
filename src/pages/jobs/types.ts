export type JobType = {
  jobId: number;

  companyImageUrl: string;
  companyName: string;
  companyUrl: string;
  jobLocation: string;
  jobTitle: string;
  jobUrl: string;
  referenceId: string;
  timeMessage: string;
  trackingId: string;

  createdAt: string;
  updatedAt: string;
  date: string;
  jobCreatedAt: string;
}

export type JobFilterType = { [key: string]: string | number | JobFilterType };

export type SortDirectionType = 'asc' | 'desc' | undefined;

export type SortType = { [key: string]: SortDirectionType };

export type JobsRequestParams = { page: number; limit: number; filter: JobFilterType; sort: SortType };
