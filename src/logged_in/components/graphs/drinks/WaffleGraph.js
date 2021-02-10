import React, { Fragment, useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import Tooltip from '../Tooltip'
import { mouseOver, mouseMove, mouseLeave } from '../mouseEvents'
import * as dayjs from 'dayjs';

function WaffleGraph({data}) {

  const svgRef = useRef()
  const wrapperRef = useRef();
  const [whole, setWhole] = useState('true')
  const [isRect, setIsRect] = useState('true')

  let shape;
  isRect ? shape = 'rect' : shape = 'circle'

  useEffect(() => {

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
    const baseData = Array.from(names, drink => ({drink, value: counterObj[drink][input]}));

    const total = baseData.reduce((acc, cv) => acc + cv.value,0)
    const chartData = baseData.map(el => ({
      drink: el.drink,
      value: el.value,
      ratio: el.value / total * 100
    }))

    const svg = d3.select(svgRef.current)      
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    const margin = {top: 50, right: 40, bottom: 65, left: 75}
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
    
    const waffleSize = whole ? innerWidth < innerHeight ? innerWidth : innerHeight : 150;

    const padding = ({x: 10, y: 40})
    function sequence (length) {
      return Array.apply(null, {length: length}).map((d, i) => i);
    }

    const scale = d3.scaleBand()
      .domain(sequence(10))
      .range([0, waffleSize])
      .padding(0.1)

    const color = d3.scaleOrdinal(d3.schemeTableau10)
      .domain(sequence(chartData.length))

    function createWaffleData (inputData) {
      let array = [];
      const max = inputData.length; 
      if (whole) {
        let index = 0
        let curr = 0
        let accu = Math.round(inputData[0].ratio)
        let waffle = [];
        for (let y = 9; y >= 0; y--)
          for (let x = 0; x < 10; x ++) {
            let r = Math.round(inputData[index].ratio);
            if (curr > accu && index < max) {
              index= index+1
              if (index < max) r = Math.round(inputData[index].ratio);
              else r = 0
              accu += r;
            }
            waffle.push({x, y, index});
            curr ++
          } 
        array.push(waffle);
      }
      // else {
      //   inputData.map((d, i) => {
      //     var curr = 0, waffle = [];
      //     for (var y = max; y >= 0; y--)
      //       for(var x = 0; x < max+1; x ++) {
      //         waffle.push(({x, y, index: curr < Math.round(d.ratio) ? i : -1}));
      //         curr++;
      //       }
      //     array.push(waffle);
      //   });
      // }  
      return array;
    }

    const waffleData = createWaffleData(chartData)

    const g = svg.selectAll(".waffle")  
      .data(waffleData)
      .join("g")
      .attr("class", "waffle")
      .attr('transform', `translate(${margin.left},${margin.top})`);

    if (!whole) {
      const numPerRow = Math.floor(width / (waffleSize + padding.x));
      g.attr("transform", (d, i) => {
        var r = Math.floor(i / numPerRow);
        var c = i - r * numPerRow;
        return `translate(${c * (waffleSize + padding.x)},${r * (waffleSize + padding.y)})`
      });
    }

    const cellSize = scale.bandwidth();
    const half = cellSize / 2;

    const cells = g.append("g")
      .selectAll(shape)
      .data(d => d)
      .join(shape)
      .attr("fill", d => d.index === -1 ? "#ddd" : color(d.index));

    if (isRect) {
      cells.attr("x", d => scale(d.x))
        .attr("y", d => whole ?  0 : scale(d.y))
        .attr("rx", 3).attr("ry", 3)
        .attr("width", cellSize).attr("height", cellSize)      
    } 
    else {    
      cells.attr("cx", d => scale(d.x) + half)
        .attr("cy", d => whole ? 0 : scale(d.y) + half)
        .attr("r", half);
    }

    if (whole) {
      cells.append("title").text(d => {
        const cd = chartData[d.index];
        return `${cd.drink}\n${cd.value} (${cd.ratio.toFixed(1)}%)`;
      });    
      
      cells.transition()
        .duration(d => d.y * 100)
        .ease(d3.easeBounce)
        .attr(isRect ? "y" : "cy", d => scale(d.y) + (isRect ? 0 : half));
        svg.transition().delay(550)
        // .on("end", drawLegend);
    } else {
      g.append("text")
        .style("font-size", 20)
        .style("font-weight", "bold")
        .attr("dy", "1.5em")
        .attr("text-anchor", "middle")            
        .attr("fill", (d, i) => color(i))
        .attr("transform", `translate(${waffleSize / 2},0)`)
        .text((d, i) => `${chartData[i].ratio.toFixed(0)}%`);
    }

    function highlight(e, d, restore) {
      const i = legend.nodes().indexOf(e.currentTarget);
      cells.transition().duration(500)
        .attr("fill", d => d.index === i ? color(d.index) : "#ccc");  
    }
    
    function restore() {
      cells.transition().duration(500).attr("fill", d => color(d.index))
    }

    const legendG = svg.selectAll(".waffle")
      .append("g")
      .attr('class', 'legend')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const legend = legendG.selectAll("g")
      .data(chartData.map(d => d.drink))
      .join("g")      
      .attr("opacity", 1)
      .attr("transform", (d, i) => `translate(${waffleSize + 20},${i * 30})`)
      .on("mouseover", highlight)
      .on("mouseout", restore);
    
    legend.append("rect")
      .attr("rx", 3).attr("ry", 3)
      .attr("width", 30).attr("height", 20)
      .attr("fill", (d, i) => color(i));    
    
    legend.append("text")
      .attr("dx", 40)
      .attr("alignment-baseline", "hanging")
      .text((d, i) => `${d} (${chartData[i].ratio.toFixed(1)}%)`);

  },[data])


  return (
    <Fragment>
    <div id="WaffleGraph" ref={wrapperRef}>
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

export default WaffleGraph;



