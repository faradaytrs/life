/**
 * Created by yadro on 05.10.2016.
 */

import * as React from 'react';

let models = {
    'glider': [
        0, 1, 0,
        0, 0, 1,
        1, 1, 1,
    ]
};

// todo
/**
 * выбираем модель в select
 * жмем поставить на доску
 * игра останавливается
 * отображается превью модели
 * по клику модель ставится на доску
 */

export class SelectModel extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'glider'
        }
    }

    renderSelectItems() {
        var items = [];
        for (var modelName in models) {
            items.push(
                <option value={modelName}>{modelName}</option>
            );
        }
    }

    renderSelect() {
        return <select onChange={this.onChange}>
            {this.renderSelectItems()}
        </select>;
    }

    onClick = () => {

    }

    render() {
        return (
            <button onClick={this.onClick}>glider</button>
        )
    }
}
