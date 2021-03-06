'use strict'

import * as U from '../src/string'

test('byteSize', () => {
  let s = U.byteSize('日')
  expect(s).toBe(3)
  s = U.byteSize('12')
  expect(s).toBe(2)
  s = U.byteSize('hello')
  expect(s).toBe(5)
})

test('reverseString', () => {
  let s = U.reverseString('hello!')
  expect(s).toBe('!olleh')
})

test('stringifyURL', () => {
  let s = U.stringifyURL('https://www.google.com/', {name: 'john', age: 30})
  expect(s).toBe('https://www.google.com/?name=john&age=30')
})

test('parseURL', () => {
  let s = U.parseURL('http://url.com/page?name=Adam&surname=Smith')
  expect(s).toEqual({name: 'Adam', surname: 'Smith'})
  s = U.parseURL('https://www.google.com/')
  expect(s).toEqual({})
})

test('removeHTML', () => {
  let s = U.removeHTML('<p>这是<em>一个</em>段落。</p>')
  expect(s).toBe('这是一个段落。')
})

test('escapeHTML', () => {
  let s = U.escapeHTML('<a href="#">you & me</a>')
  expect(s).toBe('&lt;a href=&quot;#&quot;&gt;you &amp; me&lt;/a&gt;')
})

test('unescapeHTML', () => {
  let s = U.unescapeHTML('&lt;a href=&quot;#&quot;&gt;you &amp; me&lt;/a&gt;')
  expect(s).toBe('<a href="#">you & me</a>')
})

test('mask', () => {
  let s = U.mask(123456789)
  expect(s).toBe('*********')
  s = U.mask(123456789, 3)
  expect(s).toBe('123******')
  s = U.mask(123456789, 0, 4)
  expect(s).toBe('*****6789')
  s = U.mask(123456789, 3, 4)
  expect(s).toBe('123**6789')
  s = U.mask(123456789, 3, 4, '&')
  expect(s).toBe('123&&6789')
  s = U.mask(123456789, 5, 6)
  expect(s).toBe('123456789')
  s = U.mask('123456789', 0, 0, '&')
  expect(s).toBe('&&&&&&&&&')
})