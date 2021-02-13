import * as d3 from 'd3';

const Tooltip = (selection, props) => {

  const {
    startingOpacity
  } = props

  const createTooltip = d3.selectAll('.tooltip')
  
// need to set max width
// need to move depending on which side of the screen it is on

  createTooltip
    .style("opacity", startingOpacity)
    .style("position", "absolute")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "7px")
   
}

export default Tooltip