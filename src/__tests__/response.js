import { getResponse } from '../utils/api';

describe('Check getResponse func', () => {
  test('Should be successful response', () => {
    const testResponse = {
      ok: true,
      json: () => ({ result: 'OK' })
    }

    const result = getResponse(testResponse)

    expect(result).toEqual({ result: 'OK' })
  })

  test('Should be response with error', () => {
    const testResponse = {
      ok: false,
      status: 400,
    }

    const result = getResponse(testResponse)

    return expect(result).rejects.toBe('Ошибка: 400')
  })
})
