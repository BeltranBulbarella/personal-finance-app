import {useEffect, useState} from 'react';
import {OrderType} from '@/app/types/types';

interface UseTableStateProps<T> {
  columns: Array<{id: keyof T}>;
  sortOrderKey?: string;
  visibleColumnsKey?: string;
}

export const useTableState = <T extends Record<string, any>>({
  columns,
  sortOrderKey = 'CommonTable_sortOrder',
  visibleColumnsKey = 'CommonTable_visibleColumns',
}: UseTableStateProps<T>) => {
  // Initialize 'order' state from localStorage or default
  const [order, setOrder] = useState<OrderType<T>>(() => {
    if (typeof window === 'undefined') {
      return {order: 'asc', orderBy: ''};
    }
    const savedOrder = localStorage.getItem(sortOrderKey);
    if (savedOrder) {
      try {
        return JSON.parse(savedOrder) as OrderType<T>;
      } catch (error) {
        console.error('Failed to parse sortOrder from localStorage:', error);
      }
    }
    return {order: 'asc', orderBy: ''};
  });

  // Initialize 'visibleColumns' state from localStorage or default
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    () => {
      if (typeof window === 'undefined') {
        return columns.reduce(
          (acc, column) => {
            acc[String(column.id)] = true;
            return acc;
          },
          {} as Record<string, boolean>,
        );
      }

      const savedVisibility = localStorage.getItem(visibleColumnsKey);
      if (savedVisibility) {
        try {
          const parsed = JSON.parse(savedVisibility) as Record<string, boolean>;
          return columns.reduce(
            (acc, column) => {
              acc[String(column.id)] = parsed[String(column.id)] ?? true;
              return acc;
            },
            {} as Record<string, boolean>,
          );
        } catch (error) {
          console.error(
            'Failed to parse visibleColumns from localStorage:',
            error,
          );
        }
      }

      // Default: all columns visible
      return columns.reduce(
        (acc, column) => {
          acc[String(column.id)] = true;
          return acc;
        },
        {} as Record<string, boolean>,
      );
    },
  );

  // Save 'order' state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(sortOrderKey, JSON.stringify(order));
  }, [order, sortOrderKey]);

  // Save 'visibleColumns' state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(visibleColumnsKey, JSON.stringify(visibleColumns));
  }, [visibleColumns, visibleColumnsKey]);

  return {order, setOrder, visibleColumns, setVisibleColumns};
};
