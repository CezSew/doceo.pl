import '../../css/pages/error.scss';
import React, {ReactNode} from "react";
import { Link } from 'react-router-dom';

interface ErrorBoundaryState {
    hasError: boolean;
}

interface ErrorBoundaryProps {
    children: ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    resetError() {
        this.setState({
            hasError: false
        })
    }

    componentDidCatch(error, errorInfo) {
        //log
    }

    render() {
        if (this.state.hasError) {
            return (
                <main className="c-error">
                    <div className="o-container">
                        <h1 className="c-error__title">
                            <span className="c-error__sadface">:(</span> UPS! Coś poszło bardzo nie tak!
                        </h1>
                        <h2 className="c-error__subtitle">Wróć do
                            <Link to="/" className="c-error__link" onClick={() => this.resetError()}>
                                strony głównej
                            </Link>
                        </h2>
                    </div>
                </main>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary
