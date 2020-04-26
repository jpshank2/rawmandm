import * as React from "react";

export default class Header extends React.Component {
  render() {
    const { title, logo, message } = this.props;

    return (
      <section className="ms-welcome__header ms-u-fadeIn500">
        <img width="225" height="177" src={logo} alt={title} title={title} />
        <h1 className="ms-fontSize-xxl ms-fontWeight-light ms-fontColor-neutralPrimary" style={{textAlign: 'center'}}>{message}</h1>
      </section>
    );
  }
}