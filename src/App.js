import './App.css';
import Header from './routes/header'
import Footer from './routes/footer'
import Body from './routes/body'
import { ReactSession } from 'react-client-session'


function App() {
  return (
    <div className="App">
      <Header/>
      <Body/>
      <Footer/>
    </div>
  );
}

export default App;
