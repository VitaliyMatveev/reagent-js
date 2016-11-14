import React, { PropTypes } from 'react'
import {default as UUID} from "node-uuid";

import FloatingActionButton from 'material-ui/FloatingActionButton'
import RaisedButton from 'material-ui/RaisedButton';
import RemoveIcon from 'material-ui/svg-icons/content/remove'

import Field from '../Field'

const ArrayFieldItem = ({ index, handleRemoveComponent, items, name, title, value, required }) => (
  <div>
    <RaisedButton
      key={`remove-${UUID.v4()}`}
      type='button'
      icon={<RemoveIcon/>}
      secondary={true}
      onClick={(e) => handleRemoveComponent(index)}
      style={{marginRight: '0.25rem'}}
    />
    <div>
      {
      Object.keys (items).map (fieldName => (
        <Field
          key={`field-${UUID.v4()}`}
          parentName={name}
          name={fieldName}
          value={value[fieldName]}
          field={{
            ...items[fieldName]
          }}
          required={required && required.indexOf(fieldName) > -1}
        />
      ))
    }
    </div>
  </div>
)

export default ArrayFieldItem
