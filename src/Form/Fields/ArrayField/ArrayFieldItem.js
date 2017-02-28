import React, { PropTypes } from 'react'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import RaisedButton from 'material-ui/RaisedButton';
import SaveIcon from 'material-ui/svg-icons/content/save'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

import Field from '../Field'

const ArrayFieldItem = ({ index, onRemove, items, name, title, value, required }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-end'
    }}
    >
    <div>
      <Field
        parentName={name}
        field={items}
        value={value}
      />
    </div>
    <div
      style={{
        marginLeft: '1rem'
      }}>
      <FloatingActionButton
        mini={true}
        primary={false}
        secondary={false}
        onClick={onRemove}
        style={{marginRight: '0.25rem'}}
        >
        <DeleteIcon/>
      </FloatingActionButton>
    </div>
  </div>
)

export default ArrayFieldItem
