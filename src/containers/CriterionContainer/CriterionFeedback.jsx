import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form } from '@edx/paragon';

import { feedbackRequirement } from 'data/services/lms/constants';
import actions from 'data/actions';
import selectors from 'data/selectors';

/**
 * <CriterionFeedback />
 */
export class CriterionFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.setValue({
      value: event.target.value,
      orderNum: this.props.orderNum,
    });
  }

  render() {
    const { config, isGrading, value } = this.props;
    if (config === feedbackRequirement.disabled) {
      return null;
    }
    return (
      <Form.Control
        as="input"
        className="criterion-feedback feedback-input"
        floatingLabel={isGrading ? 'Add comments' : 'Comments'}
        value={value}
        onChange={this.onChange}
        disabled={!isGrading}
      />
    );
  }
}

CriterionFeedback.defaultProps = {
  value: '',
};

CriterionFeedback.propTypes = {
  orderNum: PropTypes.number.isRequired,
  isGrading: PropTypes.bool.isRequired,
  // redux
  config: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export const mapStateToProps = (state, { orderNum }) => ({
  config: selectors.app.rubric.criterionFeedbackConfig(state, { orderNum }),
  value: selectors.grading.selected.criterionFeedback(state, { orderNum }),
});

export const mapDispatchToProps = {
  setValue: actions.grading.setCriterionFeedback,
};

export default connect(mapStateToProps, mapDispatchToProps)(CriterionFeedback);