import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import Appbar from './components/Appbar'
import DataNotCompleted from './components/DataNotCompleted'
import DataCompleted from './components/DataCompleted'
import Login from './components/Login'

const App = () => {
    return (
        <div className='App'>
            <Router>
                <Appbar />
                <Routes>
                    <Route path='/completed' element={<DataCompleted />} />
                    <Route path='/' element={<DataNotCompleted />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
