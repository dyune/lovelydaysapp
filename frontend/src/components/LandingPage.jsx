import {Link} from 'react-router-dom';

export default function LandingPage() {
    return <>
        hi chat
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
        </ul>
    </>
}