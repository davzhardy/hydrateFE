import React, { Fragment, useRef, useEffect } from 'react';
import * as d3 from 'd3';

function CircleGraph({data}) {

  const svgRef = useRef()
  const wrapperRef = useRef();

  useEffect(() => {
    
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    const margin = {top: 50, right: 20, bottom: 65, left: 75}
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const color = d3.scaleOrdinal(data.children.map(d => d.name), d3.schemeCategory10)
    
    const pack = data => d3.pack()
      .size([innerWidth - 2, innerHeight - 2])
      .padding(3)
    
    (d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value))

    const root = pack(data);
    let focus = root;
    let view;

    const svg = d3.select(svgRef.current)
    
    const g = svg.append('g')
      .attr('transform', `translate(${root.x},${root.y})`)
      // .style("background", color(0))
      .style("cursor", "pointer")
      .on("click", (event) => zoom(event, root));

    const node = g.append("g")
      .selectAll("circle")
      .data(root.descendants().slice(1))
      .join("circle")
        .attr("fill", d => d.children ? color(d.depth) : "white")
        .attr("pointer-events", d => !d.children ? "none" : null)
        .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
        .on("mouseout", function() { d3.select(this).attr("stroke", null); })
        .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));
 
    const label = g.append("g")
        .style("font", "20px Cabin")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants())
      .join("text")
        .style("fill-opacity", d => d.parent === root ? 1 : 0)
        .style("display", d => d.parent === root ? "inline" : "none")
        .text(d => d.data.name);
  
    zoomTo([root.x, root.y, root.r * 2]);
  
    function zoomTo(v) {
      const k = innerWidth / v[2];
  
      view = v;
  
      label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      node.attr("r", d => d.r * k);
    }
  
    function zoom(event, d) {  
      focus = d;
  
      const transition = svg.transition()
          .duration(event.altKey ? 7500 : 750)
          .tween("zoom", d => {
            const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            return t => zoomTo(i(t));
          });
  
      label
        .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .transition(transition)
          .style("fill-opacity", d => d.parent === focus ? 1 : 0)
          .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
          .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
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
      </svg>
    </div>
    </Fragment>
  );

}

export default CircleGraph;



