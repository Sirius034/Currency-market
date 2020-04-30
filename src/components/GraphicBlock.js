import React, {Component} from 'react';
import Chart from './Chart';

class GraphicBlock extends Component {
    
    dataForGraphics = (db, valutes) => { 
        return valutes.map(valute => db[valute]);   
    }

    render() {
        const data = this.dataForGraphics(this.props.data, this.props.сurrency);
        
        const divMassege = (
            <div className="col-12 rounded bg-info mb-5">
                <h5 className="text-justify p-3"><img src="https://img.icons8.com/carbon-copy/50/000000/bullish--v1.png" alt="schedule" /> Графический анализ валюты </h5>
            </div>
        );
        
        if(!data.length) return divMassege;
        
        return (
            <div className="bg-light rounded p-3 mb-4">
                <Chart data={data} />
            </div>
        );
    }
}

export default GraphicBlock;

