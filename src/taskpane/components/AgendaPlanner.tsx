import {
    DefaultButton,
    IButtonProps,
    IContextualMenuProps,
    IStackTokens,
    Stack,
    TeachingBubble
} from "office-ui-fabric-react"
import React = require("react")
import {useBoolean} from '@uifabric/react-hooks';

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
const examplePrimaryButtonProps: IButtonProps = {
    children: 'Try it out',
};
export const AgendaPlanner: React.FunctionComponent<IButtonExampleProps> = (props: IButtonExampleProps) => {
    const {checked} = props;
    // Example formatting
    const stackTokens: IStackTokens = {childrenGap: 20, padding: 10};
    const [teachingBubbleVisible, {toggle: toggleTeachingBubbleVisible}] = useBoolean(false);
    const exampleSecondaryButtonProps: IButtonProps = React.useMemo(
        () => ({
            children: 'Maybe later',
            onClick: toggleTeachingBubbleVisible,
        }),
        [toggleTeachingBubbleVisible],
    );
    return (
        <div>
            <Stack horizontal wrap tokens={stackTokens}>
                <DefaultButton
                    id="targetButton"
                    onClick={toggleTeachingBubbleVisible}
                    text={teachingBubbleVisible ? 'Hide TeachingBubble' : 'Show TeachingBubble'}
                />
                {teachingBubbleVisible && (
                    <TeachingBubble
                        target="#targetButton"
                        primaryButtonProps={examplePrimaryButtonProps}
                        secondaryButtonProps={exampleSecondaryButtonProps}
                        onDismiss={toggleTeachingBubbleVisible}
                        headline="Discover what’s trending around you"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis aliquam magni
                        harum non?
                    </TeachingBubble>
                )}
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

