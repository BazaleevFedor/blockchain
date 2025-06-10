// import { ethers } from 'ethers';
// import SkillTokenAbi from './contracts/SkillToken.json';

class Ajax {
    backendUrl: string;

    // provider: ethers.providers.Web3Provider;
    // signer: ethers.Signer;
    // contract: ethers.Contract;
    // contractAddress: string = '0xYourContractAddress';

    constructor() {
        this.backendUrl = 'http://localhost:8000';

        // if (typeof window !== 'undefined' && (window as any).ethereum) {
        //     this.provider = new ethers.providers.Web3Provider((window as any).ethereum);
        //     this.signer = this.provider.getSigner();
        //     this.contract = new ethers.Contract(this.contractAddress, SkillTokenAbi.abi, this.signer);
        // } else {
        //     console.error('MetaMask is not installed');
        // }
    }

    async getTask(type: string = 'frontend') {
        const url = `${this.backendUrl}/get-task?type=${type}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) return;

        const data = await response.json();

        return data.task;
    }

    async verifyTask(task: string, solution: string) {
        const url = `${this.backendUrl}/verify-task`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task, solution })
        });

        if (!response.ok) return;

        const data = await response.json();

        return data.result;
    }

    // async getUserPoints(): Promise<number> {
    //     try {
    //         const points: ethers.BigNumber = await this.contract.getMyPoints();
    //         return points.toNumber();
    //     } catch (err) {
    //         console.error('Ошибка при получении баллов:', err);
    //         return 0;
    //     }
    // }
    //
    // async rewardUser(address: string, amount: number): Promise<void> {
    //     try {
    //         const tx = await this.contract.rewardUser(address, amount);
    //         await tx.wait(); // Ждём подтверждение
    //         console.log(`Начислено ${amount} токенов для ${address}`);
    //     } catch (err) {
    //         console.error('Ошибка при начислении токенов:', err);
    //     }
    // }
}

export default new Ajax();
