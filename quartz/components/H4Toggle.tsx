import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const H4Toggle: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={`h4-toggle ${displayClass ?? ""}`}>
      <button id="h4-toggle-btn" type="button">
        H4 ein/ausblenden
      </button>
    </div>
  )
}

H4Toggle.css = `
.h4-toggle {
  margin: 0.5rem 0;
}

#h4-toggle-btn {
  background: var(--gray);
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
}
`

export default (() => H4Toggle) satisfies QuartzComponentConstructor