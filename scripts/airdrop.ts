const color = require("cli-color")
var msg = color.xterm(39).bgXterm(128)
import hre, { ethers, network } from "hardhat"
import fs from "fs"
import {holders} from '../holders'

async function main() {

    // 1st batch until: sent 2201.027146 units to: 0xf03808deff3c51ea3994bcb55d3e34cda2c9d236

    function formatTimestamp(date: Date): string {
        const months = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
      
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const amOrPm = hours >= 12 ? 'pm' : 'am';
      
        const formattedTimestamp = `${day} ${month} ${year} at ${hours % 12}:${minutes.toString().padStart(2, '0')} ${amOrPm} UTC`;
      
        return formattedTimestamp;
      }
      
      const now = new Date(); // Current date and time
      const formattedNow = formatTimestamp(now);
      
      console.log(formattedNow);
      
    
    try {
    
        const [signer] = await ethers.getSigners()

        const BananaTokenIsNotLate = await ethers.getContractFactory("BananaTokenIsNotLate")

        const addr = "0xe1f722d2bf89D08E736EDf1617C045b2A3C83895"
        // console.log(addr)
        // console.log(BananaTokenIsNotLate.interface)
        // console.log(signer)

        const erc20 = new ethers.Contract(addr, BananaTokenIsNotLate.interface, signer)

        const lines = holders.trim().split('\n');
        const formattedAddresses = lines.map(address => address);

        console.log('\nholders.length:', formattedAddresses.length,'\n')

        console.log("Start:", formatTimestamp(now))

        for (let id = 1 ; id < Number(formattedAddresses.length) ; id++) {
        
            await erc20.transfer(formattedAddresses[0],ethers.parseEther('2201.027146'))
            console.log("Sent 2201.027146 units to:", formattedAddresses[id], "// loop #"+ Number(id))
        
        }
        console.log("End:", formatTimestamp(now))
        
    } catch(e) {
        console.log("aidrop error:", e)
        console.log("End (with error):", formatTimestamp(now))
    }
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
