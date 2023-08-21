/**
 * @type {import('@rspack/cli').Configuration}
 */

let apiUrl = (process.env.NODE_ENV === 'development') ? "http://api-dev.127-0-0-1.nip.io" : "https://center-api.runtime.land";
if (process.env.API_URL) {
  apiUrl = process.env.API_URL;
}

let clerkKey = "";
let useClerkJS = !!process.env.CLERK_JS;
if (useClerkJS) {
  clerkKey = (process.env.NODE_ENV === 'development') ? "pk_test_cGV0LW1vb3NlLTc1LmNsZXJrLmFjY291bnRzLmRldiQ" : "pk_live_Y2xlcmsucnVudGltZS5sYW5kJA";
  if (process.env.CLERK_KEY) {
    clerkKey = process.env.CLERK_KEY;
  }
}

console.log("API_URL:", apiUrl);
console.log("CLERK_KEY:", clerkKey)

module.exports = {
  context: __dirname,
  entry: {
    main: "./src/index.jsx",
  },
  output: {
    filename: "[name].[contenthash].bundle.js",
    publicPath: "/",
  },
  target: "web",
  builtins: {
    html: [
      {
        template: "./index.html",
        title: "Runtime.land | a tiny Function as a Service (FaaS) platform ",
        favicon: "./public/logo-v2-small.ico",
      },
    ],
    copy: {
      patterns: [
        {
          from: "public/**/*",
        },
      ],
    },
    define: {
      API_URL: "'" + apiUrl + "'",
      CLERK_KEY: "'" + clerkKey + "'",
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        test: /\.sass|.scss$/,
        use: [
          {
            loader: 'sass-loader',
            options: {
              // ...
            },
          },
        ],
        type: 'css',
      },
      {
        test: /\.png$/,
        type: "asset",
      },
      {
        test: /\.config.js/,
        type: "asset",
      },
    ],
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
};
