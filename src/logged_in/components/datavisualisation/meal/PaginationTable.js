import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow
} from '@material-ui/core'
import TableIcons from './TableIcons'
import ModifyDialog from './ModifyDialog'
import getSorting from '../../../functions/getSorting'
import columnSort from '../../../functions/columnSort'
import EnhancedTableHead from '../../../../shared/EnhancedTableHead';
import { useMutation, useQueryClient } from "react-query";
import { endpoint, mutations, mutateOptions } from '../../../../api'

const columns = [
  { id: 'time', label: 'Date', minWidth: 50, numeric: false,
    format: (value) => `${new Date(value).getDate()} ${new Date(value).toLocaleString('default', { month: 'short' })} ${new Date(value).getFullYear()}`
  },
  { id: 'description', label: 'Type', minWidth: 50, numeric: false },
  {
    id: 'meal',
    label: 'Meal',
    minWidth: 50,
    numeric: false,
    format: (value) => value.join(',\n')
  },
  {
    id: "actions",
    label: '',
    numeric: false,
    minWidth: 50,
  }
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
  const [isRowModificationDialogOpen, setIsRowModificationDialogOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  const queryClient = useQueryClient()

  const modifyMealMutation = useMutation((modifyMeal) => 
  fetch(endpoint, mutateOptions(modifyMeal))
    .then(res => res.json())
    ,
  {
    onSuccess: () => queryClient.invalidateQueries('meals') // note this needs to be consistent with the useQuery 
  }
)

  const handleRequestSort = useCallback(
    (__, property) => {
      const _orderBy = property;
      let _order = "desc";
      if (orderBy === property && order === "desc") {
        _order = "asc";
      }
      setOrder(_order);
      setOrderBy(_orderBy);
    },
    [setOrder, setOrderBy, order, orderBy]
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openRowModificationDialog = () => {
    setIsRowModificationDialogOpen(true)
  }

  const closeRowModificationDialog = () => {
    setIsRowModificationDialogOpen(false)
  }


  const handleRowModification = useCallback(
    (row) => {
      const payload = {
        UserId: 1,
        meal: ['tape', 'cows'],
        time: row.time,
      }
      modifyMealMutation.mutate(mutations.MODIFY_MEAL(payload))
    }, 
    [modifyMealMutation]
  )

  const handleRowDeletion = useCallback(
    (row) => {
      console.log(row)
    }, 
    []
  )

  return (
    <Paper className={classes.root}>
      <ModifyDialog 
        selectedRow={selectedRow}
        open={isRowModificationDialogOpen}
        onClose={closeRowModificationDialog}
        handleRowModification={handleRowModification}
      />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <EnhancedTableHead 
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            columns={columns}
          />
          <TableBody>
            {columnSort(data, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover tabIndex={-1} key={index}>
                  {columns.map((column, index) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={index} align={column.align}>
                        {column.id === 'actions' ? 
                        <TableIcons 
                          row={row} 
                          openRowModificationDialog={openRowModificationDialog}
                          handleRowDeletion={handleRowDeletion}
                          setSelectedRow={setSelectedRow}
                        /> 
                        : column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
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