// We use Route in order to define the different routes of our application
import './App.css';
import { Route, Routes, BrowserRouter as Router} from "react-router-dom";




 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";

import Create from "./components/create";
import Edit from "./components/edit";

import Calculate from "./components/calculation";
import Post from './components/Post';



 
 
const App = () => {
 
 return (
   <div>
     <Navbar />
     
     <Routes>
     
       
       
       <Route exact path="/" element={<RecordList />} />
       <Route exact path="/edit/:id" element={<Edit />} />
       <Route exact path="/create" element={<Create />} />
       
       <Route exact path="/cal" element={<Calculate/>} />
       <Route exact path="/post" element={<Post/>} />

     </Routes>
     
   </div>
 );
}
 
export default App;


