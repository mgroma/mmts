// @flow
import * as React from 'react';
import {useContext} from "react";
import {AgendaContext} from "./AgendaContext";
import { Stack } from 'office-ui-fabric-react';

type Props = {};
export const AgendaConsole = (props: Props) => {
    const context = useContext(AgendaContext);
    const {items} = context;
    return (
        <Stack padding={10} styles={{root: {border: '1px solid grey'}}}>
            <div>console</div>
            {
                items.map((item,index) => (
                <div key={index}>index[{index}]={item.label}</div>
            ))
            }
        </Stack>
    );
};
