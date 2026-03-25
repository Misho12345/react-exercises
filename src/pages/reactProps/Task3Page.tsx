import Layout from "../../components/Layout";
import { Card } from '../../components/Card';
import { Accordion, AccordionItemData } from "../../components/Accordion";

export default function Task3Page() {
  return (
    <Layout title="Task 3: Accordion" showBackButton>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          <div>
            <h3 style={{ marginBottom: "24px", color: "var(--text-primary)", fontSize: "24px" }}>
              React Fundamentals FAQ
            </h3>
            <Accordion>
              <AccordionItemData title="What is React?" icon="">
                <p style={{ marginBottom: "12px" }}>
                  React is a JavaScript library for building user interfaces, developed and maintained by Meta (Facebook).
                  It allows developers to create large web applications that can update and render efficiently in response to data changes.
                </p>
                <p style={{ margin: 0 }}>
                  React's component-based architecture makes it easy to build complex UIs from small, isolated pieces of code called components.
                </p>
              </AccordionItemData>

              <AccordionItemData title="What are Components?" icon="">
                <p style={{ marginBottom: "12px" }}>
                  Components are the building blocks of React applications. They are reusable pieces of UI that can have their own logic and appearance.
                </p>
                <p style={{ margin: 0 }}>
                  There are two types: <strong>Function Components</strong> (modern approach using hooks) and <strong>Class Components</strong> (legacy approach).
                </p>
              </AccordionItemData>

              <AccordionItemData title="What is JSX?" icon="">
                <p style={{ marginBottom: "12px" }}>
                  JSX (JavaScript XML) is a syntax extension that looks similar to HTML but works within JavaScript.
                  It makes it easier to write and visualize the structure of UI components.
                </p>
                <code style={{ display: "block", padding: "12px", backgroundColor: "var(--bg-tertiary)", borderRadius: "8px" }}>
                  const element = &lt;h1&gt;Hello, world!&lt;/h1&gt;;
                </code>
              </AccordionItemData>

              <AccordionItemData title="What are Props?" icon="">
                <p style={{ marginBottom: "12px" }}>
                  Props (properties) are how components talk to each other. They're passed from parent to child components,
                  similar to function arguments. Props are read-only and cannot be modified by the receiving component.
                </p>
                <p style={{ margin: 0 }}>
                  This creates a one-way data flow, making your app more predictable and easier to debug.
                </p>
              </AccordionItemData>

              <AccordionItemData title="What is State?" icon="">
                <p style={{ marginBottom: "12px" }}>
                  State is data that changes over time within a component. Unlike props, state is managed internally by the component itself.
                  When state changes, React re-renders the component to reflect the new data.
                </p>
                <p style={{ margin: 0 }}>
                  Use the <code>useState</code> hook to add state to function components.
                </p>
              </AccordionItemData>

              <AccordionItemData title="What are Hooks?" icon="">
                <p style={{ marginBottom: "12px" }}>
                  Hooks are functions that let you use React features like state and lifecycle methods in function components.
                  The most common hooks are <code>useState</code>, <code>useEffect</code>, and <code>useContext</code>.
                </p>
                <p style={{ margin: 0 }}>
                  Hooks must be called at the top level of your component, not inside loops, conditions, or nested functions.
                </p>
              </AccordionItemData>
            </Accordion>
          </div>

          <Card padding="32px" style={{
            borderRadius: "16px",
            borderWidth: "2px"
          }}>
            <h3 style={{ marginTop: 0, marginBottom: "24px", color: "var(--text-primary)", fontSize: "24px" }}>
               Learning Path (Multiple Items Can Be Open)
            </h3>
            <Accordion allowMultiple>
              <AccordionItemData title="Week 1: Basics" icon="">
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  <li>Set up development environment</li>
                  <li>Learn JSX syntax</li>
                  <li>Create your first components</li>
                  <li>Understand props</li>
                </ul>
              </AccordionItemData>

              <AccordionItemData title="Week 2: State & Events" icon="">
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  <li>Master useState hook</li>
                  <li>Handle user events</li>
                  <li>Forms and controlled components</li>
                  <li>Conditional rendering</li>
                </ul>
              </AccordionItemData>

              <AccordionItemData title="Week 3: Advanced Concepts" icon="">
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  <li>useEffect and side effects</li>
                  <li>Custom hooks</li>
                  <li>Context API</li>
                  <li>Performance optimization</li>
                </ul>
              </AccordionItemData>

              <AccordionItemData title="Week 4: Real Projects" icon="">
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  <li>Build a todo app</li>
                  <li>Create a weather dashboard</li>
                  <li>Implement routing with React Router</li>
                  <li>Deploy your application</li>
                </ul>
              </AccordionItemData>
            </Accordion>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
