import React, { useContext, useState } from 'react';
import Keyboard from './keyboard';
import Screen from './screen';
import { CalculationContext } from '../../services/calc.context';
import { ResultsContext } from '../../services/results-history.context';
import './index.css';

const Calculator = () => {

    const calcService = useContext(CalculationContext);
    const resultsService = useContext(ResultsContext);
    const [value, setValue] = useState('0');

    return (
        <div className="calculator">
            <Screen value={value} onClick={ () => resultsService.create(value) }/>
            <Keyboard addValue={ (val: string) => setValue(calcService.append(val)) }/>
        </div>
    );

};

export default Calculator;
