import './App.css';
import Header from './Components/YoutubeDataCard/Header/Header';
import YoutubeDataCards from './Components/YoutubeDataCard/YoutubeDataCards';

function App() {
  return (
    <div className="App" style={{backgroundColor: '#212F3D'}}>  
    <Header/>
      <YoutubeDataCards />
    </div>
  );
}

export default App;
