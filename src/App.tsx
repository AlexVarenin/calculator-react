import React from 'react';
import calculationService, { CalculationService } from './services/calculation/calculation-service';
import resultsHistoryService, { ResultsHistoryService } from './services/results-history/results-history-service';
import MainLayout from "./components/main-layout/main-layout";


export const CalculationContext = React.createContext<CalculationService>(calculationService);
export const ResultsContext = React.createContext<ResultsHistoryService>(resultsHistoryService);

const App = () => <MainLayout/>;

export default App;
