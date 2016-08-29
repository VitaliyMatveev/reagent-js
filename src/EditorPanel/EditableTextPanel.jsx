import React, { PropTypes } from 'react'

import EditorPanel    from './EditorPanel.jsx'
import Editor         from '../Editor/Editor.jsx'
import PanelWithHTML  from '../Panel/PanelWithHTML.jsx'
import TextInput      from '../Input/TextInput.jsx'

export default function EditableTextPanel({ value, name, onSave, hasHtml }){
  let editor
  if(hasHtml){
    editor=(
      <Editor
        hasHtml={ true }
        name={ name }
        value={ value || ''}
        ref={ (c) => { if(c){ c.focus() }}}
      />
    )
  }else{
    editor=<TextInput name={name} value={value} focused={ true }/>
  }
  return (
    <EditorPanel
      content={ <PanelWithHTML value={ value }/> }
      onSave={ (form) => { onSave({[name]: form.elements[name].value}) } }
      editor={ editor }
    />
  )
}

EditableTextPanel.propTypes={
  name: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  value: PropTypes.string
}
