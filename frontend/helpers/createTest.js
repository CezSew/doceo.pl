import axios from 'axios';
import { getJwt } from '../helpers';

export function createTest(e, history) {
    e.preventDefault();
    const title = e.target.querySelector('.o-input[name=name]').value;
    const type = e.target.querySelector('.o-input[name=type]').value;
    const questions =  e.target.querySelector('.o-input[name=hidden-questions]').value;

    console.log(questions);

    if(title && type) {
        axios.post('http://localhost:8000/api/quiz', {
            title: title,
            type: type,
            questions: encodeURIComponent(questions)
        },
        { headers: { Authorization: getJwt() } }
        ).then(res => {
            history.goBack();
        })
        .catch(e => {
            console.log(e)
        });
    }
}