import React, { Component } from 'react';
import { SketchPicker } from 'react-color'; // https://casesandberg.github.io/react-color/
import { ColorItem, ItemContainer } from 'components';
import { history } from 'helper/history';
import 'pages/Palettes.css';
import 'pages/PaletteCreate.css';

class PaletteCreate extends Component {
  state = {
    active: 3
    ,activeColor: {hex: 'FFFFFF'}
    ,classNames: ['c4', 'c3', 'c2', 'c1']
    ,palette: {
      items: [
        { type: 'COLOR', content: {hex: 'AAAAAA'} }
        ,{ type: 'COLOR', content: {hex: 'BBBBBB'} }
        ,{ type: 'COLOR', content: {hex: 'CCCCCC'} }
        ,{ type: 'COLOR', content: {hex: 'DDDDDD'} }
      ]
    }
  };
  getColorItems() {
    const { palette, classNames } = this.state;
    return palette.items.map(
      (item, index) => {return (
        <ColorItem
          key={index}
          id={index}
          className={classNames[index]}
          colorItem={item}
          handleClick={this.handleItemClick}
        />
      )}
    );
  }
  handleItemClick = (key) => {
    let activeItem = this.state.palette.items.filter((item, index) => index === key);
        activeItem = activeItem.length > 0 ? activeItem[0].content : {hex: 'FFFFFF'};
    this.setState({
      active: key
      ,activeColor: activeItem
    });
  };
  handleColorPickerChange = (color) => {
    const { active, palette } = this.state;
    const colorHex = color.hex.replace('#', '');
    this.setState({
      activeColor: colorHex
      ,palette: {
        items: palette.items.map((item, index) => {
          return active === index ? { ...item, content: { hex: colorHex } } : item
        })
      }
    });
  }
  submitPalette = () => {
    history.push('/palette/1');
  };
  render () {
    const items = this.getColorItems();
    const { activeColor } = this.state;
    return (
      <center>
        <h1>Create Palette</h1>
        <form>
          <div className="item">
            <ItemContainer items={items} classNames={'canvas'}/>
          </div>
          <div>
            <button
              type="button"
              className="button suggest-button"
              onClick={this.submitPalette}>
              Done
            </button>
          </div>
        </form>
        <SketchPicker
          className="sp-container"
          disableAlpha={true}
          color={activeColor}
          onChange={this.handleColorPickerChange}
        />
      </center>
    );
  }
}

export default PaletteCreate;