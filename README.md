# gridbeam.xyz

a landing page for [GridBeam](http://gridbeam.com)

_work in progress_

## Attributions

- [Share by Aneeque Ahmed from the Noun Project](https://thenounproject.com/search/?q=share&i=836290)
- [Recycle By Vincent Lynch from the Noun Project](https://thenounproject.com/search/?q=re-usable&i=3863#)
- [flexible by AdbA Icons ❤️ from the Noun Project](https://thenounproject.com/search/?q=flexible&i=1325439)
- [Playground by Made by Made from the Noun Project](https://thenounproject.com/term/playground/1306940/)
- [Tree by Phoenix group from the Noun Project](https://thenounproject.com/search/?q=tree&i=2818312)
- [life by Adrien Coquet from the Noun Project](https://thenounproject.com/search/?q=life&i=1033605)

## Misc

### How to remove offline service worker

In browser console:

```js
navigator.serviceWorker.getRegistrations().then(registrations => {
  for (let registration of registrations) {
    registration.unregister()
  }
})
```
