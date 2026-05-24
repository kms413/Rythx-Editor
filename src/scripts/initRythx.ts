/* eslint-disable @typescript-eslint/ban-ts-comment */
import { reactive, ref } from "vue";


window.Rythx = {
  // @ts-ignore
  vm: {

  },
  gui: {
    SideBarCurrent: ref<number>(0),
    sideBarWidth: ref<number>(200)
  }
}
const vm = window.Rythx.vm
// @ts-expect-error
vm.runtime = {}

const runtime = vm.runtime
runtime.groups = reactive<RythxGroup[]>([])
