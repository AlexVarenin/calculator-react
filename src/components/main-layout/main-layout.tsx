import React, { useState } from 'react';
import Calculator from '../calculator';
import ResultsTable from '../results-table';
import Background from '../../assets/images/frame.png';
import './main-layout.css';

const MainLayout = () => {

    const [mode, setMode] = useState('');

    return (
        <div className="layout"
             style={{
                 backgroundImage: "url(" + Background + ")",
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat'
             }}>
            <div className="calc-wrapper">
                <button className={`switch-view-button ${mode}`} onClick={() => setMode(mode === 'history' ? 'results' : 'history')}>
                    { mode ? `to ${ mode }` : 'to results' }
                </button>
                <div className={`carousel ${ mode }`}>
                    <Calculator></Calculator>
                    <ResultsTable />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
