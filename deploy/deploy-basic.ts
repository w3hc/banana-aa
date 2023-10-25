import "@nomiclabs/hardhat-ethers"

//your address here...
const initialMint = ethers.parseEther("10000")

//to deploy, run yarn hardhat deploy --network hardhat

export default async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments

    const { deployer } = await getNamedAccounts()
    console.log(deployer)

    const deployed = await deploy("BananaTokenIsNotLate", {
        from: deployer,
        args: [],
        log: true
    })

    console.log("deployed: ", deployed.address)

}
export const tags = ["Basic"]
