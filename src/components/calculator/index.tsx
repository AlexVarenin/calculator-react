import { useContext, useState } from 'react';
import Keyboard from './keyboard';
import Screen from './screen';
import { CalculationContext, ResultsContext } from '../../App';
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
