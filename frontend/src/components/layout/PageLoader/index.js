import classNames from 'classnames';
import React from 'react';


const PageLoader = ({active}) => (
  <div className={classNames({
    "pageloader": true,
    "is-active": active,
  })}>
    <span className="title">Loading</span>
  </div>
);


export {
  PageLoader,
}
