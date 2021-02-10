import React, { Fragment, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import Tooltip from '../Tooltip'
import { mouseOver, mouseMove, mouseLeave } from '../mouseEvents'
import * as dayjs from 'dayjs';

function BarchartGraph({data}) {

  const svgRef = useRef()
  const wrapperRef = useRef();

  useEffect(() => {


    data = data.sort((a,b) => {
      let aDate = dayjs(`${a['time']+':00.000Z'}`).valueOf()
      let bDate = dayjs(`${b['time']+':00.000Z'}`).valueOf()
      return aDate -bDate
    })

    const counterObj = {};
    data.forEach(el => {
      if (Object.keys(counterObj).includes(el['drink'])) {
        counterObj[el['drink']]['cumVolume'] += el['volume']
        counterObj[el['drink']]['cumCups'] += el['cups']
      } else {
        counterObj[el['drink']] = {}
        counterObj[el['drink']]['cumVolume'] = el['volume']
        counterObj[el['drink']]['cumCups'] = el['cups']
      } 
      el['cumVolume'] = counterObj[el['drink']]['cumVolume']
      el['cumCups'] = counterObj[el['drink']]['cumCups']
    })

    const input = 'cumVolume'

    const names = new Set(data.map(d => d.drink))
    data = Array.from(names, drink => ({drink, value: counterObj[drink][input]}));
    data.sort((a, b) => d3.ascending(a.value, b.value));

    const svg = d3.select(svgRef.current)      

    const { width, height } = wrapperRef.current.getBoundingClientRect();
    const margin = {top: 50, right: 40, bottom: 65, left: 75}
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const now = new Date
    const color = "steelblue"

    const y = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([innerHeight,0])
      .padding(0.1)

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([0, innerWidth])
      .nice()
      
    const yAxis = g => g
      .call(d3.axisLeft(y).tickFormat(i => data[i].drink).tickSizeOuter(0))
      .call(g => g.select(".domain").remove())

    const xAxis = g => g
      .attr("transform", `translate(0,0)`)
      .call(d3.axisTop(x).ticks(null, data.format))

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
    
    g.selectAll("rect").data(data)
      .enter().append("rect")
        .attr("x", d => x(0))
        .attr("y", (d, i) => y(i))
        .attr("height", y.bandwidth())
        .attr("width", d => x(d.value) - x(0))
        .attr("fill", color)

    const format = x.tickFormat(20, data.format)

    g.selectAll("text")
      .data(data)
      .join("text")
        .attr("x", d => x(d.value))
        .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("dx", -4)
        .text(d => format(d.value))

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



