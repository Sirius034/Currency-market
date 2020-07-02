import React, {Component, Fragment} from 'react';
import CurrencySelection from './CurrencySelection';
import GraphicBlock from './GraphicBlock';
import CurrencyCalculation from './CurrencyCalculation';

class CurrencyMarket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            сurrency: [],
            isError: false 
        }
    }

    addCurrencyToAnalysis = (valuteName) => {
        this.setState({
            сurrency: [valuteName, ...this.state.сurrency]
        });
    }

    removeСurrencyFromAnalysis = (valuteName) => {
        this.setState(state => {
            return {
                сurrency: state.сurrency.filter(v => v !== valuteName)
            }
        });
    }

    deletAll = () => {
        this.setState({
            сurrency: []
        });    
    }

    addAll = (arrCurr) => {
        this.setState({
            сurrency: arrCurr
        }); 
    }

    async componentDidMount() {
        try {
            const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
            const result = await response.json();
            this.setState({
                data: result
            });
        } catch(error) {
            console.log(true);
            this.setState({
                data: true,
                isError: true
            });
        }

    }

    render() {

        if(!this.state.data) return <div className="alert alert-info" role="alert"><h2 className="text-black">Загрузка...</h2></div>
        if(this.state.isError) return <div className="alert alert-danger" role="alert"><h2 className="text-black">Ошибка...</h2></div>

        return (
            <Fragment>
                <div className="col-12 rounded bg-info mb-5">
                    <h5 className="text-justify p-4">Дата: {this.state.data.Date.slice(0, 10)}, Время: {this.state.data.Date.slice(12)}</h5>
                </div>
                
                <CurrencySelection 
                    valutes={this.state.data.Valute}
                    addСurrency={this.addCurrencyToAnalysis}
                    removeСurrency={this.removeСurrencyFromAnalysis}
                    deletAll={this.deletAll}
                    addAll={this.addAll}
                />
                
                <GraphicBlock 
                    сurrency={this.state.сurrency} 
                    data={this.state.data.Valute}
                /> 

                <CurrencyCalculation 
                    valutes={this.state.data.Valute}
                />

                <div className="col-12 rounded bg-info">
                    <p className="font-weight-normal p-3">
                        Данные взяты с <a className="text-white font-weight-bold" href="https://www.cbr.ru/currency_base/daily/" target="_blank" rel="noopener noreferrer" >
                            Центрального Банка Российской Федерации
                        </a>
                    </p>
                </div>
            </Fragment>
        );
    }
}

export default CurrencyMarket;