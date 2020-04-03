import React from "react";
import Header from "../parts/Header";
import { Redirect } from 'react-router-dom';

// import '../../css/pages/singleQuiz.scss';

interface SingleTestProps {
    location: {
        state: {
            quiz: {
                id: string,
                title: string,
                type: string,
                rating: string,
                votes:string
            }
        }
    }
}

class SingleTest extends React.Component<SingleTestProps> {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        };
    }

    render() {
        const quiz = this.props.location.state.quiz;

        return (
            <React.Fragment>
                <Header/>
                <main className="c-test-hub">
                    <div className="o-container">
                        <h1>{quiz.title}</h1>
                        <br/>
                        <p>ID:{quiz.id}</p>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default SingleTest
