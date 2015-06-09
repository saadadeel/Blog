# MoodPulse Front-End

## Development

If you just need the front-end and have installed all the node module dependencies, then just run
```grunt```
command from current folder and you will have front-end running on ```http://localhost:8000```.

## Deployment

If you need minified version of the front-end, you can use command ```grunt build```.
This one will run JSHint and Test before building front-end.

If you want to target specific API endpoint - add the environment to the build command: ```grunt build:_environment_```.
You can configure the target for any environment you will use within the `configure` task within `Grunfile.js`
