import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  IconButton,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core'
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import getSorting from '../../../functions/getSorting'
import columnSort from '../../../functions/columnSort'
// import EnhancedTableHead from "../../../../shared/EnhancedTableHead";

const columns = [
  { id: 'time', label: 'Date', minWidth: 50, 
    format: (value) => `${new Date(value).getDate()} ${new Date(value).toLocaleString('default', { month: 'short' })} ${new Date(value).getFullYear()}`
  },
  { id: 'description', label: 'Meal type', minWidth: 50 },
  {
    id: 'meal',
    label: 'Meal',
    minWidth: 50,
    align: 'right',
    format: (value) => value.join(',\n')
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable( {data} ) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState('time');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log(columnSort(data, getSorting(order, orderBy)))

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {columnSort(data, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column, index) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={index} align={column.align}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <Box display="flex" justifyContent="flex-end">
                      <IconButton
                        // onClick={() => {
                        //   handleDeleteTargetDialogOpen(row);
                        // }}
                        aria-label="Modify"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        // onClick={() => {
                        //   handleDeleteTargetDialogOpen(row);
                        // }}
                        aria-label="Delete"
                      >
                        <DeleteIcon  />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}