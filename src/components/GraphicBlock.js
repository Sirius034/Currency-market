import React, {Component} from 'react';
import Chart from './Chart';

class GraphicBlock extends Component {
    
    dataForGraphics(db, valutes) { 
        return valutes.map(valute => db[valute]);   
    }

    render() {
        const data = this.dataForGraphics(this.props.data, this.props.сurrency);
        
        const divMassege = (
            <h5 className="text-justify p-3"><img src="https://img.icons8.com/carbon-copy/50/000000/bullish--v1.png" alt="schedule" /> Графический анализ валюты </h5>
        );
        
        return (
            <div className="bg-info rounded p-2 mb-4">
               {
                   data.length 
                    ?  <Chart data={data} />
                    :  divMassege
               } 
            </div>
        );
    }
}

export default GraphicBlock;

