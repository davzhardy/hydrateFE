import React from "react";
import { 
  IconButton,
  Box,
  Tooltip
} from '@material-ui/core'
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';

function TableIcons(props) {

  const {
    tableType,
    row,
    openRowModificationDialog,
    openRowDeletionDialog,
    setSelectedRow,
    setDescription,
    setMealValue,
    setDrink,
    setCupsValue,
    setVolumeValue,
    setTime
  } = props

  
  return (
    <Box display="flex" justifyContent="flex-end">
      <Tooltip
        title='Edit' arrow
      >
        {tableType === 'Meal' ?
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
        :
          <IconButton
              onClick={() => {
                setSelectedRow(row)
                setTime(row.time)
                setDrink(row.drink)
                setCupsValue(row.cups)
                setVolumeValue(row.volume)
                openRowModificationDialog()
              }}
              aria-label="Modify"
            >
              <EditIcon />
            </IconButton>
        }
      </Tooltip>
      <Tooltip
        title='Delete' arrow
      >
        {tableType === 'Meal' ?
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
        :
          <IconButton
            onClick={() => {
              setSelectedRow(row)
              setTime(row.time)
              setDrink(row.drink)
              setCupsValue(row.cups)
              setVolumeValue(row.volume)
              openRowDeletionDialog()
            }}
            aria-label="Delete"
          >
            <DeleteIcon  />
          </IconButton>
        }
      </Tooltip>
    </Box>
  )
}

export default TableIcons;
