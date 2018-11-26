import React from 'react';
import posed from 'react-pose';
import './styles.css';

const Box = posed.div({
    hidden: { opacity: 0 },
    visible: { opacity: 50 }
});

class Example extends React.Component {
    state = { isVisible: true };

    componentDidMount() {
        setInterval(() => {
            this.setState({ isVisible: !this.state.isVisible });
        }, 1000);
    }

    render() {
        const { isVisible } = this.state;
        return <Box className="box" pose={isVisible ? 'visible' : 'hidden'} > Willkommen <br/> bei der <br/>Burger Biene</Box>;
    }
}
export default Example;