import React, { PropTypes } from 'react'
import './button.less'
import deleteIcon from './ic_delete_white_24px.svg'
import addIcon    from './ic_add_white_24px.svg'
import openIcon   from './ic_remove_red_eye_white_24px.svg'
import editIcon   from './ic_mode_edit_white_24px.svg'
import saveIcon   from './ic_save_white_24px.svg'
import closeIcon  from './ic_close_white_24px.svg'
import uploadIcon from './ic_file_upload_white_24px.svg'
import settingsIcon from './ic_settings_white_24px.svg'

export default function CircleButton({onClick, title, children, type='button', className}){
  return (
    <button
      type={ type }
      className={ `button button_circle ${className || ''}` }
      onClick={ onClick }
      title={ title }
      >
      { children }
    </button>
  )
}

export function DeleteButton({onClick}){
  return (
    <CircleButton onClick={ onClick } className='button_delete'>
      <img src={ deleteIcon } />
    </CircleButton>
  )
}
export function AddButton({onClick}){
  return (
    <CircleButton onClick={ onClick } className='button_primary'>
      <img src={ addIcon } />
    </CircleButton>
  )
}
export function OpenButton({onClick}){
  return (
    <CircleButton onClick={ onClick } className='button_primary'>
      <img src={ openIcon } />
    </CircleButton>
  )
}
export function EditButton({onClick}){
  return (
    <CircleButton onClick={ onClick } className='button_primary'>
      <img src={ editIcon } />
    </CircleButton>
  )
}
export function SaveButton({onClick, type}){
  return (
    <CircleButton onClick={ onClick} className='button_success' type={ type }>
      <img src={ saveIcon } />
    </CircleButton>
  )
}
export function CloseButton({onClick}){
  return (
    <CircleButton onClick={ onClick } className='button_danger'>
      <img src={ closeIcon } />
    </CircleButton>
  )
}
export function UploadButton({onClick}){
  return (
    <CircleButton onClick={ onClick } className='button_primary'>
      <img src={ uploadIcon } />
    </CircleButton>
  )
}
export function SettingsButton({onClick}) {
  return (
    <CircleButton onClick={ onClick } className='button_primary'>
      <img src={ settingsIcon } />
    </CircleButton>
  )
}
CircleButton.propTypes={
  onClick: PropTypes.func,
  children: PropTypes.node
}
