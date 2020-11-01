import {
    StackItem,
    DefaultButton,
    IButtonProps,
    IStackTokens,
    Stack,
    TeachingBubble
} from "office-ui-fabric-react"
import React = require("react")
import {useBoolean} from '@uifabric/react-hooks';
import {useState} from "react";
import ProgressBar from "./utils/Progress";
import MemeImageAndRating from "./utils/MemeImageAndRating";

export interface IButtonExampleProps {
    // These are set based on the toggles shown above the examples (not needed in real code)
    disabled?: boolean;
    checked?: boolean;
}

const examplePrimaryButtonProps: IButtonProps = {
    children: 'Try it out',
};
export const AgendaPlanner: React.FunctionComponent<IButtonExampleProps> = (props: IButtonExampleProps) => {
    const {checked} = props;
    // Example formatting
    const stackTokens: IStackTokens = {childrenGap: 20, padding: 20};
    const [teachingBubbleVisible, {toggle: toggleTeachingBubbleVisible}] = useBoolean(false);
    const [console, setConsole] = useState('console');
    const exampleSecondaryButtonProps: IButtonProps = React.useMemo(
        () => ({
            children: 'Maybe later',
            onClick: toggleTeachingBubbleVisible,
        }),
        [toggleTeachingBubbleVisible],
    );

    const openPopup = () => {
        setConsole('openPopup');
    };

    const consoleStyles = {
        root: {
            border: '1px solid grey',
            padding: '10px'
        }
    };


    /*
        const getProgressStyle  = () => {
            const color = SharedColors.red10
            const styles = {
                root: {
                    background: color
                }
            }
            return styles;
        };
    */

    return (
        <div>
            <ProgressBar/>
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
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis
                        aliquam magni
                        harum non?
                    </TeachingBubble>
                )}
                <DefaultButton
                    text="Open Popup"
                    splitButtonAriaLabel="See 2 options"
                    aria-roledescription="split button"
                    onClick={openPopup}
                    checked={checked}
                />
                <StackItem styles={consoleStyles}>{console}</StackItem>
            </Stack>
            <div>
                <MemeImageAndRating />
                Find a Person...
            </div>
        </div>
    )
}

