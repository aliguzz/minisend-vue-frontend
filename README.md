# MiniSend

MiniSend vuejs / cordova App

The app section is built on vuejs, and it sends API calls to the backend built with Laravel and it provides us the full detail about sending, searching, and listing emails.

## Project setup
```
git clone https://github.com/aliguzz/minisend-vue-frontend.git
```

### Install Node / npm (Mac)
```
brew update
brew install node

Test Node. To see if Node is installed, type node -v in Terminal. This should print the version number so you’ll see something like this v0.10.31.
Test NPM. To see if NPM is installed, type npm -v in Terminal. This should print the version number so you’ll see something like this 1.4.27
```
### Install Node / npm (Windows)

Download exe file and install for link below [Node installer](https://www.npmjs.com/get-npm/).


### install Vue/cordova cli
* Vuejs
```
npm install -g @vue/cli
vue --version
```
* Cordova
```
npm install -g cordova
cordova -v
```

### Compile Project
###### open terminal cd to project root directory and type
```
npm install
npm run serve
```
![Compile success.](/images/screen1.png "Compile success.")

### Add platforms android/ios
###### open terminal goto project root directory and add platform if not already there
![Already there.](/images/screen2.png "Already there.")
```
cd src-cordova
cordova platform add ios
cordova platform add android
```


### Build IOS App
###### open terminal cd to project root directory and type
```
npm run cordova-build-ios
```
it'll generate xcode project in /project-root/src-cordova/platforms/ios/
open project in xcode using "VAPPS.xcworkspace" file

* Build & Run
* Test
* Build Archive
* Upload to Apple Store


### Build Android App
###### open terminal cd to project root directory and type
```
npm run cordova-build-android
```
it'll generate android project in /project-root/src-cordova/platforms/android/
open project in android studio
 
* Build & Run
* Test
* Generate signed Bundle/Apk
* Upload to playstore
