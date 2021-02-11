import React, { useState, useCallback, Fragment } from 'react';
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow
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

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    overflow: "hidden",
  },
});

export default function PaginationTable( props ) {

  const {
    data,
    UserId,
    columns
  } = props

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState('time');
  const [isRowModificationDialogOpen, setIsRowModificationDialogOpen] = useState(false)
  const [isRowDeletionDialogOpen, setIsRowDeletionDialogOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState([])
  const [drinkType, setDrinkType] = useState('');
  const [cupsValue, setCupsValue] = useState('');
  const [volumeValue, setVolumeValue] = useState('');
  const [time, setTime] = useState('');

  const queryClient = useQueryClient()

  const modifyDrinkMutation = useMutation((modifyDrink) => 
    fetch(endpoint, mutateOptions(modifyDrink))
      .then(res => res.json())
      ,
    {
      onSuccess: () => queryClient.invalidateQueries('drinks') // note this needs to be consistent with the useQuery 
    }
  )

  const deleteDrinkMutation = useMutation((deleteDrink) => 
    fetch(endpoint, mutateOptions(deleteDrink))
      .then(res => res.json())
      ,
    {
      onSuccess: () => queryClient.invalidateQueries('drinks') // note this needs to be consistent with the useQuery 
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
    (oldRow, newDrink, newCups, newVolume) => {
      const payload = {
        UserId: UserId,
        drink: newDrink,
        cups: newCups,
        volume: newVolume,
        time: oldRow.time,
      }
      modifyDrinkMutation.mutate(mutations.MODIFY_DRINK(payload))
    }, 
    [modifyDrinkMutation, UserId]
  )

  const handleRowDeletion = useCallback(
    (oldRow) => {
      const payload = {
        UserId: UserId,
        drink: oldRow.drink,
        time: oldRow.time,
      }
      console.log('here',payload)
      deleteDrinkMutation.mutate(mutations.DELETE_DRINK(payload))
    }, 
    [deleteDrinkMutation, UserId]
  )

  const searchQuery = useSelector((state) => state.search.drinkSearchValue)

  const filteredData = data.filter(el => {
    return el['drink'].toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <Fragment>
      <ModifyDialog 
        selectedRow={selectedRow}
        open={isRowModificationDialogOpen}
        onClose={closeRowModificationDialog}
        handleRowModification={handleRowModification}
        drinkType={drinkType}
        setDrink = {setDrinkType}
        cupsValue={cupsValue}
        setCupsValue={setCupsValue}
        volumeValue={volumeValue}
        setVolumeValue={setVolumeValue}
        time={time}
        setTime={setTime}
        isLoading={modifyDrinkMutation.isLoading}
      />
      <DeleteDialog
        selectedRow={selectedRow}
        open={isRowDeletionDialogOpen}
        onClose={closeRowDeletionDialog}
        handleRowDeletion={handleRowDeletion}
        isLoading={modifyDrinkMutation.isLoading}
      />
      <TableToolbar
        component={<HeaderIcons data={data} tableName={'Drink'}/>}
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
                          setDrink = {setDrinkType}
                          setCupsValue={setCupsValue}
                          setVolumeValue={setVolumeValue}
                          setTime={setTime}
                          tableType={'Drink'}
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

// const useStyles = makeStyles({
//   box: {
//     margin: 10,
//   },
//   container: {
//     maxHeight: 440,
//   },
// });

// export default function StickyHeadTable({ data }) {
//   const classes = useStyles();
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Box className={classes.box}>
//       <TableContainer className={classes.container}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column, index) => (
//                 <TableCell
//                   key={index}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
//               return (
//                 <TableRow hover role="checkbox" tabIndex={-1} key={index}>
//                   {columns.map((column, index) => {
//                     const value = row[column.id];
//                     return (
//                       <TableCell key={index} align={column.align}>
//                         {column.id === 'time' && column.format ? column.format(value) : value}
//                       </TableCell>
//                     );
//                   })}
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={data.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onChangePage={handleChangePage}
//         onChangeRowsPerPage={handleChangeRowsPerPage}
//       />
//     </Box>
//   );
// }