// @ts-ignore
import clipboardScript from "./scripts/clipboard.inline"
import clipboardStyle from "./styles/clipboard.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// H4 Toggle Script direkt inline
const h4ToggleScript = `
document.addEventListener("nav", () => {
  initH4Toggle()
})

function initH4Toggle() {
  const existingButton = document.getElementById('h4-toggle-btn')
  if (existingButton) existingButton.remove()

  const sidebar = document.querySelector('.sidebar') || document.querySelector('.left') || document.querySelector('nav')
  if (!sidebar) return

  const container = document.createElement('div')
  container.id = 'h4-toggle-container'
  container.style.cssText = 'margin:10px 0;padding:8px;border-radius:4px;background:var(--gray);border:1px solid var(--border);'

  const button = document.createElement('button')
  button.id = 'h4-toggle-btn'
  button.style.cssText = 'display:flex;align-items:center;gap:8px;background:none;border:none;color:var(--text);cursor:pointer;font-size:0.9rem;width:100%;text-align:left;padding:4px;border-radius:3px;transition:background-color 0.2s ease;'
  button.innerHTML = '🔽 <span>H4 Überschriften</span>'

  container.appendChild(button)
  sidebar.insertBefore(container, sidebar.firstChild)

  button.addEventListener('click', function() {
    const hidden = document.body.classList.toggle('hide-h4')
    button.innerHTML = hidden ? '🔼 <span>H4 Überschriften (ausgeblendet)</span>' : '🔽 <span>H4 Überschriften (sichtbar)</span>'
    localStorage.setItem('h4-hidden', hidden.toString())
  })

  button.addEventListener('mouseenter', () => {
    button.style.backgroundColor = 'var(--accent)'
    button.style.color = 'var(--background)'
  })
  
  button.addEventListener('mouseleave', () => {
    button.style.backgroundColor = 'transparent'
    button.style.color = 'var(--text)'
  })

  const saved = localStorage.getItem('h4-hidden') === 'true'
  if (saved) {
    document.body.classList.add('hide-h4')
    button.innerHTML = '🔼 <span>H4 Überschriften (ausgeblendet)</span>'
  }
}

initH4Toggle()
`

const Body: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return <div id="quartz-body">{children}</div>
}

// Kombiniere Clipboard und H4 Toggle
Body.afterDOMLoaded = clipboardScript + "\n\n" + h4ToggleScript
Body.css = clipboardStyle

export default (() => Body) satisfies QuartzComponentConstructor
