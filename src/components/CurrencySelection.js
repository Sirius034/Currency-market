import React, {Component} from 'react';

class CurrencySelection extends Component {
    
    styleButton = (el) => {
        let parent = el.parentNode;
        let sibling = el.nextElementSibling
        
        parent.className = el.checked ? 'btn btn-secondary btn-sm active my-2 mr-1' : 'btn btn-secondary btn-sm my-2 mr-1';
        sibling.innerHTML = el.checked ? '&#10004;' : '&#10006;';
    }

    itemElement = (el) => {
        if(el.checked) {
            this.props.addСurrency(el.value)
        } else {
            this.props.removeСurrency(el.value)
        }

        this.styleButton(el);
    }

    elementManagement = (ev) => {

        if(ev.target.innerHTML === 'Очистить') {
            this.props.deletAll();
        } else {
            this.props.addAll(Object.keys(this.props.valutes));
        }

        [...document.querySelectorAll('input[type=checkbox]')].forEach(element => {
            element.checked = ev.target.innerHTML === 'Очистить' ? false : true;
            this.styleButton(element)
        });
    }

    render() {
        const valutesName = Object.keys(this.props.valutes);

        const labels = valutesName.map((valute, index) => {
            return (
                <label key={valute + index} className="btn btn-secondary btn-sm my-2 mr-1">
                    <input type="checkbox"  autoComplete="off" value={valute} onClick={(ev) => this.itemElement(ev.target)} /> {valute}
                    <span className="badge " aria-hidden="true">
                        &#10006;
                    </span>
                </label>  
                );
            });

        return (
            <div className="col-12  bg-light rounded p-4 mb-4"> 
                <p className="font-italic">Интересует валюта: </p>

                <div className="btn-group-toggle border p-2 text-center" data-toggle="buttons">
                    { labels }
                </div>
                
                <div className="btn-group mt-5" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-secondary mr-1" onClick={this.elementManagement}>Выбрать все</button>
                    <button type="button" className="btn btn-secondary" onClick={this.elementManagement}>Очистить</button>
                </div>
            </div>
        );
    }
}

export default CurrencySelection;