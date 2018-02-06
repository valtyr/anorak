import React, {Component} from 'react';

import shallowEqual from 'shallow-equals';

export const withDebouncedProps = ({debounce = 0, propNames = []}) => WrappedComponent =>
  class WithDebouncedProps extends Component {
    static displayName = `withDebouncedProps(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    constructor(props) {
      super(props);
      this.state = this.generateNextState(props, {debouncing: false});
    }

    generateNextState(props, state) {
      return propNames.reduce(
        (nextState, propName) => ({
          ...nextState,
          [`${propName}Debounced`]: props[propName],
        }),
        state,
      );
    }

    componentWillReceiveProps(nextProps, prevProps) {
      if (shallowEqual(nextProps, prevProps)) {
        return;
      }

      clearTimeout(this.timeout);

      if (!this.state.debouncing) {
        this.setState({debouncing: true});
      }

      this.timeout = setTimeout(
        () =>
          this.setState({
            ...this.generateNextState(nextProps, this.state),
            debouncing: false,
          }),
        debounce,
      );
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
