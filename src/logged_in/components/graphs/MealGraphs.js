import React from 'react';
import * as d3 from 'd3';
import { useD3 } from '../../functions/useD3'
import { colorLegend } from "./colorLegend.js";
import { sizeLegend } from "./sizeLegend.js";

function FlareGraph({ data }) {

  const ref = useD3(
    (svg) => {

      const colorScale = d3.scaleOrdinal()
      .domain(['apple', 'lemon', 'lime', 'orange'])
      .range(['#c11d1d', 'yellow', 'green', 'orange'])
    
    const colorLegendG = (g) =>
      g
        .attr('transform', `translate(100,100)`)
        .call(colorLegend, {
          colorScale,
          circleRadius: 30,
          spacing: 100,
          textOffset: 50
        })
    
      const sizeScale = d3.scaleSqrt()
        .domain([0, 10])
        .range([0,30])
    
      const sizeLegendG = (g) =>
        g
          .attr('transform', `translate(300,100)`)
          .call(sizeLegend, {
            sizeScale,
            spacing: 60,
            textOffset: 50,
            numTicks: 5,
            circleFill: 'blue',
          })

      svg.select(".sizeLegendG").call(sizeLegendG);
      svg.select(".colorLegendG").call(colorLegendG);
      
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
    <g className='sizeLegendG'/>
    <g className='colorLegendG'/>
      {/* <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
      <g className="y-title" /> */}
    </svg>
  );

}

export default FlareGraph;