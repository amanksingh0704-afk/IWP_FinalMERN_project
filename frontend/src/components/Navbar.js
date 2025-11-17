import { Link } from "react-router-dom";
import logo from '../assets/favicon.png'
import PillNav from './PillNav';
const Navbar = () => {
  return (
    
    <header>
        <div className="container">
        <PillNav
            logo={logo}
            logoAlt="Logo"
            items={[
                { label: 'Home', href: '/' },
                { label: 'Student', href: '/student-dashboard' },
                { label: 'Warden', href: '/warden-dashboard' },
                { label: 'Login', href: '/login' }
            ]}
            activeHref="/"
            className="custom-nav"
            ease="power2.easeOut"
            baseColor="#ffffff"
            pillColor="#113f95ff"
            hoveredPillTextColor="#113f95ff"
            pillTextColor="#ffffff"
        />

        </div>
    </header>
  );
};

export default Navbar;
