import React from "react";
import {
    Navbar
} from "reactstrap";
import "./header.css";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar>
                    <div className="site-logo">
                            <img
                                data-altlogo="https://burgerbiene.de/wp-content/uploads/2017/10/burgerbiene_logo2x-neu.png"
                                src="https://burgerbiene.de/wp-content/uploads/2017/10/burgerbiene_logo2x-neu.png"
                                alt="Burger Biene"
                            />
                    </div>
                </Navbar>
            </div>
        );
    }
}
export default Header;