import * as React from 'react';
import {PeopleSearch} from "./PeopleSearch/PeopleSearch";
import {IconButton, Label, Pivot, PivotItem} from "office-ui-fabric-react";
import {AgendaPlanner} from "./AgendaPlanner";
import {TodoApp} from "./todo/TodoApp";
//https://codesandbox.io/embed/y0o9o2815v - great
// https://developer.microsoft.com/en-us/fluentui#/controls/web/pivot
export const Main: React.FunctionComponent = () => {
    const style = {
        margin: '10px 30px',
        border: '1px solid grey',
        padding: '10px'
    }
    return (
        <Pivot style={style}>
            <PivotItem headerText="Meeting Host" itemIcon="Group">
                <TodoApp />
            </PivotItem>
            <PivotItem headerText="Agenda Planner" itemCount={23} itemIcon="Recent">
                <AgendaPlanner/>
                <PeopleSearch/>
            </PivotItem>
            <PivotItem headerText="Action Items" itemIcon="ReminderGroup">
                <Label>Meeting host stuff</Label>
                <IconButton iconProps={{iconName: 'Emoji2'}}/>
            </PivotItem>
        </Pivot>
    );
};
