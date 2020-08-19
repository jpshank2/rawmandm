import * as React from "react";
import Header from "./Header";
import Dashboard from './Dashboard.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: []
    };
  }

  render() {
    const { title, isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress title={title} logo="https://i.imgur.com/40YzO0g.png" message="Please sideload your addin to see app body." />
      );
    }

    return (
      <div className="ms-welcome">
        <Header logo="https://i.imgur.com/40YzO0g.png" title={this.props.title} message="M+M Points" />
        <Dashboard />
      </div>
    );
  }
}