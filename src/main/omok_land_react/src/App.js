import logo from './logo.svg';
import './App.css';
import Chat from "./component/Chat";
import Main from "./component/main/Main";
import Pan from "./component/Pan";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Timer from "./component/main/Timer";
import Game from "./component/game/Game";
import PlayGround from "./component/playground/PlayGround";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'/main'} element={<Main/>}/>
                    <Route path={'/playground/:ip'} element={<PlayGround/>}/>
                    <Route path={'/timer'} element={<Timer/>}/>
                    <Route path={'/game'} element={<Game/>}/>
                </Routes>
            </BrowserRouter>
            {/*<Pan/>*/}
        </div>
    );
}

export default App;
