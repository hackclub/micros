# Where the Microworlds Live

This is where the Microworlds served [here](https://www.github.com/hackclub/microworlds) are hosted. 

To create a new Microworld make a PR on this repo with a new folder containing your world.

That folder muse contain a `json` file with the same name as the folder which has the following information (with example links):

```
{
  "name": "file-name",
  "documentation": "https://micros.hackclub.dev/turtle/turtle-template.md",
  "template": "https://micros.hackclub.dev/turtle/turtle-template.js",
  "programAddress": "https://micros.hackclub.dev/turtle/example-turtle-program.js"
}
```

## Running Locally

To create your own Microworld you'll have to run a version of this repo locally. I reccommend npm [live-server](https://www.npmjs.com/package/live-server). You'll have to enable cors to use your local file on the hosted `microworlds.hackclub.dev`. For example: `microworlds.hackclub.dev?file=https://localhost:3000/example/example.json`.