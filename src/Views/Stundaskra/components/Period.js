import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback, LayoutAnimation} from 'react-native';

import {timeFormatter} from '../../../Helpers/formatters';

class Period extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    };
  }

  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  render() {
    const {period} = this.props;
    const {expanded} = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => this.setState({expanded: !expanded})}>
        <View style={styles.root}>
          <View style={styles.period}>
            <Text style={styles.periodTitle}>{period.title}</Text>
            <Text style={styles.periodTime}>
              {timeFormatter(period.startTime)} – {timeFormatter(period.endTime)}
            </Text>
          </View>
          {expanded && (
            <View style={styles.expanded}>
              <View style={styles.detail}>
                <Text style={styles.detailContent}>{period.classroom}</Text>
                <Text style={styles.detailTitle}>Stofa</Text>
              </View>
              <View style={styles.detail}>
                <Text style={styles.detailContent}>{period.teacher}</Text>
                <Text style={styles.detailTitle}>Kennari</Text>
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 5,
    marginBottom: 15,
  },
  period: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  periodTitle: {
    fontWeight: '500',
  },
  periodTime: {
    color: 'rgb(147, 147, 147)',
  },
  expanded: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    borderTopColor: 'rgb(235, 235, 235)',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  detail: {
    alignItems: 'center',
  },
  detailContent: {
    fontSize: 14,
  },
  detailTitle: {
    fontSize: 11,
    color: 'rgb(147, 147, 147)',
  },
});
export default Period;
