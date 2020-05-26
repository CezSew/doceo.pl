import React, { useEffect } from "react";
import fileLoadModule from '../../../../helpers/fileLoadModule';

export const Dropfile = () => {
    useEffect(() => {
        fileLoadModule();
    }, [])

    return (
        <section className="c-quiz-creator__dropfile-wrapper">
            <div className="c-quiz-creator__dropfile-description-wrapper">
                <p className="c-quiz-creator__description o-underlined">Dodaj test z pliku tekstowego</p>
                <p className="c-quiz-creator__description">Test musi zawierać co najmniej 5 pytań. Struktura pliku powinna wyglądać następująco: pierwsza linia pliku jest pytaniem, następne cztery linie odczytaną zostaną jako odpowiedzi. Umieść plus przed poprawną odpowiedzią. Następne pytania nanoś analogicznie, od następnej linii następującej po czwartej odpowiedzi poprzedniego pytania.</p>
                <p className="c-quiz-creator__description">Pobierz plik z szablonem: <a href="#">Kliknij tutaj</a></p>
            </div>

            <div className="c-quiz-creator-form__dropfile js-quiz-creator-form__dropfile">
                <div className="js-file-holder c-file-holder" id="holder">
                    <p className="c-file-holder-status" id="status">Upuść plik .txt</p>
                </div>
            </div>
        </section>
    )
}
