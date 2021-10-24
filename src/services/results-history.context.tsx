import React from "react";
import { ResultsHistoryService } from './results-history/results-history-service';
import resultsHistoryService from './results-history/results-history-service';

export const ResultsContext = React.createContext<ResultsHistoryService>(resultsHistoryService);
