import * as PIXI from "pixi.js"
import * as containers from "./container"

import { reactive  } from "vue"
export default async function(container: HTMLDivElement){
  const app = new PIXI.Application()
  await app.init({
    width: 1920,
    height: 1080,
    antialias: true,
    autoDensity: false,
    backgroundColor: "white"
  })
  container.appendChild(app.canvas)
  app.canvas.style.width = "100%"
  app.canvas.style.height = "100%"
  app.canvas.style.objectFit = 'contain'
  const vm = window.Rythx.vm
  vm.engine = {
    app,
    stage: app.stage
  }

  const container1 = new PIXI.Container()

  vm.runtime = {
    containers: reactive([
      {
        name: "容器1",
        container: container1
      }
    ])
  }
  containers.add(vm.runtime.containers[0]!)
}
