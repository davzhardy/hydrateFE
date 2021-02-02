const createCsv = data => {
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

export default createCsv;
