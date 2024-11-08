import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Footer from './components/footer.js';
import Home from './pages/home'


function App() {
  return (
    <div className="App">
      
      <Header />
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
