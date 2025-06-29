import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { CollaborationContractFactory } from '../artifacts/contract_algo/CollaborationContractClient'

export async function deploy() {
  console.log('=== Deploying CollaborationContract ===')

  const algorand = AlgorandClient.fromEnvironment()
  const deployer = await algorand.account.fromEnvironment('DEPLOYER')

  const factory = algorand.client.getTypedAppFactory(CollaborationContractFactory, {
    defaultSender: deployer.addr,
  })

  const { appClient, result } = await factory.deploy({ onUpdate: 'append', onSchemaBreak: 'append' })

  // If app was just created fund the app account
  if (['create', 'replace'].includes(result.operationPerformed)) {
    await algorand.send.payment({
      amount: (1).algo(),
      sender: deployer.addr,
      receiver: appClient.appAddress,
    })
  }

  // 1. Call initialize with your desired values
  await appClient.send.initialize({
    args: {
      brandName: 'YourBrand',
      creatorName: 'ContentCreator',
      adminName: 'AdminName',
      contractPrice: 1000000, // 1 Algo in microAlgos
      proposalText: 'This is the proposal text.',
    }
  })

  // 2. Now you can safely call getDetails
  const response = await appClient.send.getDetails()
  console.log(
    `Called getDetails on ${appClient.appClient.appName} (${appClient.appClient.appId}), received:`,
    response.return,
  )
}
