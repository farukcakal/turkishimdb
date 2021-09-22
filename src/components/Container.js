import React from 'react';
import './app.css';
import SearchBox from './SearchBox';
import Populars from './Populars';

const Container = () => {
    return(
        <div className="Container">
            <SearchBox/>
            <Populars/>
        </div>
    )
}

export default Container;