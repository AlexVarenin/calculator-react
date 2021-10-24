import firebase from '../../firebase';

const db = firebase.ref('/history');

export class ResultsHistoryService {
    getAll() {
        return db;
    }

    create(result: string) {
        return db.push({
            date: new Date().toISOString(),
            result
        });

    }
}

export default new ResultsHistoryService();
