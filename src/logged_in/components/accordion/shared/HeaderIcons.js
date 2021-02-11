import React from "react";
import { 
  IconButton,
  Box,
  Tooltip
} from '@material-ui/core'
import DownloadIcon from "@material-ui/icons/CloudDownload";
import MealTableSearch from '../meal/TableSearch'
import DrinkTableSearch from '../drink/TableSearch'
import dataToCsv from '../../../functions/dataToCsv'
import createCsv from '../../../functions/createCsv'


function HeaderIcons(props) {

  const {
    data,
    tableName
  } = props

  let csvData;
  if (data.length) csvData = dataToCsv(data)

  return (
    <Box display="flex" justifyContent="flex-end" width='100%'>
      <Tooltip title='Download CSV Data' arrow>
        <IconButton
          onClick={() => {createCsv(csvData)}}
          aria-label="Download"
        >
          <DownloadIcon />
        </IconButton>
      </Tooltip>
      {tableName === 'Meal' ? <MealTableSearch data ={data}/>: <DrinkTableSearch data ={data}/>}
    </Box>
  )
}

export default HeaderIcons;
