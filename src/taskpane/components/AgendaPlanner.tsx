import {DefaultButton, IContextualMenuProps, IStackTokens, Stack} from "office-ui-fabric-react"
import React = require("react")

export interface IButtonExampleProps {
    // These are set based on the toggles shown above the examples (not needed in real code)
    disabled?: boolean;
    checked?: boolean;
}

const _alertClicked = () => {
    alert('alertclicked')
};

const menuProps: IContextualMenuProps = {
    items: [
        {
            key: 'emailMessage',
            text: 'Email message',
            iconProps: {iconName: 'Mail'},
        },
        {
            key: 'calendarEvent',
            text: 'Calendar event',
            iconProps: {iconName: 'Calendar'},
        },
    ],
};
export const AgendaPlanner: React.FunctionComponent<IButtonExampleProps> = (props: IButtonExampleProps) => {
    const {checked} = props;
    // Example formatting
    const stackTokens: IStackTokens = {childrenGap: 20, padding: 10};
    return (
        <div>
            <Stack horizontal wrap tokens={stackTokens}>
                <DefaultButton
                    text="Standard"
                    split
                    splitButtonAriaLabel="See 2 options"
                    aria-roledescription="split button"
                    menuProps={menuProps}
                    onClick={_alertClicked}
                    checked={checked}
                />
                <DefaultButton
                    text="Primary"
                    primary
                    split
                    splitButtonAriaLabel="See 2 options"
                    aria-roledescription="split button"
                    menuProps={menuProps}
                    onClick={_alertClicked}
                    checked={checked}
                />
                <DefaultButton
                    text="Main action disabled"
                    primaryDisabled
                    split
                    splitButtonAriaLabel="See 2 options"
                    aria-roledescription="split button"
                    menuProps={menuProps}
                    onClick={_alertClicked}
                    checked={checked}
                />
                <DefaultButton
                    text="Disabled"
                    disabled
                    allowDisabledFocus
                    split
                    splitButtonAriaLabel="See 2 options"
                    aria-roledescription="split button"
                    menuProps={menuProps}
                    onClick={_alertClicked}
                    checked={checked}
                />
            </Stack>
            <div>
                Find a Person...
            </div>
        </div>
    )
}

