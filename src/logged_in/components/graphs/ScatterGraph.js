import React, { Fragment, useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

function ScatterGraph({data}) {

  const svgRef = useRef()
  const wrapperRef = useRef();

  

  useEffect(() => {

    data.map(el => {
      const hour = d3.timeFormat("%H")
      const minute = d3.timeFormat("%M")
      const date = new Date(el.time)
      const number = +hour(date)+minute(date)/60
      el.hour = number
      el.date = date
      return el
    })

    const svg = d3.select(svgRef.current)      

    const { width, height } = wrapperRef.current.getBoundingClientRect();

    const xValue = data => data.date;
    const xAxisLabel = 'Date'
    const yValue = data => data.hour;
    const yAxisLabel = 'Hour'
    const circleRadius = 5;
    const margin = {top: 50, right: 20, bottom: 65, left: 75}
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const now = new Date
    const color = d3.scaleOrdinal(data.map(d => d.description), d3.schemeCategory10)

    const xScale = d3.scaleTime()
      .domain([d3.extent(data, xValue)[0], now])
      .range([0, innerWidth])
      .nice();

    const xAxis = d3.axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(20)
      .ticks(d3.timeDay.every(3), "%a %e %b")

    const yScale = d3.scaleLinear()
      .domain([d3.extent(data, yValue)[0]-1,d3.extent(data, yValue)[1]+1])
      .range([innerHeight, 0])
      .nice()

    const yAxis = d3.axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(10)
      .tickFormat(d => d + "hr")

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const yAxisG = g.append('g')
      .call(yAxis)
        .style("stroke-dasharray", "2 2")
        .style("font","10px cabin")
        .attr("stroke-opacity", 0.5)
      
    yAxisG.selectAll('.domain')
        .remove()

    yAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', -50)
      .attr('x', -innerHeight/2)
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text(yAxisLabel)
    
    const xAxisG = g.append('g')
      .call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`)
        .attr("stroke-opacity", 0)
        .style("font","10px cabin")

        
    xAxisG.select('.domain')
      .remove()

    xAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', 50)
      .attr('x', innerWidth/2)
      .attr('fill', 'black')
      .text(xAxisLabel)

    g.selectAll('circle').data(data)
      .enter().append('circle') 
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', circleRadius)
        .attr("fill", d => color(d.description))
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut)
      // .on('mouseout', handleMouseOut)

    const tooltip = d3.select('.tooltip-area')
      .style('opacity', 0)

    function handleMouseOver (event, d) {
      d3.select(this).transition()
        .attr("fill", "yellow")
        .attr("opacity", 0.5)
        .attr("r", circleRadius * 2)

      const text = d3.select('.tooltip-area-text');
      text
        .text(`${d.description}: ${d.meal.join(', ')}`)
        .style("font","10px cabin")

      // const {width: w, height: h} = text.node().getBBox();
      let x = xScale(xValue(d)) + margin.left + 10
      let y = yScale(yValue(d)) + margin.top - 10

      tooltip
        .style("opacity", 0.85)
        .attr('transform', `translate(${x}, ${y})`)      
    }
    
    function handleMouseOut () {
      d3.select(this).transition()
        .attr("fill",  d => color(d.description))
        .attr("r", circleRadius)
        .attr("opacity", 1)
      
      tooltip.transition()
        .style("opacity", 0)
    }

  },[data])


  return (
    <Fragment>
    <div ref={wrapperRef}>
      <svg
        ref={svgRef}
        style={{
          height: 500,
          width: "100%",
          marginRight: "0px",
          marginLeft: "0px",
        }}
      >
        <g className="tooltip-area">
          <text className="tooltip-area-text"></text>
        </g>
      </svg>
    </div>
  </Fragment>
  );

}

export default ScatterGraph;



