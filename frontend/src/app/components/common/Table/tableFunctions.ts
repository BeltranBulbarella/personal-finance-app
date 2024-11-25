import {OrderType} from '@/app/types/types';
import {Dispatch, SetStateAction} from 'react';

/**
 * Comparator function for descending order.
 */
export const descendingComparator = <T>(
  a: T,
  b: T,
  orderBy: keyof T,
): number => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

/**
 * Returns a comparator function based on the order and orderBy.
 */
export const getComparator = <T>(
  order: OrderType<T>['order'],
  orderBy: keyof T,
) => {
  return order === 'desc'
    ? (a: T, b: T) => descendingComparator(a, b, orderBy)
    : (a: T, b: T) => -descendingComparator(a, b, orderBy);
};

/**
 * Performs a stable sort on the array using the provided comparator.
 */
export const stableSort = <T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
): T[] => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

/**
 * Handles the sorting state when a column header is clicked.
 */
export const handleRequestSort = <T>(
  currentOrder: OrderType<T>['order'],
  currentOrderBy: keyof T,
  setOrder: Dispatch<SetStateAction<OrderType<T>>>,
  property: keyof T,
): void => {
  const isAsc = currentOrderBy === property && currentOrder === 'asc';
  setOrder({order: isAsc ? 'desc' : 'asc', orderBy: property});
};

/**
 * Toggles the visibility of a column.
 */
export const handleToggleColumn = (
  columnId: string,
  setVisibleColumns: Dispatch<SetStateAction<Record<string, boolean>>>,
): void => {
  setVisibleColumns((prev) => ({
    ...prev,
    [columnId]: !prev[columnId],
  }));
};

/**
 * Extracts the sort value from a row based on the column.
 */
export const getSortValue = <T>(
  row: T,
  columnId: keyof T,
  getSortValueFn?: (row: T) => any,
): any => {
  return getSortValueFn ? getSortValueFn(row) : row[columnId];
};

/**
 * Creates a comparator function that handles nested sort values.
 */
export const createComparator = <T>(
  columns: Array<{id: keyof T; getSortValue?: (row: T) => any}>,
  order: OrderType<T>['order'],
  orderBy: keyof T,
): ((a: T, b: T) => number) => {
  return (a: T, b: T): number => {
    const column = columns.find((col) => col.id === orderBy);
    if (!column) return 0; // If no column is selected for sorting

    const aValue = getSortValue(a, column.id, column.getSortValue);
    const bValue = getSortValue(b, column.id, column.getSortValue);

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'desc' ? bValue - aValue : aValue - bValue;
    }

    const aStr = String(aValue).toLowerCase();
    const bStr = String(bValue).toLowerCase();

    if (bStr < aStr) return order === 'desc' ? -1 : 1;
    if (bStr > aStr) return order === 'desc' ? 1 : -1;
    return 0;
  };
};
