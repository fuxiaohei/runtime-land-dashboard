# Runtime.land Dashboard

`Runtime.land Dashboard` is dashboard site for Runtime.land. It's built with React-Bootstrap and React-Router.

It must work with `land-center` binary in [Runtime-land](https://github.com/fuxiaohei/runtime-land).

## Usage

Run `land-center` first. It should run on `127.0.0.1:7901` by default.

```bash
# SET API_URL from land-center
export API_URL=http://127.0.0.1:7901
npm run start-self-host
```

Visit `http://localhost:8080` in your browser.

## ClerkJs Login

`Runtime.land Dashboard` use [ClerkJs](https://clerk.dev/) as login system. You need to create a ClerkJs account and set `CLERK_KEY` in environment variables.

```bash
export API_URL=http://127.0.0.1:7901
export CLERK_KEY=pk_test_xxxx
npm run start
```

*Project provides a test personal key for development. It will clean all data when I'm developing. Do test with your own key.*

## Docker

If you want to run `Runtime.land Dashboard` in Docker, you can set `DASH_API_URL` and `DASH_CLERK_KEY` environment variables to build your own image.

```bash
docker build -t runtime-land-dashboard --build-arg DASH_API_URL=http://your-center-api-url --build-arg DASH_CLERK_KEY=your-clerk-production-key .
```

## License

Apache-2.0
