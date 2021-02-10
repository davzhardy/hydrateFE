import React, { Fragment, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import Tooltip from '../Tooltip'
import { mouseOver, mouseMove, mouseLeave } from '../mouseEvents'

function BarchartGraph({data}) {

  const svgRef = useRef()
  const wrapperRef = useRef();

  useEffect(() => {

    data = [{name: "EF", value: 0.12702}, {name: "T", value: 0.09056}]

    const svg = d3.select(svgRef.current)      

    const { width, height } = wrapperRef.current.getBoundingClientRect();
    const margin = {top: 50, right: 40, bottom: 65, left: 75}
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const now = new Date
    const color = "steelblue"

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice()
      .range([innerHeight,0])

    const x = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([innerWidth, 0])
      .padding(0.2)

    const yAxis = g => g
      .call(d3.axisLeft(y).ticks(null, data.format))
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(data.y))

    const xAxis = g => g
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].name).tickSizeOuter(0))

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
    
    g.selectAll("rect").data(data)
      .enter().append("rect")
        .attr("x", (d, i) => x(i))
        .attr("y", d => y(d.value))
        .attr("height", d => y(0) - y(d.value))
        .attr("width", x.bandwidth())
        .attr("fill", color)

    g.append("g")
      .call(xAxis);

    g.append("g")
      .call(yAxis);

  },[data])


  return (
    <Fragment>
    <div id="BarchartGraph" ref={wrapperRef}>
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

export default BarchartGraph;



