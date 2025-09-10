import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const H4Toggle: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={`h4-toggle ${displayClass ?? ""}`}>
      <button id="h4-toggle-btn" type="button">
        H4 anzeigen
      </button>
    </div>
  )
}

H4Toggle.css = `
.h4-toggle {
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-top: 1px solid var(--lightgray);
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
`

H4Toggle.afterDOMLoaded = `
// H4 Toggle automatisch nach Search einfügen
const searchComponent = document.querySelector('.search');
if (searchComponent) {
  const toggleDiv = document.createElement('div');
  toggleDiv.className = 'h4-toggle';
  toggleDiv.innerHTML = '<button id="h4-toggle-btn" type="button">H4 anzeigen</button>';
  
  searchComponent.parentNode.insertBefore(toggleDiv, searchComponent.nextSibling);
  
  const toggleBtn = document.getElementById('h4-toggle-btn');
  
  // Initial state - H4 versteckt
  document.body.classList.add('hide-h4');
  
  toggleBtn.addEventListener('click', function() {
    const isHidden = document.body.classList.contains('hide-h4');
    
    if (isHidden) {
      document.body.classList.remove('hide-h4');
      toggleBtn.textContent = 'H4 verstecken';
    } else {
      document.body.classList.add('hide-h4');
      toggleBtn.textContent = 'H4 anzeigen';
    }
  });
}
`

export default (() => H4Toggle) satisfies QuartzComponentConstructor