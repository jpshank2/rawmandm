import * as React from "react";
import Header from "./Header";
import Progress from "./Progress";
import Request from './Request.jsx'

export default function App (props) {
  const { title, isOfficeInitialized } = props;

  if (!isOfficeInitialized) {
    return (
      <Progress title={title} logo="https://i.imgur.com/40YzO0g.png" message="Please sideload your addin to see app body." />
    );
  }

  return (
    <div className="ms-welcome">
      <Header logo="https://i.imgur.com/40YzO0g.png" title={props.title} message="M+M ROLO Request" />
      <Request />
    </div>
  );
}
