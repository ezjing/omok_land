import logo from './logo.svg';
import './App.css';
import Chat from "./component/Chat";
import Main from "./component/main/Main";
import Pan from "./component/Pan";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Timer from "./component/main/Timer";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'/main'} element={<Main/>}/>
                    {/*<Route path={'/playground'} element={<Playground/>}/>*/}
                    <Route path={'/timer'} element={<Timer/>}/>
                </Routes>
            </BrowserRouter>
            {/*<Pan/>*/}
        </div>
    );
}

export default App;