# Voting platform frontend
Frontend component of the _distributed voting platform_ project, written in `TypeScript` with `SvelteKit` framework.  

Platform version: `v1.7.1`  
Platform URL: `https://infoportal.app`  
[![wakatime](https://wakatime.com/badge/user/0de36ae6-dd1e-4d00-8853-d28470cf395a/project/24c22e4e-0b1d-47d5-9a78-d307ccbf1162.svg)](https://wakatime.com/badge/user/0de36ae6-dd1e-4d00-8853-d28470cf395a/project/24c22e4e-0b1d-47d5-9a78-d307ccbf1162)  
[![wakatime](https://wakatime.com/badge/github/vexy/infoportal.svg)](https://wakatime.com/badge/github/vexy/infoportal)

## Base features
  - user registration
  - new users on-boarding instructions
  - search questions/poll
  - add new content
  - interact with content (vote for question options)

## Installation & run instructions
Make sure you have latest [NPM](https://www.npmjs.com/) installed.  
This project uses (minimums):
- node `v16.15`
- npm `v8.5.5`

As always, `git clone` this repo and `cd` into `infoportal` folder. Then, perform `npm install` and wait for installation to complete.

### Running development build
To run the frontend component in development mode, execute the following:
```bash
npm run dev
```
After transpile completes, you should see a project interface if you visit `localhost`, port `3000` or `5000` in your browser.  
Follow local console output for more details.

### Running production build
Current Svelte adapter is `adapter-node`. You can adjust `svelte.config.js` for your needs.  
To make production ready build, use:
```bash
npm run build  #wait for build to complete
```
After the build completes, you should see an output directory being created (`/build`) containing optimized version of the website.
Use it as a starting point in production environments. 

If you'd like to see a production ready bundle run:
```bash
npm run preview #preview production ready build
```
---  
Copyright © [Vexy](https://github.com/vexy), November 2021  
GPG: `E95AC467 2CB80301 05AD28E5 D9870441 7A92DE56`
