import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

class Grid extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onLayout = e => {
    if (!e.nativeEvent || !e.nativeEvent.layout) return;
    const {minWidth} = this.props;
    const width = e.nativeEvent.layout.width;
    const count = Math.floor(width / minWidth);
    this.setState({itemWidth: width / count, count});
  };

  render() {
    const {data, render} = this.props;
    const {itemWidth, count} = this.state;

    if (!itemWidth) return <View style={styles.root} onLayout={this.onLayout} />;

    const rows = Array.apply(null, {length: Math.ceil(data.length / count)});
    const cols = Array.apply(null, {length: count});

    return (
      <View style={styles.root} onLayout={this.onLayout}>
        {rows.map((x, row) => (
          <View key={row} style={styles.row}>
            {cols.map((xx, col) => {
              const i = data[row * count + col];
              if (!i) return null;
              return (
                <View key={i.id} style={{width: itemWidth}}>
                  {render(i, itemWidth)}
                </View>
              );
            })}
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
  },
});
export default Grid;
