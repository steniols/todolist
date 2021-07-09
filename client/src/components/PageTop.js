import React from 'react';

class PageTop extends React.Component {
  render() {
    return (
      <div className="page-top">
        <div className="page-top__title">
          <h2 data-cy="page-top-title">{this.props.title}</h2>
          <p>{this.props.desc}</p>
        </div>
        <div className="page-top__aside">{this.props.children}</div>
      </div>
    );
  }
}

export default PageTop;
