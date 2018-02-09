import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback, LayoutAnimation} from 'react-native';

import {timeFormatter} from '../../../Helpers/formatters';
import weekdays from '../../../Consts/weekdays';

const First = ({period}) => (
  <View style={[styles.root, {padding: 15}]}>
    <Text style={{fontSize: 20, fontWeight: '700', marginBottom: 5}}>{period.title}</Text>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={{fontWeight: '600'}}>
        {period.classroom} — {period.teacher}
      </Text>
      <Text style={{fontWeight: '600'}}>
        {timeFormatter(period.startTime)} – {timeFormatter(period.endTime)}
      </Text>
    </View>
  </View>
);

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
    const {period, lastPeriod, first} = this.props;
    const {expanded} = this.state;

    if (first) return <First period={period} />;

    return (
      <TouchableWithoutFeedback onPress={() => this.setState({expanded: !expanded})}>
        <View>
          {lastPeriod &&
            lastPeriod.weekday !== period.weekday && (
              <Text style={styles.separator}>{weekdays[period.weekday - 1].toUpperCase()}</Text>
            )}
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
    color: 'rgb(147, 147, 147)',
    fontWeight: '600',
  },
  periodTime: {
    color: 'rgb(147, 147, 147)',
    fontWeight: '600',
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
  separator: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontWeight: '700',
    fontStyle: 'italic',
    color: 'rgb(147, 147, 147)',
  },
});
export default Period;
