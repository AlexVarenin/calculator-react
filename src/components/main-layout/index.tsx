import React, { useState } from 'react';
import Calculator from '../calculator';
import ResultsTable from '../results-table';
import Background from '../../assets/images/frame.png';
import './index.css';

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
                <button className={`switch-view-button ${mode}`} onClick={() => setMode(mode === 'calculation' ? 'history' : 'calculation')}>
                    { mode ? `to ${ mode }` : 'to history' }
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
