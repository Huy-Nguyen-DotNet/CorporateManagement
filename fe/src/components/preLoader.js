import React, { useEffect } from 'react';

const Preloader = () => {
    useEffect(() => {
        // Code JavaScript (nếu cần) để ẩn preloader sau khi trang tải
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.style.display = 'none'; // Ẩn preloader khi trang đã tải xong
            }
        });
    }, []);

    return (
        <div id="preloader">
            <div className="book">
                <div className="inner">
                    <div className="left"></div>
                    <div className="middle"></div>
                    <div className="right"></div>
                </div>
                <ul>
                    {[...Array(20)].map((_, index) => (
                        <li key={index}></li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Preloader;
