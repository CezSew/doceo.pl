import React from "react";
import Header from "../parts/Header";

// import '../../css/pages/home.scss';

interface SingleTestProps {
    location: {
        state: {
            quizName: string
        }
    }
}

class SingleTest extends React.Component<SingleTestProps> {
    constructor(props) {
        super(props);
    }

    render() {
        const { quizName } = this.props.location.state;
        
        return (
            <React.Fragment>
                <Header/>
                <main className="c-test-hub">
                    <div className="o-container">
                        <h1>{quizName}</h1>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default SingleTest