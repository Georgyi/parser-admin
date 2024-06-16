import { ColumnType } from "@/components/table";

export const COLUMNS: Array<ColumnType> = [
  { label: 'Logo',  name: 'companyImageUrl', columnStyles: { w: "60px", maxW: '60px'}, },
  { label: 'Job', name: 'jobTitle', hasSort: true, search: { type: 'text' }, columnStyles: { w: "30%", maxW: '30%'}, },
  { label: 'Company', name: 'companyName', hasSort: true, search: { type: 'text' }, columnStyles: { w: "30%", maxW: '30%'}, },
  { label: 'Location', name: 'jobLocation', hasSort: true, search: { type: 'text', name: 'location' }, columnStyles: { w: "30%", maxW: '30%'}, },
  { label: 'Date', name: 'jobCreatedAt', hasSort: true, search: { type: 'date' } },
  { label: 'Action', name: 'button' },
];

export const LIMIT = 25;
