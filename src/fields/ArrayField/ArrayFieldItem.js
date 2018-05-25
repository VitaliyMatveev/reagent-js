import React, { PureComponent } from 'react'
import { shape, func, string, number } from 'prop-types'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

import Field from '../Field'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  actionPanel: {
    marginLeft: '1rem',
  },
  deleteBtn: {
    marginRight: '0.25rem',
  },
}

export class ArrayFieldItem extends PureComponent {
  static propTypes = {
    fields: shape({
      remove: func,
    }),
    name: string,
    index: number,
  }
  handleDelete = () => {
    const { fields, index } = this.props
    fields.remove(index)
  }

  render() {
    const { name, items } = this.props
    return (
      <div style={styles.root}>
        <div>
          <Field
            field={items}
            name={name}
          />
        </div>
        <div style={styles.actionPanel}>
          <FloatingActionButton
            mini={true}
            primary={false}
            secondary={false}
            onClick={this.handleDelete}
            style={styles.deleteBtn}
            >
            <DeleteIcon/>
          </FloatingActionButton>
        </div>
      </div>
    )
  }
}
