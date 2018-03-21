# Sky Betting & Gaming Technical Test

Old README can be found [here](__README.md).


## Installing

yarn/npm can be used, but I prefer yarn

```
yarn install
```

To fire up the local server just run:

```
yarn dev
```


## Testing

```
yarn test
```


## Notes

### Server
I used Node for the server-side API. This has been my preferred technology recently due to its speed and simplicity. It also seems to scale well as projects grow.

### Client
I used React for the client app for many of the same reasons, it's fast and scales really well.

I implemented redux as it is very quick to setup and forces some separation of concerns. Despite the small scale of this project I generally like to redux as it helps prepare for any additional complexity in the future.

I also used Bootstrap and very minimal styling so I could prototype the UI quicker. Ive kept the aesthetic work to a minimum and focused more on adding a few small details to improve UX ( faded/disabled loading states, disabled buttons when invalid input, feedback notifications ).


#### A couple more notes
* There's a 500ms timeout on the HTTP requests in the client app. This is just to show consideration for async events and simulate slower response times.
* I decided to use a PATCH people/:id route rather than a PATCH people route to follow standard REST api practices a little better. This does go slightly against the UI in the example [markup.html](markup.html) so I hope this isn't too much of an issue.
