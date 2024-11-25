import React from 'react';
import {
  Box,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import FilterListIcon from '@mui/icons-material/FilterList';
import ColumnFilterMenu from '@/app/components/common/Table/ColumnFilterMenu';
import {
  createComparator,
  handleRequestSort,
  handleToggleColumn,
  stableSort,
} from '@/app/components/common/Table/tableFunctions';
import {useTableState} from '@/app/hooks/useTableState';

interface Column<T> {
  id: keyof T;
  label: string;
  format?: (row: T) => React.ReactNode;
  minWidth?: number;
  getSortValue?: (row: T) => any; // Optional function to extract sort value
}

interface CommonTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
}

const CommonTable = <T extends Record<string, any>>({
  columns,
  data,
  loading,
}: CommonTableProps<T>) => {
  // Use custom hook for table state management
  const {order, setOrder, visibleColumns, setVisibleColumns} = useTableState<T>(
    {
      columns,
    },
  );

  // State for the filter menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle sorting when a column header is clicked
  const onRequestSort = (property: keyof T) => {
    handleRequestSort(order.order, order.orderBy, setOrder, property);
  };

  // Handle column visibility toggle
  const onToggleColumn = (columnId: string) => {
    handleToggleColumn(columnId, setVisibleColumns);
  };

  // Create a comparator based on current order and orderBy
  const comparator = createComparator(columns, order.order, order.orderBy);

  return (
    <TableContainer component={Box}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {/* Render column headers */}
            {columns.map(
              (column) =>
                visibleColumns[String(column.id)] && (
                  <TableCell
                    key={String(column.id)}
                    sx={{minWidth: column.minWidth}}
                    align='center'
                    sortDirection={
                      order.orderBy === column.id ? order.order : false
                    }
                  >
                    <TableSortLabel
                      active={order.orderBy === column.id}
                      direction={
                        order.orderBy === column.id ? order.order : 'asc'
                      }
                      onClick={() => {
                        onRequestSort(column.id);
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 'bold',
                          width: '100%',
                          textAlign: 'center',
                          ml: 3,
                        }}
                      >
                        {column.label}
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                ),
            )}
            {/* Filter Icon Header */}
            <TableCell align='center' sx={{minWidth: 50}}>
              <IconButton
                aria-label='filter columns'
                onClick={handleClick}
                size='large'
              >
                <FilterListIcon />
              </IconButton>
              <ColumnFilterMenu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleClose}
                columns={columns}
                visibleColumns={visibleColumns}
                onToggleColumn={onToggleColumn}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              {columns.map(
                (column) =>
                  visibleColumns[String(column.id)] && (
                    <TableCell key={String(column.id)}>
                      <Skeleton
                        animation='wave'
                        height={40}
                        variant='text'
                        width={column.minWidth || '100%'}
                      />
                    </TableCell>
                  ),
              )}
              {/* Placeholder for actions column */}
              <TableCell align='center' sx={{minWidth: 50}}>
                {/* Empty cell to match the header's filter icon */}
              </TableCell>
            </TableRow>
          ) : (
            stableSort(data, comparator).map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                {columns.map(
                  (column) =>
                    visibleColumns[String(column.id)] && (
                      <TableCell key={String(column.id)} align='center'>
                        {column.format
                          ? column.format(row)
                          : row[String(column.id)]}
                      </TableCell>
                    ),
                )}
                {/* Placeholder for actions column */}
                <TableCell align='center' sx={{minWidth: 50}}>
                  {/* Empty cell or actions (e.g., edit/delete buttons) */}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommonTable;
