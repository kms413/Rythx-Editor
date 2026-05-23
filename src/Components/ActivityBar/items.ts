import paintingIcon from '@/icons/painting.svg'
import explorerIcon from "@/icons/explorer.svg"
import SpriteExplorer from '../SideBar/SpriteExplorer.vue'
import ImagePaiting from '../SideBar/ImagePaiting.vue'
import ThemesIcon from "@/icons/themes.svg"
import setThemes from '../SideBar/setThemes.vue'

export default [
  {
    tagName: "Explorer",
    dataURI: explorerIcon,
    id: 0,
    SideBarComponent: SpriteExplorer,
    width: 200
  },
  {
    tagName: 'Painting',
    dataURI: paintingIcon,
    id: 1,
    width: 600,
    SideBarComponent: ImagePaiting
  },
  {
    tagName: "Themes",
    dataURI: ThemesIcon,
    id: 2,
    width: 300,
    SideBarComponent: setThemes
  }
] as ActivityBarItem[]
