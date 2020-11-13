import AppLayout from './layout/AppLayout';
import MainLayout from './layout/MainLayout';
import Home from './views/Home';

import { ResultProvider } from './contexts/ResultContext';

const App = () => (
  <AppLayout>
    <ResultProvider>
      <MainLayout>
        <Home />
      </MainLayout>
    </ResultProvider>
  </AppLayout>
)

export default App;
