import { CodeMirror } from './libs/editor/editor.bundle.js'
import Brrr from '../src/Brrr.js'
import { consoleElement, createButton } from './manual.js'

const app = document.getElementById('app')
const mainContainer = document.getElementById('editor-container')

app.style.height = window.innerHeight
globalThis.Brrr = Brrr
export const editor = CodeMirror(mainContainer, {})
editor.changeFontSize('15px')
const print = function (...values) {
  values.forEach(x => (consoleElement.value += JSON.stringify(x)))
  return values
}
const printErrors = errors => {
  consoleElement.classList.remove('info_line')
  consoleElement.classList.add('error_line')
  consoleElement.value = errors
}
const AsyncFunction = async function () {}.constructor
const run = async () => {
  consoleElement.classList.add('info_line')
  consoleElement.classList.remove('error_line')
  consoleElement.value = ''
  try {
    const out = await new AsyncFunction(`${editor.getValue().trim()}`)()
    if (out !== undefined) {
      Brrr.isBrrr(out) ? print(out.toObject(true)) : print(out)
    } else {
      return print(undefined)
    }
    return out
  } catch (err) {
    printErrors(err)
  }
}

const resize = () => editor.setSize(window.innerWidth, window.innerHeight / 2)
window.addEventListener('resize', resize)

document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 's' && (e.ctrlKey || e.metaKey)) {
    e = e || window.event
    e.preventDefault()
    e.stopPropagation()
    run()
  }
})
;(() => {
  document.getElementById('run').addEventListener('click', run)
  consoleElement.value = ''
  editor.setValue(`const { of, ofSize, isBrrr, matrix, from, ones, zeroes, range } = Brrr;
return of(1, 2, 3, 4).items`)
  ;['Brrr', 'List'].forEach(createButton)
  window.dispatchEvent(new Event('resize'))
  document.getElementById('app').style.height = 'auto'
})()
