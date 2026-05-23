import { ref } from "vue";


window.Rythx = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  vm: {
  },
  gui: {
    SideBarCurrent: ref<number>(0),
    sideBarWidth: ref<number>(200)
  }
}
