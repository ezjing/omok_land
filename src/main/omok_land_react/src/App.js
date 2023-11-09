import './App.css';
import Main from "./component/main/Main";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PlayGround from "./component/playground/PlayGround";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'/main'} element={<Main/>}/>
                    <Route path={'/playground/:ip'} element={<PlayGround/>}/>
                </Routes>
            </BrowserRouter>
            {/*<Pan/>*/}
        </div>
    );
}

export default App;
