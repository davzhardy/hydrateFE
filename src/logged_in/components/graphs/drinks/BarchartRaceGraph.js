// import React, { Fragment, useRef, useEffect } from 'react';
// import * as d3 from 'd3';
// import * as dayjs from 'dayjs';

// function BarchartRaceGraph({data}) {

//   const svgRef = useRef()
//   const wrapperRef = useRef();

//   const drinksDisplayed = 10
//   const duration = 250
//   const k = 10 // needed to interpolate frames

//   const names = new Set(data.map(d => d.drink))

//   data = data.sort((a,b) => {
//     let aDate = dayjs(`${a['time']+':00.000Z'}`).valueOf()
//     let bDate = dayjs(`${b['time']+':00.000Z'}`).valueOf()
//     return aDate -bDate
//   })

//   const counterObj = {};
//   data.forEach(el => {
//     if (Object.keys(counterObj).includes(el['drink'])) {
//       counterObj[el['drink']]['cumVolume'] += el['volume']
//       counterObj[el['drink']]['cumCups'] += el['cups']
//     } else {
//       counterObj[el['drink']] = {}
//       counterObj[el['drink']]['cumVolume'] = el['volume']
//       counterObj[el['drink']]['cumCups'] = el['cups']
//     } 
//     el['cumVolume'] = counterObj[el['drink']]['cumVolume']
//     el['cumCups'] = counterObj[el['drink']]['cumCups']
//   })

//   const dateValues = Array.from(d3.rollup(data, ([d]) => d.cumVolume, d => d.time, d => d.drink))
//     .map(([time, data]) => [new Date(time), data])

  
//   function rank(value) {
//     const data = Array.from(names, drink => ({drink, value: value(drink)}));
//     data.sort((a, b) => d3.descending(a.value, b.value));
//     for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(drinksDisplayed, i);
//     return data;
//   }

//   function keyframesFunc () {
//     let keyframesArray = [];
//     let ka, a, kb, b;
//     for ([[ka, a], [kb, b]] of d3.pairs(dateValues)) {
//       for (let i = 0; i < k; ++i) {
//         const t = i / k;
//         keyframesArray.push([
//           new Date(ka * (1 - t) + kb * t),
//           rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t)
//         ]);
//       }
//     }
//     keyframesArray.push([new Date(kb), rank(name => b.get(name) || 0)]);
//     return keyframesArray;
//   }

//   const keyframes = keyframesFunc();
//   const nameframes = d3.groups(keyframes.flatMap(([, data]) => data), d => d.drink)
//   const prev = new Map(nameframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])))
//   const next = new Map(nameframes.flatMap(([, data]) => d3.pairs(data)))
//   // console.log(dataValues)

  

//   const svg = d3.select(svgRef.current)      

//   const { width, height } = wrapperRef.current.getBoundingClientRect();
//   const margin = {top: 50, right: 40, bottom: 65, left: 75}
//   const innerWidth = width - margin.left - margin.right
//   const innerHeight = height - margin.top - margin.bottom
//   const formatNumber = d3.format(",d")
//   const formatDate = d3.utcFormat("%Y")
//   function colorCreater () {
//     const scale = d3.scaleOrdinal(d3.schemeTableau10);
//     if (data.some(d => d.category !== undefined)) {
//       const categoryByName = new Map(data.map(d => [d.name, d.category]))
//       scale.domain(categoryByName.values());
//       return d => scale(categoryByName.get(d.name));
//     }
//     return d => scale(d.name);
//   }
//   const color = colorCreater()

//   const barSize = 48

//   const x = d3.scaleLinear([0, 1], [margin.left, width - margin.right])
//   const y = d3.scaleBand()
//     .domain(d3.range(drinksDisplayed + 1))
//     .rangeRound([margin.top, margin.top + barSize * (drinksDisplayed + 1 + 0.1)])
//     .padding(0.1)


//   function bars(svg) {
//     let bar = svg.append("g")
//         .attr("fill-opacity", 0.6)
//       .selectAll("rect");
  
//     return ([date, data], transition) => bar = bar
//       .data(data.slice(0, drinksDisplayed), d => d.name)
//       .join(
//         enter => enter.append("rect")
//           .attr("fill", color)
//           .attr("height", y.bandwidth())
//           .attr("x", x(0))
//           .attr("y", d => y((prev.get(d) || d).rank))
//           .attr("width", d => x((prev.get(d) || d).value) - x(0)),
//         update => update,
//         exit => exit.transition(transition).remove()
//           .attr("y", d => y((next.get(d) || d).rank))
//           .attr("width", d => x((next.get(d) || d).value) - x(0))
//       )
//       .call(bar => bar.transition(transition)
//         .attr("y", d => y(d.rank))
//         .attr("width", d => x(d.value) - x(0)));
//   }

//   function labels(svg) {
//     let label = svg.append("g")
//         .style("font", "bold 12px var(--sans-serif)")
//         .style("font-variant-numeric", "tabular-nums")
//         .attr("text-anchor", "end")
//       .selectAll("text");
  
