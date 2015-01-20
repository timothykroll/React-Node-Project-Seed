// Returns a React component consisting of an empty div
// with the class name passed in

var React = require('react/addons');

function mockComponent(componentClass) {
  return React.createClass({
    getInitialState: function() {
      return { testing: true }
    },
    render: function() {
      return (
        <div className={componentClass} />
      );
    }
  });
}

module.exports = mockComponent;