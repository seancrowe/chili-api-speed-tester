
## 🤔Motivation
chili-api-speed-tester was designed in less than 10 hours to test the speed of API calls completing on different CHILI environments.

There is a lot of cleanup work to be done, as it was created very quickly. Therefore, keep an eye out for bugs 🐛. Hopefully one day it will be a beautiful tool to help in testing your CHILI instance.

## 📖 Usage
Download the zipped executable file in the release section to your computer.
Unzip, so you now have an executable file, and some probably some other text files.

### Configuration
Create a config file by running the command:
```bash
.\chili-api-speed-tester-win.exe --init
```
This will create a config-speed.json in the same location as the executable.
<br/>
Now open the config-speed.json file, and you will find a example JSON config.
```
{
    "apiTests": [
        {
            "baseUrl": "http://dev1.chili-publish.com/chili/",
            "username": "name",
            "password": "1234",
            "environment": "admin",
            "documentIds": [
                "94267ab1-6d04-422b-941b-5bdec37b5e58"
            ]
        }
    ]
}
```
<br/>
These values are just for example. You need to change them to the real values.

- baseUrl - the base URL which all REST requests begin for your CHILI instance. You will know this is the correct URL if you can add a version.xml to the end and get back an XML of the current CHILI version.
  Like: ``http://dev1.chili-publish.com/chili/version.xml``
- username - the username of the CHILI user which you wish to run the API tests. It is strongly suggested this user in an Environmental Administrator.
- password - the password for the user in "username" property
- environment - the environment for the user in the "username" property
- documentIds - an array of CHILI document IDs you wish to test against. These documents must exist in the same environment as the user in the "username" property

<br/>
If you would like test multiple servers, you can just add another object to the "apiTest" array property.

```
{
    "apiTests": [
        {
            "baseUrl": "http://dev1.chili-publish.com/chili/",
            "username": "name",
            "password": "1234",
            "environment": "admin",
            "documentIds": [
                "94267ab1-6d04-422b-941b-5bdec37b5e58"
            ]
        },
        {
            "baseUrl": "http://dev2.chili-publish.com/chili/",
            "username": "name2",
            "password": "5678",
            "environment": "test2",
            "documentIds": [
                "f1e49112-ae24-42cd-a01a-89d3a7fe7190"
            ]
        }
    ]
}
```

**Document Load**
If you wish to test the document loading in the Editor, you can do this by setting a property called "chromeExecutablePath" with an absolute path to your chrome executable.
```
{
    "apiTests": [
        {
            "baseUrl": "http://dev1.chili-publish.com/chili/",
            "username": "name",
            "password": "1234",
            "environment": "admin",
            "documentIds": [
                "94267ab1-6d04-422b-941b-5bdec37b5e58"
            ]
        }
    ],
    "chromeExecutablePath": "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
}
```
With this path set, each document will be opened in an Editor in a headless Chrome instance (no GUI) and the time will be tracked for Document Fully Rendered to be raised in the console.
<br/>
*Note: that these loading times will always be faster than user experience due to Document Fully Rendered being fired even before the document is considered usable.*

### Run Tests
One the configuration file is setup, you can run the tests by executing the executable with the "-c" flag set to the location of your config file you created above.
```bash
.\chili-api-speed-tester-win.exe -c "C:\Users\Sean\Documents\api-speed-check\tests\config-speed.json"
```
If everything in the config file was correct, the test will completely with no errors and the results can be found in executable directory in a folder "tests".
