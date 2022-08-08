import FooterComponent from "../components/footer/FooterComponent";
import HeaderMobileComponent from "../components/header/HeaderMobileComponent";
import LastestProductComponent from "../components/product/LastestProductComponent";
import SlideComponent from "../components/slide/SlideComponent";

function Home() {
    return (
        <>
            <HeaderMobileComponent />
            <SlideComponent/>
            <LastestProductComponent />
            <FooterComponent/>
        </>
    )
}

export default Home;