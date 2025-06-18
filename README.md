# A Reddit Devvit wrapper for NostalgiaOS

See the original project here: [https://github.com/ianrandmckenzie/nostalgia_os](https://github.com/ianrandmckenzie/nostalgia_os)

## Basic Devvit CLI usage reminders

Deploy a version (from root directory):
```sh
devvit upload
```

Automatically build on test subreddit:
```sh
# remove 'boxsagetest' with your test subreddit
devvit playtest r/boxsagetest
```

## Things I'd like added before releasing to the public:

- [] Bunch 'o bug fixes
  * Padding is sufficient in a lot of views due to lo-fi filtering
  * "Apply" button height is messed up on System Settings app
  * Couple of CSP issues with the Watercolour app
  * Make a way to save watercolour files in the OS as an image and stop using alert/confirm for saving functionality
  * Make a way to load image files in watercolour
  * For Reddit-only, remove the "Export" button in watercolour
- [] Add some interesting content via txt and image files
- [] Add ability for people to add their on videos on Reddit/YT in TubeStream app
- [] Ability for users to add their own images/audio
  * via URL, stored to local browser via indexedDB
  * via upload, also stored via indexedDB
~~- [] Ability to "Download Hard Drive," creates zip of all their content~~ Reddit doesn't allow downloads.

## Things I'd like to add but is probably way too much work:
- [] Mail app: Either make it work with other Reddit users, or maybe some kind of LLM integration?
