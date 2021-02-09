import React, { Fragment, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { 
  withStyles
} from '@material-ui/core'
import Tooltip from './Tooltip'
import { mouseOver, mouseMove, mouseLeave } from './mouseEvents'

const styles = theme => ({
  tooltip: {
    borderColor: theme.palette.common.alternative,
    // position: "absolute",
  }
})

function PackingGraph(props) {
  const {
    data,
    classes
  } = props

  const svgRef = useRef()
  const wrapperRef = useRef();

  useEffect(() => {   
    const svg = d3.select(svgRef.current)    
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    const margin = {top: 50, right: 20, bottom: 65, left: 75}
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const color = d3.scaleOrdinal(data.map(d => d.description), d3.schemeSet1)
    const size= d3.scaleSqrt()
      .domain([0, 10])
      .range([0,innerHeight/10])

    const wrapper = d3.select(wrapperRef.current)    
    const displayedTooltip = wrapper
      .append("div")
      .attr('class', 'tooltip')

    displayedTooltip.call(Tooltip, {
      startingOpacity: 0
    })

    // const displayedTooltip = d3.select("#PackingGraph")
    //   .append("div")
    //   .style("opacity", 0)
    //   .style("position", "absolute")
    //   .style("background-color", "white")
    //   .style("border", "solid")
    //   .style("border-width", "1px")
    //   .style("border-radius", "5px")
    //   .style("padding", "7px")
  
    // // Three function that change the tooltip when user hover / move / leave a cell
    // const mouseover = function(event, d) {
    //   console.log('yo')
    //   graphTooltip
    //     .style("opacity", 0.97)
    // }
    // const mousemove = function(event, d) {
    //   graphTooltip
    //     .html(d.description + "<br>" + "Eaten "+ d.value + " times")
    //     .style("left", (d.x) + "px")
    //     .style("top", (event.screenY) + "px")
    //     .style("width", "max-Content")
    //     .style("opacity", 0.97)
    // }
    // const mouseleave = function(d) {
    //   graphTooltip
    //     .style("opacity", 0)
    // }
    
    const node = svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
        .attr("class", "node")
        .attr("r", function(d){ return size(d.value)})
        .attr("cx", innerWidth / 2)
        .attr("cy", innerHeight / 2)
        .style("fill", function(d){ return color(d.description)})
        .style("fill-opacity", 0.8)
        .attr("stroke", "black")
        .style("stroke-width", 1)
        .on("mouseover", (event, d) => {
          mouseOver(displayedTooltip ,event, d)
        })
        .on("mousemove", (event, d) => {
          mouseMove(displayedTooltip ,event, d)
        })
        // .on("mouseover", mouseover) // What to do when hovered
        // .on("mousemove", mouseMove(graphTooltip))
        .on("mouseleave",(event, d) => {
          mouseLeave(displayedTooltip ,event, d)
        })
        // .call(d3.drag() // call specific function when circle is dragged
        //      .on("start", dragstarted)
        //      .on("drag", dragged)
        //      .on("end", dragended));
  
    const simulation = d3.forceSimulation()
      .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
      .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.value)+3) }).iterations(1)) // Force that avoids circle overlapping

    simulation
      .nodes(data)
      .on("tick", function(d){
        node
            .attr("cx", function(d){ return d.x; })
            .attr("cy", function(d){ return d.y; })
      });

    // function dragstarted(d) {
    //   if (!d3.event.active) simulation.alphaTarget(.03).restart();
    //   d.fx = d.x;
    //   d.fy = d.y;
    // }
    // function dragged(d) {
    //   d.fx = d3.event.x;
    //   d.fy = d3.event.y;
    // }
    // function dragended(d) {
    //   if (!d3.event.active) simulation.alphaTarget(.03);
    //   d.fx = null;
    //   d.fy = null;
    // }

  })

  return (
    <Fragment>
    <div  id="PackingGraph" ref={wrapperRef}>
      <svg
        ref={svgRef}
        style={{
          height: 500,
          width: "100%",
          marginRight: "0px",
          marginLeft: "0px",
        }}
      >
      </svg>
    </div>
    </Fragment>
  );

}

export default withStyles(styles, { withTheme: true })(PackingGraph);



