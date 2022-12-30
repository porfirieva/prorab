import './main.sass'
import SliderMain from "./slider/slider";
import SpecialEquipment from "./specialEquip/specialEquipment";
import PropertySlider from "./propertySlider/propertySlider";
import Brigades from "./brigades/brigades";
import BannerSecond from "./bannerSecond/bannerSecond";
import Advantages from "./advantages/advantages";
import Rent from "./rent/rent";


function MainPage() {
    return(
        <main className='mainIndex'>
            <SliderMain />
            <SpecialEquipment />
            <PropertySlider />
            <Brigades />
            <BannerSecond />
            <Advantages />
            <Rent />
        </main>
    )
}

export default MainPage;