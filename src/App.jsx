
import {Routes,Route } from "react-router-dom";
import Output from "./pages/Output";
import Input from "./pages/Input";

const App = () => {

   
    return (
        
            <Routes>
               <Route path="/input" element={<Input />} />
                <Route path="/" element={<Output />} />
            </Routes>
        
    );
};

export default App;