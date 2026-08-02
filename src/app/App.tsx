
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import HomePage from '../pages/HomePage';
import DirectoryPage from '../pages/DirectoryPage';
import ConverterPage from '../pages/ConverterPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/directory" element={<DirectoryPage />} />
            <Route path="/converter" element={<ConverterPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
