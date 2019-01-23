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

test('correct format file field', () => {
  const schema = {
    type: 'file',    
  }
  const value = [new File(["test file"], "text.txt")]
  const meta = [
    'filename',
    'size',
    'last_modified',
    'mime_type',
    'content',
  ]
  return getFieldValue(schema, value). then( result => {
    meta.map(item => expect(result).toHaveProperty(item))
  })
})

test('correct read file as raw', () => {
  const schema = {
    type: 'file',
    readAs: FILE_FIELD.READ_AS.RAW
  }
  const value = [new File(["test file"], "text.txt")]
  return getFieldValue(schema, value). then( result => {
    expect(result).toEqual(value[0])
  })
})

test('correct read file as arrayBuffer', () => {
  const schema = {
    type: 'file',
    readAs: FILE_FIELD.READ_AS.ARRAY_BUFFER
  }
  const value = [new File(["test file"], "text.txt")]
  return getFieldValue(schema, value). then( result => {
    expect(result).toHaveProperty('content')
    expect(result.content instanceof ArrayBuffer).toBeTruthy()
  })
})

test('correct read file as binaryString', () => {
  const schema = {
    type: 'file',
    readAs: FILE_FIELD.READ_AS.BINARY_STRING
  }
  const value = [new File(["test file"], "text.txt")]
  return getFieldValue(schema, value). then( result => {
    expect(result).toHaveProperty('content')
    expect(typeof result.content).toEqual('string')
  })
})

test('correct read file as text', () => {
  const schema = {
    type: 'file',
    readAs: FILE_FIELD.READ_AS.TEXT
  }
  const value = [new File(["test file"], "text.txt")]
  return getFieldValue(schema, value). then( result => {
    expect(result).toHaveProperty('content')
    expect(typeof result.content).toEqual('string')
  })
})

test('correct read file as dataUrl', () => {
  const schema = {
    type: 'file',
    readAs: FILE_FIELD.READ_AS.DATA_URL
  }
  const value = [new File(["test file"], "text.txt")]
  return getFieldValue(schema, value). then( result => {
    expect(result).toHaveProperty('content')
    expect(typeof result.content).toEqual('string')
  })
})