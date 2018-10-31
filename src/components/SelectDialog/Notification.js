import React from 'react'
import { ListItem } from 'material-ui/List'

import { formatString } from '../../utils.js'

const Notification = ({ totalCount, itemsCount }) => {
  if (itemsCount == 0) {
    return (
      <ListItem
        key='has_more'
        secondaryText='По заданному фильтру ничего не найдено'
        disabled={true}
      />
    )
  } else if (itemsCount < totalCount) {
    return (
      <ListItem
        key='has_more'
        secondaryText={formatString('Показаны первые {1} элементов из {2}', itemsCount, totalCount)}
        disabled={true}
      />
    )
  } else {
    return (
      <ListItem key='has_more'
        secondaryText={formatString('Найдено {1} элементов', itemsCount) }
        disabled={true}
      />
    )
  }
}

export default Notification
