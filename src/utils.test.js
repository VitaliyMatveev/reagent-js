import { getFieldValue } from './utils'

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