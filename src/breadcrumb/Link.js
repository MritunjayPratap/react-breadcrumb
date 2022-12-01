import React, { Component } from "react";
import PropTypes from "prop-types";
class Link extends Component {
  // eslint-disable-next-line react/static-property-placement

  handleClick = (event) => {
    console.log(this.props.to);
    const { externalLink, onClick, to, type } = this.props;
    if (onClick) onClick(to);
    if (!externalLink) {
      // if (to) Router.pushRoute(to);
    } else {
      window.open(to, "_blank");
    }
  };

  handleKeyPress = (event) => {
    if (event.keyCode === 13) this.handleClick();
  };

  render() {
    const { children, className, style } = this.props;
    return (
      <div
        role="button"
        onClick={this.handleClick}
        onKeyUp={this.handleKeyPress}
        tabIndex={0}
        className={`cursor-pointer ${className}`}
        aria-pressed="false"
        style={style}
      >
        {children}
      </div>
    );
  }
  static propTypes = {
    externalLink: PropTypes.bool,
    type: PropTypes.string,
    to: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func
  };

  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    type: "navigation"
  };
}

export default Link;
