import { BrowserRouter, Routes, Route } from 'react-router-dom';
// You are about to create these 3 files in the next step
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import LibraryPage from './pages/LibraryPage';
import MicPage from './pages/MicPage';
import TranscriptPage from './pages/TranscriptPage';
import AnalysisPage from './pages/AnalysisPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default page is login */}
        <Route path="/" element={<MainPage />} /> 

        {/* Your other pages */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/mic" element={<MicPage />} />
        <Route path="/transcript" element={<TranscriptPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;