
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import { LogIn } from './pages/LogIn';
import { Milestone2 } from './pages/Milestone2';
import { Register } from './pages/Register';
import { WorkspaceSelection } from './pages/WorkspaceSelection';

import styles from './styles/App.module.scss';

function App():JSX.Element {
  return (
    <div className={styles.wrapper} data-testid="app-wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
