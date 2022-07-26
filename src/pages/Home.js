import FooterComponent from "../components/footer/FooterComponent";
import HeaderComponent from "../components/header/HeaderComponent";
import LastestProductComponent from "../components/product/LastestProductComponent";
import SlideComponent from "../components/slide/SlideComponent";

function Home() {
    return (
        <>
            <HeaderComponent />
            <SlideComponent />
            <LastestProductComponent />
            <FooterComponent/>
        </>
    )
}

export default Home;