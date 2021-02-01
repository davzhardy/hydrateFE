import React from "react";
import { 
  IconButton,
  Box,
} from '@material-ui/core'
import DownloadIcon from "@material-ui/icons/CloudDownload";
import SearchIcon from '@material-ui/icons/Search';
import { useQueryClient } from "react-query";

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

  const queryClient = useQueryClient()
  const mealsData = queryClient.getQueryData('meals').data.getAllMeals

  const dataToCsv = data => {
    const csvRows =[];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map(header => {
        const escaped = (''+row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`
      })
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n')
  }

  const download = data => {
    const blob = new Blob([data, {type: 'text/csv'}])
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('hidden', '')
    a.setAttribute('href', url)
    a.setAttribute('download', 'yourData.csv')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const csvData = dataToCsv(mealsData)
  
  return (
    <Box display="flex" justifyContent="flex-end">
      <IconButton
        onClick={() => {
          download(csvData)
        }}
        aria-label="Download"
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
        aria-label="Search"
      >
        <SearchIcon  />
      </IconButton>
    </Box>
  )
}

export default HeaderIcons;
