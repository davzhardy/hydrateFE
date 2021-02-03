import React, { Fragment, useRef, useEffect } from 'react';
import * as d3 from 'd3';

function ScatterGraph({data}) {

  const svgRef = useRef()
  const wrapperRef = useRef();

  useEffect(() => {

    
    const d = data.map(el => {
      const hour = d3.timeFormat("%H")
      const minute = d3.timeFormat("%M")
      const date = new Date(el.time)
      const number = +hour(date)+minute(date)/60
      el.time=number
      return el
    })

    const svg = d3.select(svgRef.current)
    const { width, height } = wrapperRef.current.getBoundingClientRect();

    const xValue = data => data.value;
    const xAxisLabel = 'Meal'
    const yValue = data => data.time;
    const yAxisLabel = 'Time'
    const title = `${xAxisLabel} vs ${yAxisLabel} `
    const circleRadius = 5;
    const margin = {top: 50, right: 20, bottom: 65, left: 100}
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();

    const xAxis = d3.axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(20)

    const yScale = d3.scaleLinear()
      .domain([d3.extent(data, yValue)[0]-1,d3.extent(data, yValue)[1]+1])
      .range([innerHeight, 0])
      .nice()

    const yAxis = d3.axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(10)

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const yAxisG = g.append('g')
      .call(yAxis)
        .style("stroke-dasharray", "5 5")
      
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
        .style("stroke-dasharray", "5 5")
        
    xAxisG.select('.domain')
      .remove()

    xAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', 40)
      .attr('x', innerWidth/2)
      .attr('fill', 'black')
      .text(xAxisLabel)

    g.selectAll('circle').data(data)
      .enter().append('circle') 
        .attr('cy', data => yScale(yValue(data)))
        .attr('cx', data => xScale(xValue(data)))
        .attr('r', circleRadius)
      
    g.append('text')
      .attr('class', 'title')
      .attr('y', -10)
      .text(title)

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
      </svg>
    </div>
  </Fragment>
  );

}

export default ScatterGraph;



