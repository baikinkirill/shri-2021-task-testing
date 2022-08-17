const fs = require("fs")
const {spawn, execSync, exec} = require("child_process")

module.exports = async (hermione) => {
	let selenium

	const file = fs.openSync("selenium.log", "w")

	console.log("Build project")
	await execSync("yarn build", {stdio: [0, 1, file]})

	console.log("Start project");
	await spawn("yarn start:test-server", {
		stdio: ["ignore", file, file],
		shell: true
	})

	console.log("Start selenium")
	selenium = spawn("selenium-standalone start", {
		stdio: ["ignore", file, file],
		shell: true
	})

	await new Promise(resolve => {
		setTimeout(resolve, 5000)
	})


	hermione.on(
		hermione.events.RUNNER_END,
		() =>
			new Promise((res, rej) => {
				selenium.on("exit", () => res())
				selenium.kill()
			})
	)
}
