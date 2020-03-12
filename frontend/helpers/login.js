import axios from 'axios';

export const handleLogin = (e, email, password, history) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/login', {
        email: email,
        password: password
    }).then(res => {
      localStorage.setItem('jwt', res.data.token);
      history.goBack();
    }).catch(() => {
        this.setState({
            error: true
        });
    });
} 