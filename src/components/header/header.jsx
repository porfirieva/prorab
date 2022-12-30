import './header.sass'
import HeaderTop from "./headerTop/headertop";
import HeaderBottom from "./headerBottom/headerbottom";

const Header = () => {
    return(
        <header className="header">
            <HeaderTop />
            <HeaderBottom />
        </header>
    )
}

export default Header;