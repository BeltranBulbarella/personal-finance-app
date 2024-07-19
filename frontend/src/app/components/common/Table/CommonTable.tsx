import React from 'react';
import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Typography from '@mui/material/Typography';

interface Column {
  id: string;
  label: string;
  format?: (value: any) => any | string;
  minWidth?: number;
}

interface CommonTableProps {
  columns: Column[];
  data: any[];
  loading?: boolean;
}

const CommonTable = ({columns, data, loading}: CommonTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                sx={{minWidth: column.minWidth}}
                align='center'
              >
                <Typography
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  {column.label}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <Skeleton
                    animation='wave'
                    height={40}
                    variant='text'
                    width={column.minWidth || '100%'}
                  />
                </TableCell>
              ))}
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id} align='center'>
                    {column.format ? column.format(row) : row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommonTable;
