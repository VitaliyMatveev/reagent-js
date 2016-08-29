import React, { PropTypes } from 'react'

export default function SubmitButton(props){
  const { disabled, title, buttonState, onClick } = props
  const { initialClassName, initialText, successClassName, successText, errorClassName, errorText } = props
  let buttonClass, buttonText
  switch(buttonState){
    case 'success':
      buttonClass = successClassName || 'btn-success'
      buttonText = successText || 'Cохранено'
      break;
    case 'processing':
      buttonClass = `${ initialClassName || 'btn-primary' } button-spiner`
      buttonText = null
      break;
    case 'error':
      buttonClass = errorClassName || 'btn-danger'
      buttonText = errorText || 'Ошибка'
      break;
    default:
      buttonClass = initialClassName || 'btn-primary'
      buttonText = initialText || 'Cохранить'
  }
  return (
    <button className={ `btn ${ buttonClass }` }
      disabled={ disabled }
      title={ title }
      onClick = { onClick }
    >
      { buttonText }
    </button>
  )
}

SubmitButton.propTypes = {
  buttonState: PropTypes.oneOf(
    ['initial', 'success', 'processing', 'error']
  ).isRequired,
  initialClassName: PropTypes.string,
  initialText: PropTypes.string,
  successClassName: PropTypes.string,
  successText: PropTypes.string,
  errorClassName: PropTypes.string,
  errorText: PropTypes.string
}
