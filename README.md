# Todo App example with SN7, React and Redux

[![Build status](https://img.shields.io/travis/SenseNet/sn-react-redux-todo-app.svg?style=flat)](https://travis-ci.org/SenseNet/sn-react-redux-todo-app)
[![Coverage](https://img.shields.io/codecov/c/github/SenseNet/sn-react-redux-todo-app.svg?style=flat)](https://codecov.io/gh/SenseNet/sn-react-redux-todo-app)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b09d599538fa49e9bb1cb92df4042ada)](https://www.codacy.com/app/herflis33/sn-react-redux-todo-app?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SenseNet/sn-react-redux-todo-app&amp;utm_campaign=Badge_Grade)
[![License](https://img.shields.io/github/license/SenseNet/sn-react-redux-todo-app.svg?style=flat)](https://github.com/SenseNet/sn-client-js/LICENSE.txt)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat)](http://commitizen.github.io/cz-cli/)

This example is simple todo app built with React+Redux upon sensenet ECM which has been prepared to demonstrate how to use the new sensenet ECM related libraries [sn-client-js](https://github.com/SenseNet/sn-client-js)
and [sn-redux](https://github.com/SenseNet/sn-redux). The app and a steps of the related tutorial are based on two awesome Redux courses of Dan Abramov: 
[Getting Started with Redux](https://egghead.io/courses/getting-started-with-redux) and [Building React Applications with Idiomatic Redux](https://egghead.io/courses/building-react-applications-with-idiomatic-redux). 
These two courses are extremely helpful and essential, recommended for everyone who is interested in building scalable apps with [Redux](http://redux.js.org/).

## Quick start

```
$ git clone https://github.com/SenseNet/sn-react-redux-todo-app.git
$ cd sn-react-redux-todo-app
$ npm install
$ npm start
```

## Settings

To use this example you'll need a sensenet ECM portal. To connect the app with the portal set your site's url as the app's siteUrl

```
import { SetSiteUrl } from 'sn-client-js';

SetSiteUrl('https://mysite.com');
```

Go to your portal's Portal.setting (/Root/System/Settings/Portal.settings) and check the allowed origins. To get the app working you have to add the app's domain as an allowed origin so that the app can send requests to the 
portal and get or set data.

```
{
   AllowedOriginDomains: [ "localhost:13505" ]
}
```

For further information about CORS in sensenet ECM check [this](http://wiki.sensenet.com/Cross-origin_resource_sharing) article.

The example app uses one of the built-in TaskList Content in the default sensenet ECM install (/workspaces/Project/budapestprojectworkspace/Tasks). If you removed this Content and its children tasks earlier
or want to try with another TaskList change the value of the ```url``` variable in ```VisibleTodoList.tsx``` and ```AddTodo.tsx``` to the chosen list's path.

The example app demonstrates not only how to fetching data but also Content creation and delete. The app doesn't provide authentication because of it's simplicity so you have to make some permission changes
in your sensenet ECM portal to let Visitor users adding and removing tasks from the chosen parent list.
If you are not familiar with sensenet ECM's permission system check the following wiki articles:
* [sensenet ECM Permission System](http://wiki.sensenet.com/Permission_System)
* [How to set permissions on a content in sensenet ECM](http://wiki.sensenet.com/How_to_set_permissions_on_a_content)

## Deploy

To make trying out the app quick and simple there's a gulpfile added to the repository with all of the required tasks.

To build the project run

```
gulp build
```

It will transpile the .ts and .tsx files to JavaScript and copy them along with the sourcemaps to the dist folder.

To run the tests and create a coverage report run

```
gulp test
```

To create a bundle.js with all the required modules run
```
gulp bundle
```
It uses Browserify to bundle the JavaScript modules into on file and place it to the 'dist' folder.

If you want to run all the gulp tasks at once use simply the ```gulp``` command.

## Related documents

* [sn-client-js API reference](http://www.sensenet.com/documentation/sn-client-js/index.html)
* [sn-redux API reference](http://www.sensenet.com/documentation/sn-redux/index.html)
* [Redux](https://github.com/reactjs/redux)
* [Getting Started with Redux](https://egghead.io/courses/getting-started-with-redux)
* [Building React Applications with Idiomatic Redux](https://egghead.io/courses/building-react-applications-with-idiomatic-redux)
