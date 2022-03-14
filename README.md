# Where the Microworlds Live

This is where the Microworlds live. Microworlds end up getting hosted
[here](https://www.github.com/hackclub/microworlds).

To create a new Microworld, make a Pull Request on this repository with a new
folder containing your world.

Your new Microworld folder must contain a `JSON` file with the same name as the
folder. That `JSON` file must contain the following information (linking to your
new Microworld files):

```
{
  "name": "example",
  "documentation": "https://micros.hackclub.dev/example/example-template.md",
  "template": "https://micros.hackclub.dev/example/example-template.js",
  "programAddress": "https://micros.hackclub.dev/example/example-program.js"
}
```

## Running Locally

1. Clone this repository
   - `git clone https://github.com/hackclub/micros.git && cd micros`
1. Install `live-server` to handle CORS
   - `npm install -g live-server`
1. Run server
   - `live-server --cors`
1. View the example Microworld
   - `open https://microworlds.hackclub.dev/?file=http://127.0.0.1:8080/example/test.json`
