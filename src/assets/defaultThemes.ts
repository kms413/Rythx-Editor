import defineTheme from "@/Themes"

const Black = defineTheme({
  EditorBgColor: "rgb(37, 37, 37)",
  ActivityBarDividerColor: "rgba(255, 255, 255, 0.5)",
  ActivityBarIconsFilter: "",
  StageHeaderColor: "rgb(56, 56, 56)",
  StageShadow: "rgba(150, 150, 150, 0.36)",
  HeadingColor: "White",
  PargraphColor: "rgb(218, 218, 218)",
  ButtonTextColor: "rgb(160, 160, 160)",
  ButtonHoverBgColor: "rgb(38, 38, 38)",
  ButtonActiveBgColor: "rgb(39, 39, 39)",
})

const White = defineTheme({
  EditorBgColor: "rgb(250, 250, 250)",
  ActivityBarDividerColor: "rgba(36, 36, 36, 0.49)",
  ActivityBarIconsFilter: "brightness(0.5)",
  StageHeaderColor: "rgb(245, 245, 245)",
  StageShadow: "rgba(54, 54, 54, 0.34)",
  HeadingColor: "rgb(22, 22, 22)",
  PargraphColor: "rgb(56, 56, 56)",
  ButtonTextColor: "rgb(107, 107, 107)",
  ButtonHoverBgColor: "rgb(240, 240, 240)",
  ButtonActiveBgColor: "rgb(220, 220, 220)"
})


export {
  Black ,
  White
}
