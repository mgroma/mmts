import * as React from "react";
import { HeroListItem } from "./HeroList";
// images references in the manifest
import "../../../assets/icon-16.png";
import "../../../assets/icon-32.png";
import "../../../assets/icon-80.png";
import { Main } from "./Main";
/* global Button, Header, HeroList, HeroListItem, Progress */

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export interface AppState {
  listItems: HeroListItem[];
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listItems: []
    };
  }

  componentDidMount() {
    this.setState({
      listItems: [
        {
          icon: "Ribbon",
          primaryText: "Achieve more with Office integration"
        },
        {
          icon: "Unlock",
          primaryText: "Unlock features and functionality"
        },
        {
          icon: "Design",
          primaryText: "Create and visualize like a pro"
        }
      ]
    });
  }

  click = async () => {
    /**
     * Insert your Outlook code here
     */
  };

  render() {
    const { isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return (
          <div>
        <Main />
          </div>
      );
    }

    return (
      <div className="ms-welcome">
        <Main />
      </div>
    );
  }
}
