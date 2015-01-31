var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var rewire = require('rewire');
var rewireModule = require('../../../../test/helpers/rewire-module');

describe('TodoForm', function() {
  var TodoForm = rewire('./todo-form.jsx');
  var todoForm;
  var addTodoSpy = sinon.spy();

  rewireModule(TodoForm, {
    'AppActions.addTodo': addTodoSpy,
  });

  beforeEach(function() {
    todoForm = TestUtils.renderIntoDocument(
      <TodoForm />
    );
  });

  it('renders', function() {
    var component = TestUtils.findRenderedDOMComponentWithClass(
      todoForm, 'todoForm'
    );

    expect(component).to.exist();
  });

  it('updates the name field when changed', function() {
    var field = TestUtils.scryRenderedDOMComponentsWithTag(
       todoForm, 'input'
    )[0];

    TestUtils.Simulate.change(field, { target: { value: 'foo' } });

    expect(field.getDOMNode().value).to.equal('foo');
  });

  describe('submitting a new todo', function() {
    var form;

    beforeEach(function() {
      var form = TestUtils.findRenderedDOMComponentWithTag(
        todoForm, 'form'
      );

      todoForm.setState({ name: 'bar' });

      TestUtils.Simulate.submit(form);
    });

    it('calls the update todo action on submit', function() {

      expect(addTodoSpy).to.have.been.calledWith({ name: 'bar', completed: false });
    });

    it('resets the name field to empty on submit', function() {
      var field = TestUtils.scryRenderedDOMComponentsWithTag(
         todoForm, 'input'
      )[0];

      expect(field.getDOMNode().value).to.equal('');
    })
  })
});