export default function removeFieldFromState([name], { formState: { values }}) {
    deletePropertyPath(values, name)
}

function deletePropertyPath (obj, path) {
    if (!obj || !path) {
      return;
    }
  
    if (typeof path === 'string') {
      path = path.split('.');
    }
  
    for (var i = 0; i < path.length - 1; i++) {
  
      obj = obj[path[i]];
  
      if (typeof obj === 'undefined') {
        return;
      }
    }
  
    delete obj[path.pop()];
  }