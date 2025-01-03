import React from 'react';
import './MyFooter.css';

const MyFooter = () => {
    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; {new Date().getFullYear()} ShopNik. All rights reserved.</p>
                    <div className="social-links">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            Facebook
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            LinkedIn
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            Instagram
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default MyFooter;
