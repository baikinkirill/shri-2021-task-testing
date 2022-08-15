const path = require("path")

module.exports={

	baseUrl:"http://localhost:3000/hw/store/",
	gridUrl:"http://192.168.56.1:4444/wd/hub",
	sessionsPerBrowser:4,
	retry: 5,
	screenshotMode:"auto",
	compositeImage:false,
	screenshotDelay:1000,
	sets: {
		desktop: {
			files: "test/hermione"
		}
	},
	browsers:{
		chrome: {
			desiredCapabilities: {
				browserName: 'chrome',
			}
		}
	},
	plugins:{
		[path.resolve(__dirname, "plugins", "selenium-runner.js")]: true,
		"html-reporter/hermione":{
			path: "hermione-html-report"
		},
	}
}
