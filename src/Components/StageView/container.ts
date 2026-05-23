import { type Reactive, toRaw } from "vue"
function add(container: Reactive<RythxContainer>){
  const t = toRaw(container) as RythxContainer
  window.Rythx.vm.engine.stage.addChild(t.container)
  console.log(window.Rythx.vm.engine.stage.children);
}
function remove(index: number){
  const stage = window.Rythx.vm.engine.stage
  const child = stage.getChildAt(index)
  if(!child) return
  stage.removeChild(child)
  // 完全销毁，释放所有资源
  child.destroy()
}
export {
  add,
  remove
}
