import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Field} from './field';
import {Preview} from './preview';

class Life extends React.Component<any, any> {
    render() {
        const field = new Field(50, 50);
        return <Preview width={1000} height={1000} field={field.field} />;
    }
}
ReactDOM.render(<Life />, document.querySelector("#root"));
