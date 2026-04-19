import {
  LookupFilterOperation,
  LookupSortingDirection,
} from "../../assets/enums";

export interface BaseAuditableDTO {
  createdDateTime?: string;
  createdBy?: string;
  modifiedDateTime?: string;
  modifiedBy?: string;
}

export interface LookupFilterDTO {
  columnName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  operation: LookupFilterOperation;
}

export interface LookupSortingDTO {
  columnName: string;
  direction: LookupSortingDirection;
}

export interface LookupRepositoryDTO {
  searchTerm: string;
  pageNumber: number;
  pageSize: number;
  filters: LookupFilterDTO[];
  sorting: LookupSortingDTO[];
}

export interface DataTableColumn {
  key: string;
  header: string;
}

export interface PagedListResponse<T> {
  columns: DataTableColumn[];
  items: T[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
  key: string;
}
