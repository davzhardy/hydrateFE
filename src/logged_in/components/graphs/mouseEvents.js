function mouseOver (selection, event, d) {
    selection
      .style("opacity", 0.96)
}
  
function mouseMove (selection, event, d) {
    selection
      .html(d.description + "<br>" + "Eaten "+ d.value + " times")
      .style("left", (d.x) + "px")
      .style("top", (event.screenY-20) + "px")
      .style("width", "max-Content")
}

function mouseLeave (selection, d) {
    selection
      .style("opacity", 0)
}

export {
  mouseOver,
  mouseMove,
  mouseLeave
}