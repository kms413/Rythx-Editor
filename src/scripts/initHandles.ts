// Move Handles
window.mouseMoveHandles = new Set<(e: MouseEvent) => void>()
window.addEventListener("mousemove",e=>{
  for(const handle of window.mouseMoveHandles){
    handle(e)
  }
})


window.windowResizeHandles = new Set<(e: Event)=>void>()
window.rythxResizeEvent = {
  oldWidth: window.innerWidth,
  oldHeight: window.innerHeight
}
window.addEventListener("resize",(e)=>{
  for(const handle of window.windowResizeHandles){
    handle(e)
  }

  window.rythxResizeEvent.oldWidth = window.innerWidth
  window.rythxResizeEvent.oldHeight = window.innerHeight
})

