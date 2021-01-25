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
    handleRowDeletion,
    setSelectedRow
  } = props
  
  return (
    <Box display="flex" justifyContent="flex-end">
      <IconButton
        onClick={() => {
          setSelectedRow(row)
          openRowModificationDialog()
        }}
        aria-label="Modify"
      >
        <EditIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          handleRowDeletion(row);
        }}
        aria-label="Delete"
      >
        <DeleteIcon  />
      </IconButton>
    </Box>
  )
}

export default TableIcons;
