import { Link } from "@remix-run/react";

export default function WiseHome() {
    return (
        <Link to='/wise-login'>
        <div className="flex flex-col">
            <img src="1.jpg" alt="Netlify Logo" />
            <img src="2.jpg" alt="Netlify Logo" />
            <img src="3.jpg" alt="Netlify Logo" />            <img src="2.jpg" alt="Netlify Logo" />
            <img src="4.jpg" alt="Netlify Logo" />
            <img src="5.jpg" alt="Netlify Logo" />
            </div></Link>
    )
}