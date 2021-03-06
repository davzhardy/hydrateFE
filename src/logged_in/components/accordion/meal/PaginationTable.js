import React, { useState, useCallback, Fragment } from 'react';
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@material-ui/core'
import TableIcons from '../shared/TableIcons'
import HeaderIcons from '../shared/HeaderIcons'
import TableToolbar from '../shared/TableToolbar'
import ModifyDialog from './ModifyDialog'
import DeleteDialog from './DeleteDialog'
import getSorting from '../../../functions/getSorting'
import columnSort from '../../../functions/columnSort'
import EnhancedTableHead from '../../../../shared/EnhancedTableHead';
import { useMutation, useQueryClient } from "react-query";
import { endpoint, mutations, mutateOptions } from '../../../../api'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    overflow: "hidden",
  },
  breakfast: {
    // color: theme.palette.getContrastText(pink[500]),
    backgroundColor: theme.palette.avatars.breakfast,
    width: theme.spacing(4),
    height: theme.spacing(4),
    margin: theme.spacing(0),
  }
}));

export default function PaginationTable(props) {

  const {
    data,
    UserId,
    columns
  } = props

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState('time');
  const [isRowModificationDialogOpen, setIsRowModificationDialogOpen] = useState(false)
  const [isRowDeletionDialogOpen, setIsRowDeletionDialogOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState([])
  const [description, setDescription] = useState('');
  const [mealValue, setMealValue] = useState('');
  const [time, setTime] = useState('');

  const queryClient = useQueryClient()

  const modifyMealMutation = useMutation((modifyMeal) => 
    fetch(endpoint, mutateOptions(modifyMeal))
      .then(res => res.json())
      ,
    {
      onSuccess: () => queryClient.invalidateQueries('meals') // note this needs to be consistent with the useQuery 
    }
  )

  const deleteMealMutation = useMutation((deleteMeal) => 
    fetch(endpoint, mutateOptions(deleteMeal))
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

  const openRowDeletionDialog = () => {
    setIsRowDeletionDialogOpen(true)
  }

  const closeRowModificationDialog = () => {
    setIsRowModificationDialogOpen(false)
  }

  const closeRowDeletionDialog = () => {
    setIsRowDeletionDialogOpen(false)
  } 

  const handleRowModification = useCallback(
    (oldRow, newMeal) => {
      const regex = /(,|\n)/g
      const payload = {
        UserId: UserId,
        meal: newMeal.replace(regex,',').split(','),
        time: oldRow.time,
      }
      modifyMealMutation.mutate(mutations.MODIFY_MEAL(payload))
    }, 
    [modifyMealMutation, UserId]
  )

  const handleRowDeletion = useCallback(
    (oldRow) => {
      const payload = {
        UserId: UserId,
        meal: oldRow.meal,
        time: oldRow.time,
      }
      deleteMealMutation.mutate(mutations.DELETE_MEAL(payload))
    }, 
    [deleteMealMutation, UserId]
  )

  const searchQuery = useSelector((state) => state.search.mealSearchValue)

  const filteredData = data.filter(el => {
    const mealArray = el['meal']
    return mealArray.some(el => el.toLowerCase().includes(searchQuery.toLowerCase()))
  })

  return (
    <Fragment>
      <ModifyDialog 
        selectedRow={selectedRow}
        open={isRowModificationDialogOpen}
        onClose={closeRowModificationDialog}
        handleRowModification={handleRowModification}
        description={description}
        setDescription={setDescription}
        mealValue={mealValue}
        setMealValue={setMealValue}
        time={time}
        setTime={setTime}
        isLoading={modifyMealMutation.isLoading}
      />
      <DeleteDialog
        selectedRow={selectedRow}
        open={isRowDeletionDialogOpen}
        onClose={closeRowDeletionDialog}
        handleRowDeletion={handleRowDeletion}
        isLoading={modifyMealMutation.isLoading}
      />
      <TableToolbar
        component={<HeaderIcons data={data} tableName={'Meal'}/>}
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
            {columnSort(filteredData, getSorting(order, orderBy))
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
                          openRowDeletionDialog={openRowDeletionDialog}
                          setSelectedRow={setSelectedRow}
                          setDescription={setDescription}
                          setMealValue={setMealValue}
                          setTime={setTime}
                          tableType={'Meal'}
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
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Fragment>
  );
}