const express = require("express");
const router = express.Router();
//blockchain 


'use strict';


const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('../../test-application/javascript/AppUtil.js');

const channelName = process.env.CHANNEL_NAME || 'mychannel';
const chaincodeName = process.env.CHAINCODE_NAME || 'basic';

const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'javascriptAppUser';

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}













async function cllBc() {
	
	try {
			const ccp = buildCCPOrg1();

		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
	const wallet = await buildWallet(Wallets, walletPath);

		await enrollAdmin(caClient, wallet, mspOrg1);

		await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

		const gateway = new Gateway();

		try {
			await gateway.connect(ccp, {
				wallet,
				identity: org1UserId,
				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
			});
			const network = await gateway.getNetwork(channelName);

		const contract = network.getContract(chaincodeName);

	     
		console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
			let result = await contract.evaluateTransaction('GetAllAssets');
			// console.log(`${prettyJSONString(result.toString())}`)
			return {
				 data: `${(result.toString())}`
			};
			console.log('......................22222222222222222222222222222222222222222')
     



		} finally {
			gateway.disconnect();
		}
	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
		process.exit(1);
	}
}






async function CreateNewAssetBC(reqAsset){
  try {
    const ccp = buildCCPOrg1();

  const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
const wallet = await buildWallet(Wallets, walletPath);

  await enrollAdmin(caClient, wallet, mspOrg1);

  await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

  const gateway = new Gateway();

  try {
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
    });
    const network = await gateway.getNetwork(channelName);

  const contract = network.getContract(chaincodeName);

   	console.log('\n--> Submit Transaction: CreateAsset, creates new asset with ID, color, owner, size, and appraisedValue arguments');
			result = await contract.submitTransaction('CreateAsset', reqAsset.ID, reqAsset.Color, reqAsset.Size, reqAsset.Owner, reqAsset.Value);
			console.log('*** Result: committed');
			if (`${result}` !== '') {
        return {
          data: `${(result.toString())}`
       };
			}

  } finally {
    gateway.disconnect();
  }
} catch (error) {
  console.error(`******** FAILED to run the application: ${error}`);
  process.exit(1);
}


}




async function GetAssetDetails(AssetID){
  try {
    const ccp = buildCCPOrg1();

  const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
const wallet = await buildWallet(Wallets, walletPath);

  await enrollAdmin(caClient, wallet, mspOrg1);

  await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

  const gateway = new Gateway();

  try {
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
    });
    const network = await gateway.getNetwork(channelName);

  const contract = network.getContract(chaincodeName);


  console.log('\n--> Evaluate Transaction: ReadAsset, function returns ' + AssetID+ '  attributes');
  result = await contract.evaluateTransaction('ReadAsset', AssetID);
  
  return {
    data: `${(result.toString())}`
 };







  } finally {
    gateway.disconnect();
  }
} catch (error) {
  console.error(`******** FAILED to run the application: ${error}`);
  process.exit(1);
}


}











async function UpdateAssetBC(AssetDetails){
  try {
    const ccp = buildCCPOrg1();

  const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
const wallet = await buildWallet(Wallets, walletPath);

  await enrollAdmin(caClient, wallet, mspOrg1);

  await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

  const gateway = new Gateway();

  try {
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
    });
    const network = await gateway.getNetwork(channelName);

  const contract = network.getContract(chaincodeName);

 

      try {
				// How about we try a transactions where the executing chaincode throws an error
				// Notice how the submitTransaction will throw an error containing the error thrown by the chaincode
        console.log('\n--> Submit Transaction: UpdateAsset, UpdateAsset asset with ID, color, owner, size, and appraisedValue arguments');
        result = await contract.submitTransaction('UpdateAsset', AssetDetails.ID, AssetDetails.Color, AssetDetails.Size, AssetDetails.Owner, AssetDetails.Value);
          console.log('******** FAILED to return an error');
			} catch (error) {
				console.log(`*** Successfully caught the error: \n    ${error}`);
			}






			if (`${result}` !== '') {
        return {
          data: `${(result.toString())}`
       };
			}

  } finally {
    gateway.disconnect();
  }
} catch (error) {
  console.error(`******** FAILED to run the application: ${error}`);
  process.exit(1);
}


}



 

// CREATE Asset
router.route("/create-asset").post(async (req, res, next) => {

  CreateNewAssetBC(req.body)
 console.log(req.body)
});

// READ Assets
router.route("/").get(async (req, res, next) => {
  console.log('all called.......................................................................')


 
const newdata = await cllBc()
res.json(newdata)
 
  console.log(' ENDEEEEEEEEED     all called..........................................' )
  
 
});









// Get Single Asset
router.route("/edit-asset/:id").get(async (req, res, next) => {
  console.log(req.params.id);
  
  const newdata = await GetAssetDetails(req.params.id);
  console.log(newdata);
res.json(newdata);

 
});

// Update Asset
router.route("/update-Asset/:id").put( async (req, res, next) => {
  console.log(req.body)
  await UpdateAssetBC(req.body);
      res.status(200).json({
        msg: 'Successfylly added ',
      });

 
});

// Delete Asset
router.route("/delete-Asset/:id").delete(async (req, res, next) => {
  console.log(req.params.id)

  await DeleteAssetBC(req.params.id);
  res.status(200).json({
    msg: 'Successfully Deleted ',
  });



  // AssetSchema.findByIdAndRemove(req.params.id, (error, data) => {
  //   if (error) {
  //     return next(error);
  //   } else {
  //     res.status(200).json({
  //       msg: data,
  //     });
  //   }
  // });
});

module.exports = router;
