import { task } from "hardhat/config"
var msg = require("cli-color").xterm(39).bgXterm(128)
import * as store from "../store.json"

task("mint", "Mint a given amount of ERC-20 tokens")
    .addParam("amount")
    .setAction(async amount => {
        const [signer] = await ethers.getSigners()
        const BananaTokenIsNotLate = await ethers.getContractFactory("BananaTokenIsNotLate")
        const addr = "0xe1f722d2bf89D08E736EDf1617C045b2A3C83895"
        const erc20 = new ethers.Contract(addr, BananaTokenIsNotLate.interface, signer)
        const mint = await erc20.mint(await ethers.parseEther(amount.amount))
        const hash = mint.hash
        console.log(
            "Minted",
            msg(amount.amount),
            "units. \n\nTx hash:",
            msg(hash)
        )
    })
