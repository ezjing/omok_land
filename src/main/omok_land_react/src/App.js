import logo from './logo.svg';
import './App.css';
import Chat from "./component/Chat"
import './static/css/chat.css'

function App() {
  return (
    <div className="App">
      <div className={'container my-4'}>
        <Chat></Chat>
      </div>
    </div>
  );
}

export default App;
