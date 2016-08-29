import React from 'react'
import './grid.css'

export default function Grid(props){
  const { columns, proportions} = props
  let columnProportions = proportions.split('-')
  let content = columns.map((columnContent, i) =>
    {
      let columnSizeModificator = function(size){        
        switch(size){
          case '2': return 'medium'
          case '3': return 'large'
          default: return 'small'
        }
      }(columnProportions[i])
      return (
        <div key={ i } className={ `grid__column grid__column_${columnSizeModificator}`}>
          { columnContent }
        </div>
      )
    }
  )
  return (
    <div className='grid'>
      { content }
    </div>
  )
}
