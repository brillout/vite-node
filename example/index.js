import { msg } from './msg'
console.log(msg)
console.log(import.meta.env)
const handles = process._getActiveHandles()
console.log(handles.length)
console.log(handles)
handles.forEach(handle => {
  const fn = handle?._handle?.onchange
  if(fn) {
    console.log(fn)
  }
})
