import GoalTracker from './goaltrack';
import './App.css';
import Main from './Main'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Loginpage';
import RegisterPage from './RegisterPage';
import MenuPage from './Menupage';
import Analysis from './Analysis';
import ChatApp from './Chatapp';
import Community from './Community';
// C:\Users\Admin\Desktop\hackintym\easemind-ai\src\App.css
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/community' element={<Community/>} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/analyse" element={<Analysis/>} />
        <Route path="/main" element={ <MenuPage/>} />
        <Route path='/GoalTracker' element={<GoalTracker />} />
        <Route path='/Chatapp' element={<ChatApp/>} />
        </Routes>
      </Router>
  );
}
    

export default App;
