import React, { PureComponent } from 'react'
import { any, func, string, number } from 'prop-types'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete_outline'

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

export default class ArrayFieldItem extends PureComponent {
  static propTypes = {
    onDelete: func,
    name: string,
    index: number,
    items: any,
  }

  handleDelete = () => {
    const { onDelete, index } = this.props
    onDelete(index)
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
