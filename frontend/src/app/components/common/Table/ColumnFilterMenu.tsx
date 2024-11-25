import React from 'react';
import {Menu, MenuItem, FormControlLabel, Checkbox} from '@mui/material';

interface ColumnFilterMenuProps<T> {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  columns: Array<{id: keyof T; label: string}>;
  visibleColumns: Record<string, boolean>;
  onToggleColumn: (columnId: string) => void;
}

const ColumnFilterMenu = <T extends Record<string, any>>({
  anchorEl,
  open,
  onClose,
  columns,
  visibleColumns,
  onToggleColumn,
}: ColumnFilterMenuProps<T>) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {columns.map((column) => (
        <MenuItem key={String(column.id)}>
          <FormControlLabel
            control={
              <Checkbox
                checked={visibleColumns[String(column.id)]}
                onChange={() => onToggleColumn(String(column.id))}
              />
            }
            label={String(column.label)}
          />
        </MenuItem>
      ))}
    </Menu>
  );
};

export default ColumnFilterMenu;
