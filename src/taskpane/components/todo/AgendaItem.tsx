// @flow
import * as React from 'react';
import {TodoItem} from "./store";
import {useCallback, useContext, useState} from "react";
import {AgendaContext} from "./AgendaContext";
import {Label, PrimaryButton, TextField} from "office-ui-fabric-react";

type Props = {
    id?: string
    label?: string
};
export const AgendaItem = (props: Props) => {
    const {id} = props;
    const {items, add, getNew} = useContext(AgendaContext);
    const item: TodoItem = id ? items[id] : getNew();
    const [label, setLabel] = useState(props.label ? props.label : item.label)

    const onChangeLabel = useCallback((evt, newValue) => {
        setLabel(newValue);
    }, []);

    return (
        <div>
            <Label>label={item.label} - completed={item.completed ? 'yes' : 'no'}</Label>
            {!id && <>
                <TextField label={'enter label'} value={label} onChange={onChangeLabel}/>
                <PrimaryButton label={'Add'} text={'Add'} onClick={() => add({...item, label: label + ' add'})}/>
            </>
            }
        </div>
    );
};
