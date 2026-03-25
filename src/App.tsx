import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './ThemeContext'
import HomePage from './pages/HomePage'
import Task1Page from './pages/reactProps/Task1Page'
import Task2Page from './pages/reactProps/Task2Page'
import Task3Page from './pages/reactProps/Task3Page'
import Task4Page from './pages/reactProps/Task4Page'
import Task5Page from './pages/reactProps/Task5Page'
import Task6Page from './pages/reactProps/Task6Page'
import Task7Page from './pages/reactProps/Task7Page'

import StateTask1Page from './pages/stateManagement/Task1Page'
import StateTask2Page from './pages/stateManagement/Task2Page'
import StateTask3Page from './pages/stateManagement/Task3Page'
import StateTask4Page from './pages/stateManagement/Task4Page'
import StateTask5Page from './pages/stateManagement/Task5Page'
import StateTask6Page from './pages/stateManagement/Task6Page'
import StateTask7Page from './pages/stateManagement/Task7Page'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/react-props/1" element={<Task1Page />} />
          <Route path="/react-props/2" element={<Task2Page />} />
          <Route path="/react-props/3" element={<Task3Page />} />
          <Route path="/react-props/4" element={<Task4Page />} />
          <Route path="/react-props/5" element={<Task5Page />} />
          <Route path="/react-props/6" element={<Task6Page />} />
          <Route path="/react-props/7" element={<Task7Page />} />
          
          <Route path="/state-management/1" element={<StateTask1Page />} />
          <Route path="/state-management/2" element={<StateTask2Page />} />
          <Route path="/state-management/3" element={<StateTask3Page />} />
          <Route path="/state-management/4" element={<StateTask4Page />} />
          <Route path="/state-management/5" element={<StateTask5Page />} />
          <Route path="/state-management/6" element={<StateTask6Page />} />
          <Route path="/state-management/7" element={<StateTask7Page />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
