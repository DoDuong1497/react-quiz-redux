import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Dashboard } from "./pages/DashBoard";
import { Question } from "./pages/Question";
import { FinalScore } from "./pages/FinalScore";

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/question' element={<Question />} />
        <Route path='/final-score' element={<FinalScore />} />
      </Routes>
    </>
  );
};

export default App;
