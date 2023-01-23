import React, {useCallback, useState} from "react";

import './FaqAccordianstyles.css';

const FAQList = () => {
    
    const [selId, setSelId] = useState(-1);
    const clickItem = useCallback((index) => {
        if (selId === index) {
            setSelId(-1);
        } else {
            setSelId(index);
        }
    }, [selId])

    return (
            <div className="section-faq__content">
                <div className="accordion-wrapper">
                    <div className={selId === 1 ? "accordion active" : "accordion"} onClick={() => {
                        clickItem(1)
                    }}>
                    <span className="elementor-toggle-icon"><i className="fas fa-caret-right"></i></span>  
                        <span className="accordion__title">What is Lunar Hop?</span>
                    </div>
                    <div className="panel">
                        <p>
                            Lunar Hop NFTs were blended into the creation as it attracts you bring luck today and in the future. The more Lunar Hop NFT you have, the greater wealth you will attract.
                        </p>
                    </div>
                </div>
                <div className="accordion-wrapper">
                    <div className={selId === 2 ? "accordion active" : "accordion"} onClick={() => {
                        clickItem(2)
                    }}>
                    <span className="elementor-toggle-icon"><i className="fas fa-caret-right"></i></span>  
                        <span className="accordion__title">Who can own Lunar Hop NFT?</span>
                    </div>
                    <div className="panel">
                        <p>
                        You, me or anyone from around the globe can own Lunar Hop NFT. Anyone deserves to prosper and earn good luck for infinite wealth.
                        </p>
                    </div>
                </div>

                <div className="accordion-wrapper">
                    <div className={selId === 3 ? "accordion active" : "accordion"} onClick={() => {
                        clickItem(3)
                    }}>
                    <span className="elementor-toggle-icon"><i className="fas fa-caret-right"></i></span>  
                        <span className="accordion__title">What is Lunar Hop Miner?</span>
                    </div>
                    <div className="panel">
                        <p>
                            The Lunar Hop Miner is the primary staking platform that provide users an opportunity to collect and earn good fortune over time.
                        </p>
                    </div>
                </div>

                <div className="accordion-wrapper">
                    <div className={selId === 4 ? "accordion active" : "accordion"} onClick={() => {
                        clickItem(4)
                    }}>
                    <span className="elementor-toggle-icon"><i className="fas fa-caret-right"></i></span>  
                        <span className="accordion__title">How do I get in touch with the team?</span>
                    </div>
                    <div className="panel">
                        <p>
                            Follow us on Instagram, Twitter, and Discord for more updates and announcements.
                        </p>
                    </div>
                </div>
            </div>
    );
}

export default FAQList;