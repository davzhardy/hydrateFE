import React from "react";
import { 
  IconButton,
  Box,
  Tooltip
} from '@material-ui/core'
import DownloadIcon from "@material-ui/icons/CloudDownload";
import { useQueryClient } from "react-query";
import TableSearch from './TableSearch'
import dataToCsv from '../../../functions/dataToCsv'
import createCsv from '../../../functions/createCsv'


function HeaderIcons(props) {

  const {

  } = props
 // https://www.youtube.com/watch?v=SX_IL7LqSxM

  const queryClient = useQueryClient()
  const mealsData = queryClient.getQueryData('meals').data.getAllMeals
  const csvData = dataToCsv(mealsData)
  
  return (
    <Box display="flex" justifyContent="flex-end">
      <Tooltip
        title='Download CSV Data' arrow
      >
        <IconButton
          onClick={() => {
            createCsv(csvData)
          }}
          aria-label="Download"
        >
          <DownloadIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        title='Search' arrow
      >
        <TableSearch 
          // searchText={searchText}
          // onSearch={handleSearch}
          // onHide={hideSearch}
          // options={options}
        />
      </Tooltip>
    </Box>
  )
}

export default HeaderIcons;
