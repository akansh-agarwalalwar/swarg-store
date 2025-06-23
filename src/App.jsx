import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AdminPanel from './admin/AdminPanel'
import SubAdminPanel from './subadmin/SubAdminPanel'
import UserPanel from './user/UserPanel'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/subadmin" element={<SubAdminPanel />} />
        <Route path="/" element={<UserPanel />} />
      </Routes>
    </Router>
  )
}

export default App
