const fs = require('fs');

/* Create Configuration File
 *
 * The administrator would want to have the vet info stored. */
exports.CreateConfigFile = (req, res) => {
	const CONFIG_FILE = 'config.json';
	var setup = {};

	if(CheckConfigFile()){
		fs.readFile(CONFIG_FILE, (err, data) => {
			if(err)
				return res.status(406).json(err);

			/* Success */
			setup = JSON.parse(data);

			/* Update setup object */
			setup.vetName = req.body.vetName;
			setup.vetAddress.street = req.body.street;
			setup.vetAddress.number = req.body.number;
			setup.vetAddress.intNumber = req.body.intNumber;
			setup.vetAddress.zipCode = req.body.zipCode;
			setup.vetAddress.stateOrProvince = req.body.stateOfProvince;
			setup.vetAddress.country = req.body.country;
			setup.vetLogo = req.body.vetLogo;
			setup.vetHeadOfMedics.name = req.body.name;
			setup.vetHeadOfMedics.code = req.body.code;

			const STR_SETUP = JSON.stringify(setup);

			fs.writeFile(CONFIG_FILE, STR_SETUP, err => {
				if(err)
					return res.status(406).json(err);

				/* Success */
				res.sendStatus(201);
			});
		});
	}
};

/* Get Config File
 *
 * So the administrator can get the more updated version. */
exports.GetConfigFile = (req, res) => {
	const CONFIG_FILE = 'config.json';
	var setup = {};

	if(CheckConfigFile()){
		fs.readFile(CONFIG_FILE, (err, data) => {
			if(err)
				return res.status(406).json(err);

			/* Success */
			setup = JSON.parse(data);
			res.status(200).json(setup);
		});
	}else{
		res.sendStatus(404);
	}
};

/* Helper function to check whether or not the configuration
 * file exists in the file system. Return false if there is any
 * error. */
function CheckConfigFile(){
	const CONFIG_FILE = 'config.json';
	const INITIAL_SETUP = {
		"vetName": "",
		"vetAddress": {
			"street": "",
			"number": 0,
			"intNumber": 0,
			"zipCode": 0,
			"stateOrProvince": "",
			"country": ""
		},
		"vetLogo": "",
		"vetHeadOfMedics": {
			"name": "",
			"code": ""
		}
	};

	try{
		if(!fs.existsSync(CONFIG_FILE)){
			const STR_INITIAL_SETUP = JSON.stringify(INITIAL_SETUP);
			fs.writeFileSync(CONFIG_FILE, STR_INITIAL_SETUP);
		}

		return true;
	}catch(err){
		console.log(err);
		return false;
	}
};
