import { Routes, Route } from 'react-router-dom';

import Header from "./components/Header";
import { Dashboard } from "./pages/DashBoard";
import { Question } from './pages/Question';

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="question" element={<Question />} />
      </Routes>
    </>
  );
};

export default App;
