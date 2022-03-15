
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LogIn } from './pages/LogIn';
import { Milestone2 } from './pages/Milestone2';
import { Register } from './pages/Register';
import { Workspace } from './pages/Workspace';

import styles from './styles/App.module.scss';

function App():JSX.Element {
  return (
    <div className={styles.wrapper} data-testid="app-wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Milestone2 />} />
          <Route path="/workspace" element={<Workspace id="testDoNotDelete" />} />
          <Route path="login" element={<LogIn />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
