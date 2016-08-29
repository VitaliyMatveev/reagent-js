import React, { Component, PropTypes } from 'react'
import './contacts-block.less'
export default class ContactsBlock extends Component {
  render() {
    const contactsList = this.props.contacts.map((contact) => {
      if(contact.value){
        return (
          <li key={ contact.title }>
            <span>{ contact.title }</span>
            <span className='contacts-block__value'>{ contact.value}</span>
          </li>
        )
      }
    })
    return (
      <ul className='contacts-block'>
        { contactsList }
      </ul>
    )
  }
}

ContactsBlock.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.node
  })).isRequired
}
