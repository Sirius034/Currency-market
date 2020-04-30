import React, {Component} from 'react';

class CurrencyCalculation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            purchase: 'USD',
            valutes: this.props.valutes,
            purValue: '',
            salValue: ''
        }
    }

    createSelectOptions = (valutes) => {
        let arrValutes = Object.keys(valutes);
        
        return (
                <select className="input-group-text bg-secondary text-white" id="purchase" value={this.state.purchase} onChange={this.currencyDetermination}>
                    { arrValutes.map((valute, ind) => <option key={valute + ind} value={valute}>{valute}</option>) }
                    <option key="100" value="RUB">RUB</option>
                </select>
            );
    }

    currencyDetermination = (ev) => {
        this.setState({
           purchase : ev.target.value,
           purValue: '',
           salValue: ''
        });
    }

    payment = (ev) => {
        let enteredValue = ev.target.value;

        if (ev.target.id === 'purchase_value') {
            this.setState(state => {
                return {
                    purValue : enteredValue,
                    salValue : (state.valutes[state.purchase].Value * enteredValue).toFixed(2) 
                }
            });

            return;
        }

        this.setState(state => {
            return {
                purValue : (enteredValue / state.valutes[state.purchase].Value).toFixed(2),
                salValue : enteredValue
            }
        });
    }

    render() {
        const select = this.createSelectOptions(this.state.valutes);

        return (
            <div className="bg-light rounded mt-3 py-4 px-2 mb-5">
                <div className="col-10 input-group mx-auto">
                    <div className="input-group-prepend">
                        {select}
                    </div>
                    <input type="number" id="purchase_value" className="form-control" value={this.state.purValue} onChange={this.payment}/>

                    <div className="input-group-prepend">
                        <span className="input-group-text mx-2">=</span>
                        <span className="input-group-text px-3">RUB</span>
                    </div>
                    <input type="number" id="sale_value" className="form-control" value={this.state.salValue} onChange={this.payment}/>
                 </div>
            </div>
        ); 
    }
}

export default CurrencyCalculation;