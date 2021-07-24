# React Project Bolierplate

## Index
- [Features](#features)
- [Directory Structure](#directory-structure)
- [Preparation](#preparation)
- [How to use](#how-to-use)
- [Update Log](#update-log)
- [Appendix](#appendix)

<a name="features"></a>
## Features
- React Hooks based
- Redux
    - `redux-thunk`
- React Router
- Sass supported
- Image Loading
- Code Splitting
    - Create a Component, `import` it in `/pages/index.js` using `withSplitting()`
- Environment Variables
- Webpack Dev Server
- Storybook for React
- Github Page Deployment
- Other optimizations for build

<a name="directory-structure"></a>
## Directory Structure

### `public`
- `index.html` for initial entry point to users
- `/assets` for all static resources used in this web page

### `src`
- `/components` for presentational unit components
    - `/base` for large components
    - `/common` for minimal component unit
        - `Component.js`
        - `Component.css`
        - `Component.stories.js`
        - `Component.test.js`
        - `index.js`
- `/containers` for container components
- `/pages` for page per each routings
    - `/common` for functional pages
    - All routings indexed in `App.js`
    - Code Splitting enabled
- `/utils` for utility functions
- `/redux` for redux store and reducers settings
    - Provided in Ducks pattern using Redux Toolkit
- `/config` for environment variables setting and Webpack config files
    - Put your `.env` file in `/config/env` directory

<a name="preparation"></a>
## Preparation
1. Run `npm install` to provide required npm modules
2. (Optional) Go to `/config/env` and make `.env` file for your project

### `.env`
You can inject your custom environment variables in your project.

The `.env` file should be located in `/config/env` directory.

The project will inject `{ __NOT_USED__: undefined }` environment variable object as a default. You don't necessarily have to use `.env` file.

<a name="how-to-use"></a>
## How to use

### How to build
1. Run `npm run build`
2. Use a build output from `/build` directory

### How to run `webpack-dev-server`
1. Run `npm run dev`
2. Visit `http://localhost:3000` (Automatically opens)

### How to run **Storybook**
1. Run `npm run storybook`
2. Visit Storybook UI (Automatically opens)

### How to deploy via Github Page
1. Add following values in `.env` file (`/config/env/.env`):

```
# .env
# replace contents inside the angle brackets with your own
REPO_NAME=<GITHUB_REPOSITORY_NAME>
REPO_URL=https://<GITHUB_ID>.github.io/<GITHUB_REPOSITORY_NAME>
```

2. Run `npm run build:github`
3. Include the output `/docs` in the `master` branch of your project
4. `git push origin master`
5. Go to your repository page, navigate into [Settings → GitHub Pages → Source], and choose **`master branch /docs folder`**.

The resulting page will look like [this](https://cadenzah.github.io/boilerplate-react/).

<a name="update-log"></a>
## Update Log

### v2.0 (2021-7-25)
- Package version updates
    - Migrated to React Hooks
    - Migrated to Redux Toolkit
    - Fixed Storybook configurations
- Enabled React Hot Loader
- Changed code convention (indentation, semicolon)
- Changed directory structure
- Changed NPM scripts
- Changed usage for Github Page Deployment
- Temporarily disabled Storybook (waiting for [this issue](https://github.com/storybookjs/storybook/issues/14119) being fixed)

### v1.4.5 (2020-04-16)
- added explanation for 'Hosting on Github Pages'
- fixed typo

### v1.4.4 (2020-01-10)
- `webpack.config.js`
  - used `path` module consistently to support non-POSIX path

### v1.4.3 (2020-01-02)
- added support for multi-routing for Github Page Deployment
- added html templates for Github Page Deployment
- fixed typo and added modification in README.md

### v1.4.2 (2020-01-02)
- added Webpack config files
  - `webpack.config.dev.js` for development only
  - added HMR and Sourcemap options
- modified npm scripts along with new Webpack config files

### v1.4.1 (2020-01-02)
- added Github Page deployment script and settings
  - Currently for only a single routing page

### v1.4 (2020-01-01)
- added custom Environment Variables settings
  - added warning message if `.env` is not provided or empty when webpack builds
- separated Webpack config files in `/config` directory
- updated module (html-webpack-plugin)

### v1.3 (2019-12-27)
- added Sass support
  - added `webpack.config.js` for Storybook config 
- changed `.css` to `.scss`

### v1.2.3 (2019-12-11)
- added build option for production build

### v1.2.2 (2019-11-22)
- added `url-loader` and support for image loading from server's directory

### v1.2.1 (2019-11-21)
- added tips for using react-router's `withRouter()` HoC.

### v1.2 (2019-11-15)
- added `/templates` directory: general purpose template components
  - example: `<Article />` component
- bugfix when using `react-router` with `wds`
- added example for `react-router`
- added **Tips** section:
  - relevant tips

### v1.1 (2019-11-14)
- added comments with core logic explanations
- added `redux-thunk`, loaders for style
- added **Storybook** features

### v1.0.1 (2019-11-11)
- added `redux` basic sample codes
- changed directory structures

### v1.0.0 (2019-11-9)
Initial boilerplate checkout

<a name="appendix"></a>
## Appendix

### Table of Content
- [If you want to use images in pages](#appendix-images)
- [Tips for using React Router](#appendix-react-router)
- [Embedding Environment Variables](#appendix-env)
- [Hosting on Github Pages](#appendix-gh-pages)

<a name="appendix-images"></a>
### If you want to use images in pages

You can simply load static images which are uploaded in web server's directory by using specific URI indicating the resources.

```js
<img src="assets/images/BlueMountains.jpg" />
```

Files have to be located in `public/assets` directory, and the URI should include prefix of `assets/`. Subdirectories are able to customized. See `webpack.config.js` for more detailed configurations.

<a name="appendix-react-router"></a>
### Tips for using React Router

#### Webpack Dev Server

As Webpack Dev Server(WDS) does not serve `index.html` for routes except `/` as default config, we should set relevant configuration.

```js
// webpack.config.js
module.exports = {
  output: {
    publicPath: '/'
  },

  // ...
  devServer: {
    histroyApiFallback: true
  }
}
```

You should set `publicPath` property to `/`, so that the WDS can understand real root (/) even when you are on subroutes. [See this article](https://stackoverflow.com/a/50179280/9341051).

#### Storybook

If your component use `withRouter()` HoC and use relevant props within itself(i.e. `history.push()`), that component has to be wrapped with `<Router />`. You can use `<MemoryRouter />` to mock the routing environment.

```js
// Component.stories.js
import { MemoryRouter } from 'react-router'

storiesOf('MainButton', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .add('default', () => (
      <ComponentWithRouter />
    )
  )
```

<a name="appendix-env"></a>
### Embedding Environment Variables

(To be added)

<a name="appendix-gh-pages"></a>
### Hosting on Github Pages
When it comes to hosting React application with [React Router](https://reacttraining.com/react-router/) on Github Page, 2 issues have to be handled:

#### 1. Should always return `index.html` back to client requests
If all routing requests are handled on the client side by your React application, your React hosting server has to return `index.html` file for all requests. Then your routing module(in this case, React Router) will render the corresponding page for the requested route path.

However, the Github Page's server is not particularly set for a React application, and a user cannot customize the server's settings. If the application requests for a path which does not have corresponding page in the project directory, the server will return plain `404.html` page, making your React Router useless.

Luckilly, there is already [a good solution for this issue](https://github.com/rafrex/spa-github-pages). To apply this solution, we have to put some extra codes in `index.html` and `404.html`. You can check the assets used to generate HTML files in `public/gh-pages`, and bundling script in `config/webpack.config.gh-pages.js`.

#### 2. Inconsistency on public URL between React Router and Github Page's server
If you have a repository on Github and want to deploy your static web page via Github Page, the site will have a public URL like below:

```
<USERNAME>.github.io/<REPOSITORY_NAME>
```

This means the entry file for your web application will be served under the URL above which containes `/<REPOSITORY_NAME>` at back. Usually the URL slug after the first `/` have to be considered as a top-level route path, but that is not the case here. It is a part of the public URL.

On the other hand, React Router will recognize the React application's public URL like below:

```
<USERNAME>.github.io
```

This is because [React Router consider the application's public URL as its domain name as default](https://github.com/gitname/react-gh-pages/issues/3). When a request occurs under this setting, the application won't be able to gather static assets needed to render the page, nor route between internal pages.

To fix this, we can fix either the server or the client-side app, but we cannot touch the server, as I mentioned on issue #1. So I used [`basename` props](https://reacttraining.com/react-router/web/api/BrowserRouter/basename-string) and always put `/<REPOSITORY_NAME>` path in front of all the URLs generated by React Router.

```js
// example code
<BrowserRouter basename="/cadenzah" />
<Link to="/dev" /> // renders <a href="/calendar/dev">
```

Aside from URL routing, static assets served by your server - the bundled `.js` / `.css` files is requested by *relative path* in HTML files. Still, those files cannot be located properly, because [HTML assumes the site's **base URL(`document.baseURI`)** as `location.href` as default](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base), and use relative path with this setting.

Even though `location.href` changes each time routing occurs, **the location for the static assets does not change** because `location.href` is modified by *client-side script, not the server*, and the assets remains the same. As a result, we should set `document.baseURI` to the fixed value of the site's initial public URL so that our asset files can be located properly. Otherwise, [the assets needed to render the screen cannot be loaded and the screen will be blank](https://github.com/gitname/react-gh-pages/issues/3).

I added `<base>` tag to manage this issue. Webpack dynamically injects the base URL for our Github Page hosting URL when generating HTML files(`htmlWebpackPlugin.options` object).

```html
<!-- public/gh-pages/index.ejs -->
...
<% if (htmlWebpackPlugin.options.basename) { %>
    <base href="<%= htmlWebpackPlugin.options.basename %>"><%
  } %>
...
```

You can see the full code in `public/gh-pages/index.ejs` and `config/webpack.config.gh-pages.js`.
