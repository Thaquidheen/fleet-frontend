import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Chip, Avatar, IconButton } from '@mui/material';
import { Edit, Delete, LocationOn } from '@mui/icons-material';
import { Vehicle, VehicleStatus } from '@avl/shared-types';
import { DataTable } from '../ui/DataTable';

interface VehicleTableProps {
  vehicles: Vehicle[];
  loading?: boolean;
  onEdit?: (vehicle: Vehicle) => void;
  onDelete?: (vehicle: Vehicle) => void;
  onTrack?: (vehicle: Vehicle) => void;
  onSelectionChange?: (vehicles: Vehicle[]) => void;
}

const getStatusColor = (status: VehicleStatus) => {
  switch (status) {
    case 'ACTIVE': return 'success';
    case 'INACTIVE': return 'default';
    case 'MAINTENANCE': return 'warning';
    case 'OUT_OF_SERVICE': return 'error';
    default: return 'default';
  }
};

export const VehicleTable: React.FC<VehicleTableProps> = ({
  vehicles,
  loading = false,
  onEdit,
  onDelete,
  onTrack,
  onSelectionChange,
}) => {
  const columns: ColumnDef<Vehicle>[] = [
    {
      accessorKey: 'registrationNumber',
      header: 'Registration',
      cell: ({ row }) => (
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
            {row.original.registrationNumber.charAt(0)}
          </Avatar>
          <Typography fontWeight={500}>
            {row.original.registrationNumber}
          </Typography>
        </Box>
      ),
      size: 200,
    },
    {
      accessorKey: 'make',
      header: 'Make & Model',
      cell: ({ row }) => (
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {row.original.make} {row.original.model}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {row.original.year}
          </Typography>
        </Box>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => (
        <Chip label={row.original.type} size="small" variant="outlined" />
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Chip
          label={row.original.status}
          size="small"
          color={getStatusColor(row.original.status)}
        />
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Box display="flex" gap={1}>
          <IconButton size="small" onClick={() => onTrack?.(row.original)}>
            <LocationOn />
          </IconButton>
          <IconButton size="small" onClick={() => onEdit?.(row.original)}>
            <Edit />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete?.(row.original)} color="error">
            <Delete />
          </IconButton>
        </Box>
      ),
      size: 120,
    },
  ];

  return (
    <DataTable
      data={vehicles}
      columns={columns}
      loading={loading}
      title="Fleet Vehicles"
      selectable
      onSelectionChange={onSelectionChange}
      searchable
      pageSize={25}
      height={600}
    />
  );
};
