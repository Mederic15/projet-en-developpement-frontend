import logo from './logo.svg';
import FooterBar from "./components/bars/FooterBar";
import './App.css';
import PageAccueil from "./components/pages/Accueil";

function App() {
  return (
    <div className="App">
      <PageAccueil/>

      <FooterBar />
    </div>
  );
}

export default App;
