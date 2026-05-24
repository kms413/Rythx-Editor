import InputDialogUI from './InputDialogUI.vue'
import { createVNode, render } from 'vue'
import gsap from 'gsap'

export interface InputDialogOptions {
  title: string
  placeholder: string
  buttonText: string
}

export default function inputDialog(options: InputDialogOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    const ctn = document.createElement('div')

    document.body.appendChild(ctn)
    gsap.set(ctn, {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 99999,
      backdropFilter: 'blur(10px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    })

    const node = createVNode(InputDialogUI, {
      title: options.title,
      placeholder: options.placeholder,
      buttonText: options.buttonText,
      onClose: (success: boolean, value?: string) => {
        if (success && value) {
          resolve(value)
        } else {
          reject(new Error('User cancelled'))
        }
        render(null, ctn)
        ctn.remove()
      },
    })

    render(node, ctn)
  })
}
