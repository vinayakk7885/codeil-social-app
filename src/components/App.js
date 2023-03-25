import { Loader , Navbar  } from './';
import { Home, Login, Signup, Settings,UserProfile } from '../pages';
import { BrowserRouter as Router,Route, Routes,Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';
function PrivateRoute({children}){
  const auth = useAuth ();
  // return(
    // <Route 
      // render={()=>{
        if(auth.user){
          return children;
        }
        return <Navigate to='/login'/>
      // }
    // />
  // )
}
function App() {

  const auth=useAuth();
  const Page404=()=>{
    return <h1>404</h1>
  }

  if(auth.loading){
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          {/* <Route  path="/">
            <Home posts={posts} />
          </Route> */}
          <Route  path="/" element={<Home posts={[]} />} />
          <Route  path="/login" element={<Login/>} />
          <Route  path="/" element={<Page404/>} />
          <Route  path="/register" element={<Signup/>} />
          <Route  path="/settings" element={<PrivateRoute> <Settings/> </PrivateRoute>} />
          <Route  path="/user/:userId" element={<PrivateRoute> <UserProfile/> </PrivateRoute>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
