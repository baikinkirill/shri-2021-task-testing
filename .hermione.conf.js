module.exports={
	baseUrl:"http://localhost:3000/hw/store/",
	gridUrl:"http://192.168.56.1:4444/wd/hub",

	browsers:{
		chrome: {
			desiredCapabilities: {
				browserName: 'chrome',
			}
		}
	},
	plugins:{
		"html-reporter/hermione":{
			path: "hermione-html-report"
		}
	}
}
