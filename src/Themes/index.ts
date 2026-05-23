import themePropMap from './themePropMap'

export default function defineTheme(vars: ThemeVars) {
  return {
    vars,
    use() {
      const body = document.body
      const setCss = body.style.setProperty.bind(body.style)
      for (const i in this.vars) {
        const target = vars[i] as string
        setCss(themePropMap[i] as string, target)
        console.log('used', themePropMap[i] as string)
      }
    },
  }
}
