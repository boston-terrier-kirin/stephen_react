import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends React.Component {
  renderError(meta) {
    const { error, touched } = meta;

    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  /**
   * this問題がまた発生。
   * this.renderErrorのthisがundefinedになっているので、renderInputをこのclassに所属させるため、アロー関数に変更する。
   */
  renderInput = (formProps) => {
    const { input, label, meta } = formProps;

    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        <div>{this.renderError(meta)}</div>
      </div>
    );
  };

  /**
   * これもthis問題。
   */
  onSubmit = (formValues) => {
    this.props.createStream(formValues);

    // 1. ここでStreamListに遷移してしまうと、createStreamの処理結果が分からないので困る。
    // 2. createStreamの中で遷移させたい。
    // 3. propsに入っているにhistoryをcreateStreamに渡すのが面倒。
    // 4. historyをどこからでもコントロールできるように、history.jsを作成。
    // 5. App.jsで、BrowserRouterの代わりに、Routerを使うようにして、historyの作り方を指定する。
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" label="Enter Title" component={this.renderInput} />
        <Field
          name="description"
          label="Enter Description"
          component={this.renderInput}
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

const formWrapped = reduxForm({
  form: 'streamCreate',
  validate,
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);
