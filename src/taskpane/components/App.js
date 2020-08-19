import * as React from "react";
import Header from "./Header";
import Progress from "./Progress";
import Kudos from "./KUDOS.jsx";
//import logo from '../../../assets/mandm.png'
/* global Button, Header, HeroList, HeroListItem, Progress */

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
        <Header logo="https://i.imgur.com/40YzO0g.png" title={this.props.title} message="Cornerstone KUDOS" />
        <Kudos />
      </div>
    );
  }
}