import React from 'react';

const Footer = (props) => {
    return (
        <footer className="uk-container" uk-sticky="bottom: true">
            <hr />
            <div className="uk-grid">
                <time>
                    {new Date().getFullYear()}
                </time>
                <a href="https://darksky.net/poweredby/" className="uk-link">Powered by Dark Sky</a>
            </div>
        </footer>
    )
}

export default Footer;