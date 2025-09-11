// @ts-ignore
import clipboardScript from "./scripts/clipboard.inline"
import clipboardStyle from "./styles/clipboard.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// H4 Toggle Script - Icon Version
const h4ToggleScript = `
document.addEventListener("nav", () => {
  initH4Toggle()
})

function initH4Toggle() {
  const existingButton = document.getElementById('h4-toggle-icon')
  if (existingButton) existingButton.remove()

  // Finde die Icon-Leiste (neben Suche, Theme-Switch, etc.)
  const iconContainer = document.querySelector('.search') || 
                       document.querySelector('.searchbar') ||
                       document.querySelector('nav') ||
                       document.querySelector('.navbar') ||
                       document.querySelector('.header')
  
  if (!iconContainer) return

  // Erstelle Toggle-Icon
  const toggleIcon = document.createElement('button')
  toggleIcon.id = 'h4-toggle-icon'
  toggleIcon.className = 'toggle-icon'
  toggleIcon.style.cssText = \`
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    margin: 0 4px;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--text);
    transition: background-color 0.2s ease;
    vertical-align: middle;
  \`

  // List Plus Icon (ähnlich wie im Bild)
  toggleIcon.innerHTML = \`
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 6h18M3 12h18M3 18h18"/>
      <path d="M12 6v12M6 12h12"/>
    </svg>
  \`

  // Füge Icon zur Leiste hinzu (am Ende)
  iconContainer.appendChild(toggleIcon)

  // Click Handler
  toggleIcon.addEventListener('click', function(e) {
    e.preventDefault()
    e.stopPropagation()
    
    const hidden = document.body.classList.toggle('hide-h4')
    localStorage.setItem('h4-hidden', hidden.toString())
    
    // Icon Feedback
    if (hidden) {
      toggleIcon.style.backgroundColor = 'var(--accent)'
      toggleIcon.style.color = 'var(--background)'
      toggleIcon.title = 'H4 Überschriften sind ausgeblendet - klicken zum Einblenden'
    } else {
      toggleIcon.style.backgroundColor = 'transparent'
      toggleIcon.style.color = 'var(--text)'
      toggleIcon.title = 'H4 Überschriften einblenden/ausblenden'
    }
  })

  // Hover Effekte
  toggleIcon.addEventListener('mouseenter', () => {
    if (!document.body.classList.contains('hide-h4')) {
      toggleIcon.style.backgroundColor = 'var(--lightgray)'
    }
  })
  
  toggleIcon.addEventListener('mouseleave', () => {
    if (!document.body.classList.contains('hide-h4')) {
      toggleIcon.style.backgroundColor = 'transparent'
    }
  })

  // Lade gespeicherten Zustand
  const saved = localStorage.getItem('h4-hidden') === 'true'
  if (saved) {
    document.body.classList.add('hide-h4')
    toggleIcon.style.backgroundColor = 'var(--accent)'
    toggleIcon.style.color = 'var(--background)'
    toggleIcon.title = 'H4 Überschriften sind ausgeblendet - klicken zum Einblenden'
  } else {
    toggleIcon.title = 'H4 Überschriften einblenden/ausblenden'
  }
}

initH4Toggle()
`

const Body: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return <div id="quartz-body">{children}</div>
}

Body.afterDOMLoaded = clipboardScript + "\n\n" + h4ToggleScript
Body.css = clipboardStyle

export default (() => Body) satisfies QuartzComponentConstructor