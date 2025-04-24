import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ViewUser  from './components/ViewUser';
function App() {
  return(<>
     <Header></Header>
     <ViewUser></ViewUser>
     <Footer></Footer>
  </>)
}
export default App