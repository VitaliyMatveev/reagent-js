import React, { Component } from 'react'
import Popover from 'material-ui/Popover/Popover'
import TextField from 'material-ui/TextField'
import { formatFieldTitle } from '../../utils'

const KEY_CODE = {
  ESC: 13,
}

export default class SelectInput extends Component {
  state = {
    popupOpened: false,
  }

  handleKeyDown = event => {
    //console.log(event.keyCode)
    switch (event.keyCode) {
      case 38:
        this._openPopover()
        break;

      case 40:
        this._openPopover()
        break;
    }
  }

  handleSelectKeyDown = event => {
    if (event.keyCode == KEY_CODE.ESC) {
      event.preventDefault()
      this.handlePopoverClose()
    }
  }

  handlePopoverOpen = () => this.setState({ popupOpened: true })

  handlePopoverClose = () => this.setState({ popupOpened: false })

  handleClick = e => {
    this.setState({ popupOpened: false })
    this.props.input.onChange(e.target.value)
  }

  getSelectedItem = () => this.props.items.find(el => el.id == this.props.input.value) || {}

  render () {
    const { title, items, required, input: { value, onChange, onBlur, onFocus }, meta: { active } } = this.props
    return (
      <div className={`c-field ${value || active ? 'c-field_focused' : ''}`}>
        <TextField
          style={{marginTop: 0, cursor: 'pointer'}}
          floatingLabelText={formatFieldTitle(title, required)}
          required={required}
          value={this.getSelectedItem().title}
          id='variants'
          ref='textField'
          autoComplete={false}
          fullWidth={true}
          onClick={this.handlePopoverOpen}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={this.handleKeyDown}
        />
        <Popover
          anchorEl={this.refs.textField && this.refs.textField.input}
          anchorOrigin={{'horizontal':'left','vertical':'bottom'}}
          open={this.state.popupOpened}
          onRequestClose={this.handlePopoverClose}
          >
          <select
            className='c-select'
            style={{overflow: 'visible'}}
            size={items.length}
            value={this.getSelectedItem().id}
            onChange={onChange}
            onKeyDown={this.handleSelectKeyDown}
            onClick={this.handleClick}
            ref={e => e && this.state.popupOpened && e.focus()}
            >
            {
              items.map(item =>
                <option
                  className='c-select__item'
                  style={{padding:'1rem', cursor: 'pointer'}}
                  key={item.id}
                  value={item.id}
                  >
                  {item.title}
                </option>
              )
            }
          </select>
        </Popover>
      </div>
    )
  }
}
