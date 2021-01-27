import React from "react";
import { 
  IconButton,
  Box,
} from '@material-ui/core'
import DownloadIcon from "@material-ui/icons/CloudDownload";
import SearchIcon from '@material-ui/icons/Search';

function HeaderIcons(props) {

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
        <DownloadIcon />
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
        <SearchIcon  />
      </IconButton>
    </Box>
  )
}

export default HeaderIcons;
