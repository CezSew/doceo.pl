import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import InputLine from "../../parts/InputLine";
import '../../../css/pages/quizCreator.scss';
import { createTest } from '../../../helpers/createTest';
import { QuizTypes } from './representational/QuizTypes';
import { AddQuizMethods } from "./representational/AddQuizMethods";
import { QuizCreatorProps } from "./types";
import { QuizWizard } from "./representational/QuizWizard";
import { Dropfile } from "./representational/Dropfile";
import { WithSideMenu } from "../../hoc/withSideMenu";
import { BulbSVG } from "../../utils/svg/Bulb";
import { QuizCreatorInputs } from "./representational/QuizCreatorInputs";
import { CreatorStepHeader } from "./representational/CreatorStepHeader";
import { firstStepHandler, secondStepHandler } from "./utils";
import { sendForm } from '../../../helpers/sendForm';

const QuizCreator = (props: QuizCreatorProps) => {
    const [showWizard, setShowWizard] = useState(false);
    const [showFileDrop, setShowFileDrop] = useState(false);
    const [formRecords, setFormRecords] = useState(null);

    console.log(props)
    return (
        <section className="c-quiz-creator">
            <div className="c-quiz-creator__header">
                <h2 className="c-quiz-creator__title">
                    Stwórz swój własny, unikalny test!
                </h2>
                <BulbSVG/>
            </div>
            <div className="c-quiz-creator__content">
                <form className="o-form c-quiz-creator-form" onSubmit={(e) => createTest(e, props.history)}>
                    <div className="c-quiz-creator__form-content">
                        <p className="c-quiz-creator__description c-quiz-creator__description--main">
                            Utwórz test, którym łatwiej zrealizujesz swój cel, a ponadto umożliwisz naukę innym użytkownikom. Twórz, dziel się, a przede wszystkim <span className="o-underlined">ucz się łatwiej.</span>
                        </p>
                        <div className="c-quiz-creator__step js-creator-step-1">
                            <CreatorStepHeader title="Krok 1." description="Podaj nazwę testu"/>
                            <QuizCreatorInputs stepHandlers={[firstStepHandler, secondStepHandler]}/>
                        </div>
                        <div className="c-quiz-creator__step c-quiz-creator__step--hidden js-creator-step-2">
                            <CreatorStepHeader title="Krok 2." description="Wybierz typ testu"/>
                            <QuizTypes/>
                        </div>
                        <div className="c-quiz-creator__step c-quiz-creator__step--hidden js-creator-step-3">
                            <CreatorStepHeader title="Krok 3." description="Dodaj pytania"/>
                            <AddQuizMethods setShowWizard={setShowWizard} setShowFileDrop={setShowFileDrop}/>
                        </div>
                    </div>
                </form>

                {showFileDrop && <Dropfile />}
                {showWizard && <QuizWizard formRecords={formRecords} setFormRecords={setFormRecords}/>}

                <InputLine name="submit" type="submit" value="Dodaj test" classes="o-input--submit" handleClick={(e) => sendForm(e, '.c-quiz-creator-form')}/>
            </div>

        </section>
    )
}

const mapStateToProps = state => ({
    user: state.user
});

const options = {
    title: 'Kreator testów',
    sideLinks: [
        {
            text: 'Strona główna',
            link: '/'
        },
        {
            text: 'Wyświetl testy',
            link: '/tests-main'
        }
    ]
}

export default connect(
    mapStateToProps, 
    null)
    (WithSideMenu(QuizCreator, options))
