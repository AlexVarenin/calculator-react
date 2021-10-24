import { MAX_VALUES_ON_SCREEN } from '../../constants/constants';

export class CalculationService {
    public dataArray: string[] = [];
    public bracketsArray: number[] = [];
    public lastValue = '0';
    public lastAction: string[] = [];
    public lastOperator: string = '';

    public append(val: string): string {
        const result =  this.handleAppend(val);
        return this.normalizeValue((result || 0).toString());
    }

    private handleAppend(val: string): string {
        switch(val) {
            case 'C':
                return this.handleReset(val);
            case '=':
                return this.handleGetResult(val);
            case '/':
            case '*':
                return this.handleMultiplyDivide(val);
            case '+':
            case '-':
                return this.handlePlusMinus(val);
            case '(':
                return this.handleOpenBracket(val);
            case ')':
                return this.handleClosedBracket(val);
            case '.':
                return this.handleDot(val);
            default:
                return this.handleNumber(val);
        }
    }

    private getResult(dataArr: string[]): string {
        const arr = [...dataArr];
        if (this.isLastOperator(arr)) {
            arr.pop();
        }
        // eslint-disable-next-line
        return eval(arr.filter(item => item !== '(' && item !== ')').join('')) || ''
    }

    private isLastOperator(arr: string[]): boolean {
        const lastValue = arr[arr.length - 1];
        return ['+', '-', '/', '*'].includes(lastValue);
    }

    private getLastAction(dataArr: string[], lastAction: string[]): string[] {
        const dataArrLength = dataArr.length;
        return lastAction.length ? lastAction : dataArrLength > 1 ? dataArr.slice(dataArrLength - 2) : [];
    }

    private handleReset(val: string): string {
        this.dataArray = [];
        this.lastAction = [];
        this.lastOperator = val;
        return this.lastValue = '0';
    }

    private handleGetResult(val: string): string {
        let result = '';
        if (this.isLastOperator(this.dataArray)) {
            const lastOperator = this.dataArray.pop() || '';
            const lastValue = this.dataArray[this.dataArray.length - 1] || '';
            this.lastAction = [lastOperator, lastValue];
            result = this.getResult([...this.dataArray, ...this.lastAction]) || '0';
        } else {
            result = this.getResult([...this.dataArray, ...this.lastAction]) || '0';
            this.lastAction = this.getLastAction(this.dataArray, this.lastAction);
        }
        this.dataArray = [result];
        this.lastOperator = val;
        return this.lastValue = result;
    }

    private handleMultiplyDivide(val: string): string {
        if (['/', '*'].includes(this.lastOperator)) {
            const result = this.getResult(this.dataArray);
            this.dataArray = [result || this.lastValue, val];
            this.lastOperator = val;
            return this.lastValue = result || this.lastValue;
        }
        this.lastAction = [];
        if (this.isLastOperator(this.dataArray)) {
            this.dataArray.pop();
        }
        this.dataArray.push(val);
        this.lastOperator = val;
        return this.lastValue;
    }

    private handlePlusMinus(val: string): string {
        this.lastAction = [];
        if (this.dataArray.includes('(')) {
            if (this.isLastOperator(this.dataArray)) {
                this.dataArray.pop();
            }
            this.dataArray.push(val);
            return this.lastValue;
        }
        const result = this.getResult(this.dataArray);
        this.dataArray = [result || this.lastValue, val];
        this.lastOperator = val;
        return this.lastValue = result || this.lastValue;
    }

    private handleOpenBracket(val: string): string {
        const lastValue = this.dataArray[this.dataArray.length - 1];
        if (lastValue && !isNaN(+lastValue)) {
            this.dataArray.pop();
        }
        this.bracketsArray.push(this.dataArray.length);
        this.dataArray.push(val);
        return this.lastValue;
    }

    private handleClosedBracket(val: string): string {
        const openBracket = this.bracketsArray.pop() || 0;
        const dArray = this.dataArray.slice(openBracket);
        const result = this.getResult(dArray);
        this.dataArray = [...this.dataArray.slice(0, openBracket), result];
        this.lastOperator = val;
        return this.lastValue = result;
    }

    private handleDot(val: string): string {
        const value = this.dataArray.pop();
        if (value && !isNaN(Number(value))) {
            if (!Number.isInteger(Number(value))) {
                val = '';
            }
            this.dataArray.push(value + val);
            return this.lastValue = value + val;
        } else {
            const result = '0.';
            this.dataArray.push(value || '', result);
            return this.lastValue = result;
        }
    }

    private handleNumber(val: string): string {
        if (this.lastOperator === '=') {
            this.dataArray = [];
        }
        const value = this.dataArray.pop();
        if (value && !isNaN(Number(value))) {
            const valueToReturn = value === '0' ? val : value + val;
            this.dataArray.push(valueToReturn);
            return this.lastValue = valueToReturn;
        } else {
            this.dataArray.push(value || '', val);
            return this.lastValue = val;
        }
    }

    // TODO fix normalisation
    private normalizeValue(val: string): string {
        if (val.includes('Infinity')) {
            return 'Error';
        }

        const dotIndex = val.indexOf('.');

        if (val.replace('.', '').length <= MAX_VALUES_ON_SCREEN
            && dotIndex !== MAX_VALUES_ON_SCREEN) {
            return val;
        }

        if (dotIndex === -1 || dotIndex >= MAX_VALUES_ON_SCREEN + 1) {
            return Number(val).toExponential(5).replace('+', '');
        }

        return Number(Number(val).toFixed(MAX_VALUES_ON_SCREEN - dotIndex)).toString();

    }

}

export default new CalculationService();

