// @flow
import * as React from 'react';
import {Store, TodoItem} from "./store";
import {AgendaContext} from "./AgendaContext";
import {AgendaList} from "./AgendaList";
import {AgendaItem} from "./AgendaItem";
import {AgendaConsole} from "./AgendaConsole";

type Props = {};
type State = {};

export class MyTodoApp extends React.Component<any, Store> {

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            filter: "all",
            todos: {},
            items: []
        }
    }

    render() {
        return (
            <AgendaContext.Provider
                value={{
                    ...this.state,
                    add: this._add,
                    getNew: this._getNew
                }}
            >
                <div>
                    my todo app
                    <AgendaItem label={'add new item'} />
                    <AgendaList/>
                    <AgendaConsole />
                </div>
            </AgendaContext.Provider>
        );
    };

    private _getNew= (): TodoItem => {
        const todo: TodoItem = {label: 'marek', completed: false};
        return todo;
    };
    private _add = (item: TodoItem) => {
        const {todos, items, filter} = this.state;
        const index = Object.keys(todos).length;
        todos[index + 1] = item;
        items.push(item);
        this.setState({
            filter,
            todos: {
                ...todos, [index + 1]: item
            },
            items
        })
    }
};
