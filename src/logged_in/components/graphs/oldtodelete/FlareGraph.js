import React from 'react';
import * as d3 from 'd3';
import { useD3 } from '../../../functions/useD3'
import { colorLegend } from "./colorLegend.js";
import { sizeLegend } from "./sizeLegend.js";
import data from './data.json'
import { uid } from 'react-uid'

function FlareGraph() {

  const width = 975
  const height = width
  const format = d3.format(",d")
  const color = d3.scaleSequential([8, 0], d3.interpolateMagma)

  const pack = data => d3.pack()
    .size([width - 2, height - 2])
    .padding(3)
  (d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value))

  const root = pack(data)

  const ref = useD3(
    (svg) => {
    
      svg
        .attr("viewBox", [0, 0, width, height])
        .style("font", "10px sans-serif")
        .attr("text-anchor", "middle");

      const shadow = uid("shadow");

      const filter = (g) => 
      g
        .attr("id", shadow.id)

      const feDropShadow = (g) =>
      g
        .attr("flood-opacity", 0.3)
        .attr("dx", 0)
        .attr("dy", 1);

      const node = (g) => {
      g.data(d3.group(root.descendants(), d => d.height))
      .join("g")
        .attr("filter", shadow)
      .selectAll("g")
      .data(d => d[1])
      .join("g")
        .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`)
      .append("circle")
      .attr("r", d => d.r)
      .attr("fill", d => color(d.height))
      }
      
      console.log(node)

      svg.select('filter').call(filter)
      svg.select('feDropShadow').call(feDropShadow)
      svg.select('g').call(node)
  

      
    }
  )

  return (
    <svg
      ref={ref}
      style={{
        height: 500,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
    <g className='filter'/>
    <g className='feDropShadow'/>
      {/* <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
      <g className="y-title" /> */}
    </svg>
  );

}

export default FlareGraph;