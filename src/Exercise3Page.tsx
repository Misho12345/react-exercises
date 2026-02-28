import {
  Children,
  cloneElement,
  isValidElement,
  useState,
  type ReactNode,
} from 'react'
import ExerciseFrame from './ExerciseFrame'

interface AccordionItemProps {
  title: string
  children: ReactNode
  isOpen?: boolean
  onToggle?: () => void
}

function AccordionItem({ title, children, isOpen = false, onToggle }: AccordionItemProps) {
  return (
    <article className="accordion-item">
      <button type="button" className="accordion-trigger" onClick={onToggle}>
        <span>{title}</span>
        <span className="accordion-symbol">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && <div className="accordion-panel">{children}</div>}
    </article>
  )
}

function Accordion({ children }: { children: ReactNode }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const items = Children.toArray(children)

  return (
    <section className="accordion">
      {items.map((child, index) => {
        if (!isValidElement<AccordionItemProps>(child)) {
          return child
        }

        return cloneElement(child, {
          isOpen: openIndex === index,
          onToggle: () => setOpenIndex((current) => (current === index ? null : index)),
        })
      })}
    </section>
  )
}

function Exercise3Page({ onBack }: { onBack: () => void }) {
  return (
    <ExerciseFrame title="Exercise 3 - Accordion" onBack={onBack}>
      <Accordion>
        <AccordionItem title="What is React?">
          <p>React is a JavaScript library for building user interfaces with reusable components.</p>
        </AccordionItem>
        <AccordionItem title="What is a component?">
          <p>A component is a reusable part of the UI that can receive props and render output.</p>
        </AccordionItem>
        <AccordionItem title="What is JSX?">
          <p>JSX is syntax that lets you write UI code that looks similar to HTML.</p>
        </AccordionItem>
      </Accordion>
    </ExerciseFrame>
  )
}

export default Exercise3Page
