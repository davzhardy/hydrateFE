import React from "react";
import { 
  IconButton,
  Box,
} from '@material-ui/core'
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';

function TableIcons(props) {

  const {
    row,
    openRowModificationDialog,
    openRowDeletionDialog,
    setSelectedRow,
    setDescription,
    setMealValue,
    setTime
  } = props
  
  return (
    <Box display="flex" justifyContent="flex-end">
      <IconButton
        onClick={() => {
          setSelectedRow(row)
          setDescription(row.description)
          setMealValue(row.meal)
          setTime(row.time)
          openRowModificationDialog()
        }}
        aria-label="Modify"
      >
        <EditIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          setSelectedRow(row)
          setDescription(row.description)
          setMealValue(row.meal)
          setTime(row.time)
          openRowDeletionDialog()
        }}
        aria-label="Delete"
      >
        <DeleteIcon  />
      </IconButton>
    </Box>
  )
}

export default TableIcons;
