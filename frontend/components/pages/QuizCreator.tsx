import React from "react";
import { connect } from 'react-redux';
import AuthOverlord from "../auth/AuthOverlord";
import Header from "../parts/Header";
import InputLine from "../parts/InputLine";
import '../../css/pages/quizCreator.scss';
import { createTest } from '../../actions';

interface QuizCreatorProps {
    user: {
        name: string|undefined
    }
}

const QuizCreator: React.SFC <QuizCreatorProps> = ({user}) => {
    return (
        <AuthOverlord>
            <Header />
            <main className="c-quiz-creator">
                <div className="o-container">
                    <form className="o-form" onSubmit={(e) => createTest(e)}>
                        <p className="o-form__title o-title o-title--h2 o-title--line">
                            Dodaj quiz
                        </p>
                        <InputLine name="name" type="text" placeholder="nazwa"/>
                        <InputLine name="type" type="text" placeholder="typ"/>
                        <InputLine name="file" type="file" placeholder="Dodaj plik"/>
                        <InputLine name="submit" type="submit" value="Dodaj test" classes="o-input--submit"/>
                    </form>
                </div>
            </main>
        </AuthOverlord>
    )
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, null)(QuizCreator)