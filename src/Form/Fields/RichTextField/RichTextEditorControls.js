import React, { PropTypes } from 'react'

// import FormatAlignLeft from 'material-ui/svg-icons/editor/format-align-left'
// import FormatAlignRight from 'material-ui/svg-icons/editor/format-align-right'
// import FormatAlignCenter from 'material-ui/svg-icons/editor/format-align-center'
// import FormatAlignJustify from 'material-ui/svg-icons/editor/format-align-justify'
import IconButton from 'material-ui/IconButton'

import FormatListBulleted from 'material-ui/svg-icons/editor/format-list-bulleted'
import FormatListNumbered from 'material-ui/svg-icons/editor/format-list-numbered'

import FormatBold from 'material-ui/svg-icons/editor/format-bold'
import FormatUnderlined from 'material-ui/svg-icons/editor/format-underlined'
import FormatItalic from 'material-ui/svg-icons/editor/format-italic'

import './style.css'

const StyleButton = ({onToggle, active, icon, title, style}) => {
  const iconStyle={
    fill: active ? '#e84b37' : 'currentcolor'
  }

  return (
    <IconButton
      iconStyle={iconStyle}
      onMouseDown={() => onToggle(style)}
      title={title}
      >
      {icon}
    </IconButton>
  )
}



export const BlockStyleControls = ({editorState, onToggle}) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className='c-rich-text-controls'>
      {BLOCK_TYPES.map((type, i) =>
        <StyleButton
          key={i}
          active={type.style === blockType}
          title={type.title}
          icon={type.icon}
          onToggle={onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

const BLOCK_TYPES = [
  {
    title: 'маркированный список',
    icon: <FormatListBulleted/>,
    style: 'unordered-list-item'
  },{
    title: 'нумерованный список',
    icon: <FormatListNumbered/>,
    style: 'ordered-list-item'
  // },{
  //   title: 'выравнивание по левому краю',
  //   icon: <FormatAlignLeft/>,
  //   style: 'align-left'
  // },{
  //   title: 'выравнивание по правому краю',
  //   icon: <FormatAlignRight/>,
  //   style: 'align-right'
  // },{
  //   title: 'выравнивание по центру',
  //   icon: <FormatAlignCenter/>,
  //   style: 'align-center'
  // },{
  //   title: 'выравнивание по ширине',
  //   icon: <FormatAlignJustify/>,
  //   style: 'align-justify'
  }
];

var INLINE_STYLES = [
  {
    title: 'полужирный',
    icon: <FormatBold/>,
    style: 'BOLD'
  },{
    title: 'курсив',
    icon: <FormatItalic/>,
    style: 'ITALIC'
  },{
    title: 'подчеркнутый',
    icon: <FormatUnderlined/>,
    style: 'UNDERLINE'
  }
];

export const InlineStyleControls = ({editorState, onToggle}) => {
  var currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div className='c-rich-text-controls'>
      {INLINE_STYLES.map((type, id) =>
        <StyleButton
          key={id}
          active={currentStyle.has(type.style)}
          title={type.title}
          icon={type.icon}
          onToggle={onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};
