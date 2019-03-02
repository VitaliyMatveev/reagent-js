import { getFieldValue } from './utils'
import { FILE_FIELD } from './constants';

test('result should contain', () => {
  const schema = {
    type: 'object',
    properties: {
      first: {
        type: 'string',
      },
      second: {
        type: 'file'
      }
    }
  }

  const value = {
    first: 'test first',
    second: [new Blob()]
  }
  return getFieldValue(schema, value).then(
    result => {
      expect(result).toHaveProperty('first', value.first)
      expect(result).toHaveProperty('second')
    }
  )
})


test('result should contain only one variant of oneOf', () => {
  const schema = {
    type: 'object',
    oneOfFieldName: 'variant',
    oneOf: [{
      type: 'object',
      id: 'first',
      properties: {
        first: {
          type: 'string'
        },
        third: {
          type: 'string'
        }
      }
    }, {
      type: 'object',
      id: 'second',
      properties: {
        second: {
          type: 'string'
        }
      }
    }]
  }

  const value = {
    variant: 'first',
    first: 'test first 2',
    third: 1,
    second: 'test second',
  }

  return getFieldValue(schema, value).then(
    result => {
      expect(result).toHaveProperty('first', value.first)
      expect(result).toHaveProperty('third', value.third)
      expect(result.second).toBeUndefined()
    }
  )
})

test('result should contain oneOf key field in result', () => {
  const schema = {
    type: 'object',
    oneOfFieldName: 'variant',
    oneOf: [{
      type: 'object',
      id: 'first',
      properties: {
        first: {
          type: 'string'
        },
        third: {
          type: 'string'
        }
      }
    }, {
      type: 'object',
      id: 'second',
      properties: {
        second: {
          type: 'string'
        }
      }
    }]
  }

  const value = {
    variant: 'first',
    first: 'test first 2',
    
  }

  return getFieldValue(schema, value).then(
    result => {
      expect(result).toHaveProperty('variant', value.variant)
    }
  )
})

test('result should contain all array items', () => {
  const schema = {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        first: {
          type: 'object',
          properties: {
            second: {
              type: 'string',
            }
          }
        }
      }
    },
  }

  const value = [{
    first: {
      second: 'one'
    }
  }, {
    first: {
      second: 'two'
    }
  }]

  return getFieldValue(schema, value).then(
    result => {
      expect(result).toHaveLength(2)
      expect(result[0]).toHaveProperty('first')
      expect(result[0].first).toHaveProperty('second', 'one')
    }
  )
})

/* FILE FIELD */
const value = [new File(["test file"], "text.txt")]
const schema = {
  type: 'file',    
}

test('correct format file field', () => {
  const meta = [
    'filename',
    'size',
    'last_modified',
    'mime_type',
    'content',
  ]
  return getFieldValue(schema, value). then( result => {
    expect(result).toHaveLength(1)
    meta.map(item => expect(result).toHaveProperty(`0.${item}`))
  })
})

test('correct read file as raw', () => {
  schema.readAs = FILE_FIELD.READ_AS.RAW
  return getFieldValue(schema, value). then( result => {
    expect(result[0]).toEqual(value[0])
  })
})

test('correct read file as arrayBuffer', () => {
  schema.readAs = FILE_FIELD.READ_AS.ARRAY_BUFFER
  
  return getFieldValue(schema, value). then( result => {
    expect(result).toHaveProperty('0.content')
    expect(result[0].content instanceof ArrayBuffer).toBeTruthy()
  })
})

test('correct read file as text', () => {
  schema.readAs = FILE_FIELD.READ_AS.TEXT

  return getFieldValue(schema, value). then( result => {
    expect(result).toHaveProperty('0.content')
    expect(typeof result[0].content).toEqual('string')
  })
})

test('correct read file as dataUrl', () => {
  schema.readAs = FILE_FIELD.READ_AS.DATA_URL
  
  return getFieldValue(schema, value). then( result => {
    expect(result).toHaveProperty('0.content')
    expect(typeof result[0].content).toEqual('string')
  })
})

test('should interrupt recursion if value undefined', () => {
  const schema = {
    type: 'object',
    properties: {
      first: {
        type: 'string'
      },
      second: {
        type: 'object',
        properties: {
          child: {
            type: 'string'
          }
        }
      }
    }
  }
  const value = {
    first: 'test'
  }
  return getFieldValue(schema, value).then(result => {
    expect(result).toHaveProperty('first', value.first)
  })
})

test('should forward value from field with type data to result object', () => {
  const schema = {
    type: 'object',
    properties: {
      first: {
        type: 'string'
      },
      second: {
        type: 'object',
        properties: {
          child: {
            type: 'data'
          }
        }
      }
    }
  }
  const value = { second: {child: '12345', undefinedChild: 54321 }}
  return getFieldValue(schema, value).then(result => {
    expect(result).toHaveProperty('second.child', value.second.child)
    expect(result).not.toHaveProperty('second.undefinedChild')
  })
})