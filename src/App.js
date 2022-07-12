import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import LastetProductComponent from "./components/LastetProductComponent";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import SlideComponent from "./components/SlideComponent";

import "./App.css"


function App() {
  return (
    <div>
      <HeaderComponent />
      <SlideComponent />
      <LastetProductComponent />
      <FooterComponent />
    </div>
  );
}

export default App;
