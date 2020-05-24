import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import Header from "../../parts/Header";
import InputLine from "../../parts/InputLine";
import '../../../css/pages/quizCreator.scss';
import { createTest } from '../../../helpers/createTest';
import { QuizTypes } from './representational/QuizTypes';
import { AddQuizMethods } from "./representational/AddQuizMethods";
import { QuizCreatorProps } from "./types";
import { QuizWizard } from "./representational/QuizWizard";
import { Dropfile } from "./representational/Dropfile";
import { QuizCreatorHeader } from "./representational/QuizCreatorHeader";

const QuizCreator = (props: QuizCreatorProps) => {
    const [showWizard, setShowWizard] = useState(false);
    const [showFileDrop, setShowFileDrop] = useState(false);

    return (
        <React.Fragment>
            <Header />
            <main className="c-quiz-creator">
                <div className="o-container">
                    <form className="o-form c-quiz-creator-form" onSubmit={(e) => createTest(e, this.props.history)}>
                        <p className="o-form__title o-title o-title--h2 o-title--line">
                            Dodaj quiz
                        </p>
                        <div className="c-quiz-creator-form__content">
                            <QuizCreatorHeader />
                            <QuizTypes />
                            <div className="c-quiz-creator__quiz-types-group">
                                <p className="c-quiz-creator__quiz-types-title">Dodaj pytania:</p>
                                <AddQuizMethods setShowWizard={setShowWizard} setShowFileDrop={setShowFileDrop}/>
                            </div>
                            {showFileDrop && <Dropfile />}
                            {showWizard && <QuizWizard />}
                        </div>
                        <InputLine name="submit" type="submit" value="Dodaj test" classes="o-input--submit"/>
                    </form>
                </div>
            </main>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, null)(QuizCreator)
