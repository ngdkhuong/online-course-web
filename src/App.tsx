import { Outlet, Route, Routes } from 'react-router-dom';
import { Footer } from './components';
import { Home } from './pages';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route element={<LayoutWithFooter />}>
                    <Route path="/" element={<Home />} />
                </Route>
            </Routes>
        </div>
    );
}

const LayoutWithFooter = () => {
    return (
        <>
            <div
                style={{
                    minHeight: 'calc(100vh - 100px)',
                }}
            >
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default App;
