import React, { Fragment, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import * as dayjs from 'dayjs';

function BarchartGraph({data}) {

  const svgRef = useRef()
  const wrapperRef = useRef();

  useEffect(() => {

    data.sort((a,b) => {
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
    let titleText;
    input === 'cumVolume' ? titleText = 'Total volume drunk' : titleText = 'Total cups drunk'

    const names = new Set(data.map(d => d.drink))
    data = Array.from(names, drink => ({drink, value: counterObj[drink][input]}));
    data.sort((a, b) => d3.descending(a.value, b.value));

    const svg = d3.select(svgRef.current)      

    const { width, height } = wrapperRef.current.getBoundingClientRect();
    const margin = {top: 50, right: 40, bottom: 65, left: 75}
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    function sequence (length) {
      return Array.apply(null, {length: length}).map((d, i) => i);
    }

    const color = d3.scaleOrdinal(d3.schemeTableau10)
      .domain(sequence(data.length))

    const y = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([innerHeight,0])
      .padding(0.1)

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([0, innerWidth-margin.right])
      .nice()
      
    const yAxis = g => g
      .attr('class', 'y-axis')
      .call(
        d3.axisLeft(y).tickFormat(i => data[i].drink)
        .tickSize([0,0])
      )
      .style("font","10px cabin")
      .style("color", "white")
      .call(g => g.select(".domain").remove())

    const xAxis = g => g
      .attr("transform", `translate(0,${innerHeight})`)
      .attr('class', 'x-axis')
      .call(d3.axisBottom(x).ticks(null, data.format))
      .style("font","10px cabin")


    const g = svg.append('g')
      .attr('class', 'barchart')
      .attr('transform', `translate(${margin.left},${margin.top})`)
    
    const bars = g.selectAll("rect").data(data)
      .enter().append("rect")
    
    bars.attr("x", d => x(0))
      .attr("y", (d, i) => y(i))
      .attr("height", y.bandwidth())
      .attr("width", d => x(d.value) - x(0))
      .attr("fill", (d, i) => color(i))

    const format = x.tickFormat(20, data.format)

    g.selectAll("text")
      .data(data)
      .join("text")
        .attr("x", d => x(d.value))
        .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("dx", 3)
        .text(d => {
          return (d.value === 0 || d.value === null) ? '' : format(d.value)
        })

    g.append("g")
      .call(xAxis)

    g.append("g")
      .call(yAxis)
      
    const yAxisLabels = g.selectAll('.y-axis').selectAll('text')
    const nodeList = yAxisLabels._groups

    yAxisLabels
      .attr('dx', d => {
        let details = nodeList[0][d].getBBox()
        return details.width + 10
      });

    const titleG = svg.selectAll(".barchart")
      .append("g")
      .attr('class', 'title')
      .attr("transform", `translate(${innerWidth/2 },${0})`)

    titleG.append('text')
      .text(titleText)
      .attr("alignment-baseline", "hanging")
      .style("font-size", "1rem")

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