//     return ([date, data], transition) => label = label
//       .data(data.slice(0, drinksDisplayed), d => d.name)
//       .join(
//         enter => enter.append("text")
//           .attr("transform", d => `translate(${x((prev.get(d) || d).value)},${y((prev.get(d) || d).rank)})`)
//           .attr("y", y.bandwidth() / 2)
//           .attr("x", -6)
//           .attr("dy", "-0.25em")
//           .text(d => d.name)
//           .call(text => text.append("tspan")
//             .attr("fill-opacity", 0.7)
//             .attr("font-weight", "normal")
//             .attr("x", -6)
//             .attr("dy", "1.15em")),
//         update => update,
//         exit => exit.transition(transition).remove()
//           .attr("transform", d => `translate(${x((next.get(d) || d).value)},${y((next.get(d) || d).rank)})`)
//           .call(g => g.select("tspan").tween("text", d => textTween(d.value, (next.get(d) || d).value)))
//       )
//       .call(bar => bar.transition(transition)
//         .attr("transform", d => `translate(${x(d.value)},${y(d.rank)})`)
//         .call(g => g.select("tspan").tween("text", d => textTween((prev.get(d) || d).value, d.value))));
//   }

//   function textTween(a, b) {
//     const i = d3.interpolateNumber(a, b);
//     return function(t) {
//       this.textContent = formatNumber(i(t));
//     };
//   }

//   function axis(svg) {
//     const g = svg.append("g")
//         .attr("transform", `translate(0,${margin.top})`);
  
//     const axis = d3.axisTop(x)
//         .ticks(width / 160)
//         .tickSizeOuter(0)
//         .tickSizeInner(-barSize * (drinksDisplayed + y.padding()));
  
//     return (_, transition) => {
//       g.transition(transition).call(axis);
//       g.select(".tick:first-of-type text").remove();
//       g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "white");
//       g.select(".domain").remove();
//     };
//   }

//   function ticker(svg) {
//     const now = svg.append("text")
//         .style("font", `bold ${barSize}px var(--sans-serif)`)
//         .style("font-variant-numeric", "tabular-nums")
//         .attr("text-anchor", "end")
//         .attr("x", width - 6)
//         .attr("y", margin.top + barSize * (drinksDisplayed - 0.45))
//         .attr("dy", "0.32em")
//         .text(formatDate(keyframes[0][0]));
  
//     return ([date], transition) => {
//       transition.end().then(() => now.text(formatDate(date)));
//     };
//   }

//   useEffect(() => {

//        const updateBars = bars(svg);
//     const updateAxis = axis(svg);
//     const updateLabels = labels(svg);
//     const updateTicker = ticker(svg);

//     // yield svg.node();

//     for (const keyframe of keyframes) {
//       const transition = svg.transition()
//           .duration(duration)
//           .ease(d3.easeLinear);

//       // Extract the top bar’s value.
//       x.domain([0, keyframe[1][0].value]);

//       updateAxis(keyframe, transition);
//       updateBars(keyframe, transition);
//       updateLabels(keyframe, transition);
//       updateTicker(keyframe, transition);

//       // invalidation.then(() => svg.interrupt());
//       // await transition.end();
//     }



//     // const now = new Date
//     // const color = "steelblue"

//     // const y = d3.scaleBand()
//     //   .domain(d3.range(data.length))
//     //   .range([innerHeight,0])
//     //   .padding(0.1)

//     // const x = d3.scaleLinear()
//     //   .domain([0, d3.max(data, d => d.value)])
//     //   .range([0, innerWidth])
//     //   .nice()
      
//     // const yAxis = g => g
//     //   .call(d3.axisLeft(y).tickFormat(i => data[i].name).tickSizeOuter(0))
//     //   .call(g => g.select(".domain").remove())

//     // const xAxis = g => g
//     //   .attr("transform", `translate(0,0)`)
//     //   .call(d3.axisTop(x).ticks(null, data.format))

//     // const g = svg.append('g')
//     //   .attr('transform', `translate(${margin.left},${margin.top})`)
    
//     // g.selectAll("rect").data(data)
//     //   .enter().append("rect")
//     //     .attr("x", d => x(0))
//     //     .attr("y", (d, i) => y(i))
//     //     .attr("height", y.bandwidth())
//     //     .attr("width", d => x(d.value) - x(0))
//     //     .attr("fill", color)

//     // const format = x.tickFormat(20, data.format)

//     // g.selectAll("text")
//     //   .data(data)
//     //   .join("text")
//     //     .attr("x", d => x(d.value))
//     //     .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
//     //     .attr("dy", "0.35em")
//     //     .attr("dx", -4)
//     //     .text(d => format(d.value))

//     // g.append("g")
//     //   .call(xAxis);

//     // g.append("g")
//     //   .call(yAxis);

//   },[data])


//   return (
//     <Fragment>
//     <div id="BarchartGraph" ref={wrapperRef}>
//       <svg
//         ref={svgRef}
//         style={{
//           height: 500,
//           width: "100%",
//           marginRight: "0px",
//           marginLeft: "0px",
//         }}
//       >
//       </svg>
//     </div>
//   </Fragment>
//   );

// }

// export default BarchartRaceGraph;



