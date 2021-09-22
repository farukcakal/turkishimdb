import React from 'react';
import { Search } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './app.css';

const SearchBox = () => {
    return(
        <div className="Box">
            <div className="slider">
                <div className="slider-content">
                    <div className="content-wrapper">
                        <h2>Hoş Geldiniz</h2>
                        <h3>Milyonlarca film, TV şovu ve keşfedilecek kişi. Şimdi Keşfedin.</h3>
                        <div className="search-bar">
                            <Search fluid className="Search" placeholder="Film, dizi, kişi ara..."/>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default SearchBox;