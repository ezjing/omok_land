import logo from './logo.svg';
import './App.css';
import Chat from "./component/playground/Chat";
import Main from "./component/main/Main";
import Pan from "./component/playground/Pan";
import { Route, HashRouter as Router, Routes} from "react-router-dom";
import Timer from "./component/playground/Timer";
import Game from "./component/playground/Game";
import PlayGround from "./component/playground/PlayGround";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path={'/'} element={<Main/>}></Route>
                    <Route path={'/playground/:ip'} element={<PlayGround/>}></Route>
                    <Route path={'/timer'} element={<Timer/>}></Route>
                    <Route path={'/game'} element={<Game/>}></Route>
                    <Route path={'/pan'} element={<Pan/>}></Route>
                </Routes>
            </Router>
            {/*<Pan/>*/}
        </div>
    );
}

export default App;
