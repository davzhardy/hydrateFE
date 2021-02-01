// import React, { useRef, useEffect } from 'react';
// import * as d3 from 'd3';
// import data from './data.json'
// import { uid } from 'react-uid'

// function CirclePack({data}) {

//   const svgRef = useRef()

//   useEffect(() => {
    
//     const height = 975
//     const width = height
//     const format = d3.format(",d")
//     const color = d3.scaleSequential([8, 0], d3.interpolateMagma)
    
//     const pack = data => d3.pack()
//       .size([width - 2, height - 2])
//       .padding(3)
    
//     (d3.hierarchy(data)
//       .sum(d => d.value)
//       .sort((a, b) => b.value - a.value))

//     const root = pack(data);
    
//     const svg = d3.select(svgRef.current)
//       .attr("viewBox", [0, 0, width, height])
//       .style("font", "12px sans-serif")
//       .attr("text-anchor", "middle");

//           svg.call(d3.zoom().on('zoom', ({transform}) => {
//           svg.selectAll("g").attr('transform', transform)
//         }))

//     const node = svg.selectAll("g")
//       .data(d3.group(root.descendants(), d => d.height))
//       .join("g")
//       .selectAll("g")
//       .data(d => d[1])
//       .join("g")
//         .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

//     node.append("circle")
//         .attr("r", d => d.r)
//         .attr("fill", d => color(d.height));

//         const leaf = node.filter(d => !d.children);
    
//     leaf.select("circle")
//         .attr("id", d => (d.leafUid = uid("leaf")).id);

//     leaf.append("clipPath")
//         .attr("id", d => (d.clipUid = uid("clip")).id)
//       .append("use")
//         .attr("xlink:href", d => d.leafUid.href);

//     leaf.append("text")
//         .attr("clip-path", d => d.clipUid)
//       .selectAll("tspan")
//       .data(d => d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
//       .join("tspan")
//         .attr("x", 0)
//         .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
//         .text(d => d);

//     node.append("title")
//         .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

//   },[])


//   return (
//     <svg
//       ref={svgRef}
//       style={{
//         height: 500,
//         width: "100%",
//         marginRight: "0px",
//         marginLeft: "0px",
//       }}
//     >
//     </svg>
//   );

// }

// export default CirclePack;



