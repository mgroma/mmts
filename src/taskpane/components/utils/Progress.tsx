import * as React from "react";
import {ProgressIndicator} from "office-ui-fabric-react";
import {SharedColors} from "@fluentui/theme";
import {getTheme} from '@fluentui/react';


const ProgressBar: React.FunctionComponent = () => {
    const [percentComplete, setPercentComplete] = React.useState(0);
    const [progressColor, setProgressColor] = React.useState<string>(getTheme().palette.themePrimary)
    const intervalDelay = 100;
    const intervalIncrement = 0.01;
    const getStyles = () => {
        return {
            progressBar: {
                background: progressColor,
            }
        }
    }
    React.useEffect(() => {
        const id = setInterval(() => {
            setPercentComplete((intervalIncrement + percentComplete));
        }, intervalDelay);
        //https://fluentcolors.com/
        if (0.3 <= percentComplete) setProgressColor(SharedColors.yellowGreen10);
        if (0.7 <= percentComplete) setProgressColor(SharedColors.yellow10);
        if (0.85 <= percentComplete) setProgressColor(SharedColors.orange10);
        if (1 <= percentComplete) {
            setProgressColor(SharedColors.red20);
            clearInterval(id);
        }
        return () => {
            clearInterval(id);
        };
    });

    return (
        <ProgressIndicator
            barHeight={20}
            label="Meeting Progress"
            description={`progress: ${Math.floor(percentComplete * 100)}`}
            percentComplete={percentComplete}
            styles={getStyles}
        />
    );
};
export default ProgressBar;
