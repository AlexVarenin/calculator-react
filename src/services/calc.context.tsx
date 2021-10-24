import React from 'react';
import { CalculationService } from './calculation/calculation-service';
import calculationService from './calculation/calculation-service';


export const CalculationContext = React.createContext<CalculationService>(calculationService);
