import React, { Fragment, useRef, useEffect, memo } from 'react';
import * as d3 from 'd3';
import { 
  withStyles
} from '@material-ui/core'
import Tooltip from '../Tooltip'
import { mouseOver, mouseMove, mouseLeave } from '../mouseEvents'

const styles = theme => ({
  tooltip: {
    borderColor: theme.palette.common.alternative,
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

    const titleText = 'Total meals registered'
    const names = new Set(data.map(d => d.meal))
    const descriptions = new Set(data.map(d => d.description))
    const values = new Set(data.map(d => d.value))

    function sequence (length) {
      return Array.apply(null, {length: length}).map((d, i) => i);
    }

    const color = d3.scaleOrdinal(d3.schemeTableau10)
      .domain(sequence(data.length-1))

    const size= d3.scaleSqrt()
      .domain([0, Math.max(...values)])
      .range([0,60/Math.pow(data.length,1/5)])

    const wrapper = d3.select(wrapperRef.current)    
    const displayedTooltip = wrapper
      .append("div")
      .attr('class', 'tooltip')

    displayedTooltip.call(Tooltip, {
      startingOpacity: 0,
    })

    const randomizedXScale = d3.scaleLinear().domain([0, 1]).range([0, innerWidth/2])

    const g = svg.append('g')
      .attr('class', 'packing')
      .attr('transform', `translate(0,0)`)

    const node = g
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
        .attr("class", "node")
        .attr("r", function(d){ return size(d.value)})
        .attr("cx", innerWidth / 2)
        .attr("cy", innerHeight / 2)
        .style("fill", function(d, i){ 
          return color([...descriptions].indexOf(d.description))
        })
        .style("fill-opacity", 1)
        // .attr("stroke", "black")
        // .style("stroke-width", 1)
        .style("cursor", "grab")
        .on("mouseover", (event, d) => {
          mouseOver(displayedTooltip)
        })
        .on("mousemove", (event, d) => {
          const tooltipTextFormat = `${d.meal} <br> Eaten ${d.value} times`
          mouseMove(displayedTooltip, tooltipTextFormat, event, d)
        })
        .on("mouseleave",(event, d) => {
          mouseLeave(displayedTooltip)
        })
        .call(d3.drag() // call specific function when circle is dragged
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
  
    const simulation = d3.forceSimulation()
      // .force("center", d3.forceCenter().x(width / 2).y(height / 2+margin.top)) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(10)) // Nodes are attracted one each other of value is > 0
      .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.value)+3) }).iterations(1)) // Force that avoids circle overlapping
      .force('y', d3.forceY().y(function(d) {
        return height / 2+margin.top-margin.bottom/2;
      }))
      .force('x', d3.forceX().x(function(d) {
        return randomizedXScale(Math.random())+innerWidth/4+margin.left*2/3;
      }))

    simulation
      .nodes(data)
      .on("tick", function(d){
        node
          .attr("cx", function(d){ return d.x; })
          .attr("cy", function(d){ return d.y; })
      });

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(.03).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }
    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(.03);
      d.fx = null;
      d.fy = null;
    }

    const legendG = svg
      .append("g")
      .attr('class', 'legend')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const legend = legendG.selectAll("g")
      .data(descriptions)
      .join("g")      
      .attr("opacity", 1)
      .attr("transform", (d, i) => `translate(0,${i * 30})`)
    //   .on("mouseover", highlight)
    //   .on("mouseout", restore);
    
    legend.append("rect")
      .attr("rx", 3).attr("ry", 3)
      .attr("width", 30).attr("height", 20)
      .style("cursor", "pointer")
      .attr("fill", (d, i) => {
        return color(i)
      });    
    
    legend.append("text")
      .attr("dx", 40)
      .attr("dy", 15)
      // .attr("alignment-baseline", "baseline")
      .text((d, i) => `${d}`);

    const titleG = svg.selectAll(".packing")
      .append("g")
      .attr('class', 'title')
      .attr("transform", `translate(${innerWidth/2 },${margin.top})`)

    titleG.append('text')
      .text(titleText)
      .attr("alignment-baseline", "hanging")
      .style("font-size", "1rem")

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

export default withStyles(styles, { withTheme: true })(memo(PackingGraph));



