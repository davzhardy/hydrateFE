import React, { Fragment, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import Tooltip from '../Tooltip'
import { mouseOver, mouseMove, mouseLeave } from '../mouseEvents'

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
    const circleRadius = 7;
    const margin = {top: 50, right: 40, bottom: 65, left: 75}
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const now = new Date
    const descriptions = new Set(data.map(d => d.description))
    function sequence (length) {
      return Array.apply(null, {length: length}).map((d, i) => i);
    }

    const color = d3.scaleOrdinal(d3.schemeTableau10)
      .domain(sequence(descriptions.length))

    const wrapper = d3.select(wrapperRef.current)
    const displayedTooltip = wrapper
      .append("div")
      .attr('class', 'tooltip')

    displayedTooltip.call(Tooltip, {
      startingOpacity: 0
    })
    
    const xScale = d3.scaleTime()
      .domain([d3.extent(data, xValue)[0], now])
      .range([0, innerWidth-margin.right])
      .nice();
  
    const xAxis = d3.axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(20)
      .ticks(5, "%a %e %b")

    const minTimeLate = Math.min(d3.extent(data, yValue)[0]-1, 8)
    const minTimeEarly = Math.min(d3.extent(data, yValue)[1]+1, 20)

    const yScale = d3.scaleLinear()
      .domain([minTimeLate,minTimeEarly])
      .range([innerHeight-margin.top-margin.bottom/2, 0])
      .nice()

    const yAxis = d3.axisLeft(yScale)
      .ticks((minTimeEarly-minTimeLate)/2)
      .tickSize(-innerWidth)
      .tickPadding(10)
      .tickFormat(d => {
        if (d%2 === 0) return d + "hr"
      })

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top*2})`)
      .attr('class','scatter')

    const yAxisG = g.append('g')
      .call(yAxis)
        .style("stroke-dasharray", "2 2")
        .style("font","10px cabin")
        .attr("stroke-opacity", 0.25)
      
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
        .attr('transform', `translate(0,${innerHeight-margin.top-margin.bottom/2})`)
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
        .attr('opacity', 0.75)
        .attr("fill", d => color(d.description))
        .on("mouseover", (event, d) => {
          mouseOver(displayedTooltip ,event, d)
        })
        .on("mousemove", (event, d) => {
          const tooltipTextFormat = `${d.meal.join(', ')}`
          mouseMove(displayedTooltip, tooltipTextFormat, event, d)
        })
        .on("mouseleave",(event, d) => {
          mouseLeave(displayedTooltip ,event, d)
        })

      const legendG = svg
        .append("g")
        .attr('class', 'legend')
        .attr('transform', `translate(${innerWidth - margin.left},${margin.top})`);
  
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
          return color(d)
        });    
      
      legend.append("text")
        .attr("dx", 40)
        .attr("dy", 15)
        // .attr("alignment-baseline", "baseline")
        .text((d, i) => `${d}`);

    const titleText = 'Meals eaten over time'
    const titleG = svg.selectAll(".scatter")
      .append("g")
      .attr('class', 'title')
      .attr("transform", `translate(${innerWidth/2 -margin.left*2},${-margin.top})`)

    titleG.append('text')
      .text(titleText)
      .attr("alignment-baseline", "hanging")
      .style("font-size", "1rem")

  },[data])


  return (
    <Fragment>
    <div id="ScatterGraph" ref={wrapperRef}>
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



