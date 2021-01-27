import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useD3 } from '../../functions/useD3'
import { colorLegend } from "./colorLegend.js";
import { sizeLegend } from "./sizeLegend.js";
import data from './data.json'
import { uid } from 'react-uid'

function FlareGraph() {

  
const height = 975
const width = height
const format = d3.format(",d")
const color = d3.scaleSequential([8, 0], d3.interpolateMagma)

const pack = data => d3.pack()
.size([width - 2, height - 2])
.padding(3)
(d3.hierarchy(data)
.sum(d => d.value)
.sort((a, b) => b.value - a.value))

const svgRef = useRef()

useEffect(() => {
  const svg = d3.select(svgRef.current)
    .attr("viewBox", [0, 0, width, height])
    .style("font", "10px sans-serif")
    .attr("text-anchor", "middle");

    
    const colorScale = d3.scaleOrdinal()
      .domain(['apple', 'lemon', 'lime', 'orange'])
      .range(['#c11d1d', 'yellow', 'green', 'orange'])

      const sizeScale = d3.scaleSqrt()
        .domain([0, 10])
        .range([0,30])

        svg.append('g')
  .attr('transform', `translate(100,100)`)
  .call(colorLegend, {
    colorScale,
    circleRadius: 30,
    spacing: 100,
    textOffset: 50
  })

  svg.append('g')
  .attr('transform', `translate(300,50)`)
  .call(sizeLegend, {
    sizeScale,
    spacing: 60,
    textOffset: 50,
    numTicks: 5,
    circleFill: 'blue',
  })

  },[])


  return (
    <svg
      ref={svgRef}
      style={{
        height: 500,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
    {/* <g className='filter'/>
    <g className='feDropShadow'/> */}
      {/* <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
      <g className="y-title" /> */}
    </svg>
  );

}

export default FlareGraph;



