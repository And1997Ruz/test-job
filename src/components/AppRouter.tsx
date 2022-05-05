import React, { Fragment } from "react";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import MainPage from "./MainPage";

const App: React.FC = () => {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/page/1" replace />} />
          <Route path="/page/:pageNum" element={<MainPage />} />
        </Routes>
      </Router>
    </Fragment>
  );
};

export default App;
