// @flow
import * as React from 'react';
import {useContext} from "react";
import {AgendaContext} from "./AgendaContext";

type Props = {

};
export const NewAgenda = (props: Props) => {
    const context = useContext(AgendaContext);
    const {add} = context;
    return (
        <div>

        </div>
    );
};
