import React, { useContext, useEffect, useState } from 'react';
import ResultHistoryRecord from '../../interfaces/result-history.interface';
import { ResultsContext } from '../../services/results-history.context';
import firebase from 'firebase/app';
import { format } from 'date-fns';
import './index.css';

type DataSnapshot = firebase.database.DataSnapshot;

const ResultsTable = () => {

    const resultsService = useContext(ResultsContext);
    const [results, setResults] = useState<ResultHistoryRecord[]>([]);

    useEffect(() => {
        const handleStatusChange = (items: DataSnapshot) => {
            const results: ResultHistoryRecord[] = [];

            items.forEach(item => {
                let data = item.val();
                results.push({
                    date: data.date,
                    result: data.result
                });
            });

            setResults(results);
        };

        resultsService.getAll().on("value", handleStatusChange);

        return () => {
            resultsService.getAll().off("value", handleStatusChange);
        };
    });

    return (
        <div className="table-wrapper">
            <table>
                <thead>
                <tr>
                    <th>Result</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {results &&
                results.map((result, index) => (
                    <tr key={index}>
                        <td>{result.result}</td>
                        <td>{format(new Date(result.date), 'LLLL do, yyyy H:mma')}</td>
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    );
};

export default ResultsTable;
