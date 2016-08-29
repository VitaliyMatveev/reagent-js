import React, { PropTypes } from 'react'

export default function PanelWithHTML(props){
  return <p dangerouslySetInnerHTML={{ __html: props.value }} />
}
