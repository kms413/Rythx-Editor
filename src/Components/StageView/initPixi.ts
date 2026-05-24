import * as PIXI from 'pixi.js'
import * as groups from './group'


export default async function (container: HTMLDivElement) {
  const app = new PIXI.Application()
  const vm = window.Rythx.vm
  await app.init({
    width: 1920,
    height: 1080,
    antialias: true,
    autoDensity: false,
    backgroundColor: 'white',
  })
  container.appendChild(app.canvas)
  app.canvas.style.width = '100%'
  app.canvas.style.height = '100%'
  app.canvas.style.objectFit = 'contain'

  vm.engine = {
    app,
    stage: app.stage,
  }


  const runtime = vm.runtime
  const container1 = new PIXI.Container()
  const defaultGroup: RythxGroup = {
    name: '组1',
    container: container1,
  }
  for(let i = 0; i < runtime.groups.length; i++){
    runtime.groups.shift()
    groups.remove(0)
  }

  runtime.groups.push(defaultGroup)
  groups.add(defaultGroup)
  console.log("added")

}
