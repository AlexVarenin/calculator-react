import React, { Fragment } from 'react';
import Button from "./button";
import { keyboardConfig } from '../../../constants/constants';

const Keyboard = ({ addValue }: { addValue: (val: string) => void }) => (
    <Fragment>
        { keyboardConfig.map((config, index) => (
            <Button
                className={config.className}
                key={index}
                onClick={ () => addValue(config.value) }
            >{ config.label }</Button>
        )) }
    </Fragment>

);

export default Keyboard;
