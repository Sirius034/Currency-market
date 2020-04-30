import React, { Component } from 'react';
import { BarChart , Bar, LineChart, Line, Legend, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.data.length !== state.data.length) {
          return {
            data: props.data
          };
        }
    
        return null;
    }

    customTooltip = ({payload, label, active}) => {
        if(active) {
            return (
                <div style={{background: 'black', opacity: 0.8, padding: '4px'}}>
                    <p style={{color: 'blue'}}> {label} </p> 
                    <p style={{color: 'green'}}> 
                        Цена на сегодня : {payload[0].payload.Value} {payload[0].payload.Name}
                    </p>
                    <p style={{color: 'grey'}}> 
                        Предыдущая цена: {payload[0].payload.Previous}  {payload[0].payload.Name}
                    </p>
                </div>
            );
        }
        
        return null;
    }

    renderText = ({ payload, x, y, width, height, value }) => {
        return <text x={x + width / 2} y={y} fill="white" textAnchor="middle" dy={-6}>{payload} {value}</text>;
    }

    render() {
        const renderBarChart = (
            <BarChart width={800} height={400} data={this.state.data} margin={{ top: 40}} >
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke='#ccc' strokeDasharray="1 1" />                          {/*сетка */}
                <XAxis dataKey="CharCode" stroke="white" padding={{ left: 5, right: 3 }}/>     {/*ось x */}
                <YAxis stroke="white"/>                                                        {/*ось y */}
                <Tooltip content={this.customTooltip} />                                       {/* Подсказка при наведении */}
                <Bar dataKey="Value" barSize={20} fill="black" label={this.renderText} />
            </BarChart>
        );

        const renderLineChart = (
              <LineChart width={800} height={400} data={this.state.data} margin={{ top: 40, bottom: 40}}>
                  <Line type="monotone" dataKey="Previous" stroke="black" activeDot={{ r: 4 }} strokeWidth={3}/>
                  <Line type="monotone" dataKey="Value" stroke="white" activeDot={{ r: 2 }}  strokeWidth={2}/>
                  <CartesianGrid stroke='#ccc' strokeDasharray="3 3"/>  
                  <XAxis dataKey="CharCode" stroke="black" padding={{ left: 10, right: 10}}/>
                  <YAxis stroke="black"/>
                  <Tooltip content={this.customTooltip}/>
                  <Legend width={100} wrapperStyle={{ left: '50%', bottom: 10, border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
              </LineChart>
          );

        return (
            <div className="d-flex flex-column align-items-center bg-secondary rounded">   
                {renderBarChart}
                {renderLineChart}
            </div>
        );
    }
}

export default Chart;