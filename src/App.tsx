import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import { useAppSelector } from "./redux/hooks";
import { useEffect } from "react";
import { changeBodySize } from "./utils/utilsFuncs";
import Slider from "./pages/Slider";
import Meteo from "./pages/Meteo";
import Geodata from "./pages/Geodata";
import CodeEditor from "./pages/CodeEditor";
import Pomodoro from "./pages/Pomodoro";
import LinearGradient from "./pages/LinearGradient";
import PlayerAudio from "./pages/PlayerAudio";
import InfiniteScroll from "./pages/InfiniteScroll";
import Commercial from "./pages/Commercial";
import NoteBook from "./pages/NoteBook";

function App() {
  const isLoading = useAppSelector(state => state.generalParamsSlice.loading);

  useEffect(() => {
    window.addEventListener('resize', changeBodySize);
    changeBodySize();

    return () => {
      window.removeEventListener('resize', changeBodySize);
    }
  }, []);

  return (
    <div className="App">
      {isLoading ? <Loader /> :
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/slider" element={<Slider />} />
        <Route path="/meteo" element={<Meteo />} />
        <Route path="/geodata" element={<Geodata />} />
        <Route path="/code-editor" element={<CodeEditor />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/linear-gradient" element={<LinearGradient />} />
        <Route path="/audio-player" element={<PlayerAudio />} />
        <Route path="/infinite-scroll" element={<InfiniteScroll />} />
        <Route path="/e-commerce" element={<Commercial />} />
        <Route path="/note-book" element={<NoteBook />} />
      </Routes>}
    </div>
  )
}

export default App
