import { Children, isValidElement, useState, type ReactElement, type ReactNode } from 'react'
import ExerciseFrame from './ExerciseFrame'

interface TabProps {
  label: string
  children: ReactNode
}

function Tab({ children }: TabProps) {
  return <>{children}</>
}

function Tabs({ children }: { children: ReactNode }) {
  const tabElements = Children.toArray(children).filter(
    (child): child is ReactElement<TabProps> => isValidElement<TabProps>(child),
  )

  const [activeIndex, setActiveIndex] = useState(0)

  if (tabElements.length === 0) {
    return <p className="empty-state">No tabs available.</p>
  }

  const safeActiveIndex = Math.min(activeIndex, tabElements.length - 1)
  const activeTab = tabElements[safeActiveIndex]

  return (
    <section className="tabs">
      <nav className="tabs-nav">
        {tabElements.map((tab, index) => (
          <button
            type="button"
            key={`${tab.props.label}-${index}`}
            className={`tab-button ${safeActiveIndex === index ? 'tab-button-active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            {tab.props.label}
          </button>
        ))}
      </nav>

      <div className="tabs-panel">{activeTab.props.children}</div>
    </section>
  )
}

function Exercise5Page({ onBack }: { onBack: () => void }) {
  return (
    <ExerciseFrame title="Exercise 5 - Tabs" onBack={onBack}>
      <Tabs>
        <Tab label="Profile">
          <p>Name: Ivaylo Petrov</p>
          <p>Class: 11B</p>
        </Tab>

        <Tab label="Grades">
          <ul>
            <li>Mathematics: 5.50</li>
            <li>Physics: 6.00</li>
            <li>Chemistry: 5.75</li>
          </ul>
        </Tab>

        <Tab label="Settings">
          <button type="button" className="ui-button secondary">
            Change password
          </button>
        </Tab>
      </Tabs>
    </ExerciseFrame>
  )
}

export default Exercise5Page
