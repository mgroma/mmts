// @flow
import * as React from 'react';
import {useContext} from "react";
import {AgendaContext} from "./AgendaContext";
import {AgendaItem} from "./AgendaItem";

type Props = {};
export const AgendaList = (props: Props) => {
    const context = useContext(AgendaContext);
    const {items} = context;
    return (
        <div>
            AgendaList
            {
                items.map((item, index) => (
                    <div key={index}>
                        list item [{index}]
                        <AgendaItem id={index}/>
                    </div>
                ))
            }

        </div>
    );
};
