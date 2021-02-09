function mouseOver (selection) {
    selection
      .style("opacity", 0.96)
}
  
function mouseMove (selection, textFormat, event, d) {
    selection
      .html(textFormat)
      .style("left", (event.pageX) + "px")
      .style("top", (event.pageY+10) + "px")
      .style("width", "max-Content")
}

function mouseLeave (selection) {
    selection
      .style("opacity", 0)
}

export {
  mouseOver,
  mouseMove,
  mouseLeave
}