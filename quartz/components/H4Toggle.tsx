import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const H4Toggle: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={`h4-toggle ${displayClass ?? ""}`}>
      <button id="h4-toggle-btn" type="button">
        H4 Überschriften
      </button>
    </div>
  )
}

H4Toggle.css = `
.h4-toggle {
  margin: 0.5rem 0;
  padding: 0.5rem;
}

#h4-toggle-btn {
  background: var(--gray);
  border: 1px solid var(--lightgray);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.8rem;
  width: 100%;
  color: var(--darkgray);
}

#h4-toggle-btn:hover {
  background: var(--lightgray);
}

#h4-toggle-btn.active {
  background: var(--secondary);
  color: var(--light);
}
`

H4Toggle.afterDOMLoaded = `
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('h4-toggle-btn');
  if (!toggleBtn) return;
  
  // Status aus localStorage laden
  const h4Visible = localStorage.getItem('h4-visible') === 'true';
  
  // Initial state setzen
  updateH4Visibility(h4Visible);
  updateButtonText(h4Visible);
  
  // Click handler
  toggleBtn.addEventListener('click', function() {
    const isVisible = !document.body.classList.contains('hide-h4');
    const newState = !isVisible;
    
    updateH4Visibility(newState);
    updateButtonText(newState);
    localStorage.setItem('h4-visible', newState.toString());
  });
  
  function updateH4Visibility(visible) {
    if (visible) {
      document.body.classList.remove('hide-h4');
    } else {
      document.body.classList.add('hide-h4');
    }
  }
  
  function updateButtonText(visible) {
    toggleBtn.textContent = visible ? 'H4 verstecken' : 'H4 anzeigen';
    toggleBtn.classList.toggle('active', visible);
  }
});
`

export default (() => H4Toggle) satisfies QuartzComponentConstructor