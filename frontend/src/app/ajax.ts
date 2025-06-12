import { ethers } from 'ethers';
import SkillTokenAbi from '../../public/SkillToken.json';

class Ajax {
    backendUrl: string;

    provider?: ethers.providers.Web3Provider;
    signer?: ethers.Signer;
    contract?: ethers.Contract;
    contractAddress: string = '0xf68e4cc186eF33421DA16e9370610ae74cD21f1f';

    constructor() {
        this.backendUrl = 'http://localhost:8000';

        this.connectWallet();
    }

    async connectWallet() {
        if ((window as any).ethereum) {
            this.provider = new ethers.providers.Web3Provider((window as any).ethereum);
            await this.provider.send("eth_requestAccounts", []);
            this.signer = this.provider.getSigner();
            const userAddress = await this.signer.getAddress();
            console.log("Подключен кошелек:", userAddress);

            this.contract = new ethers.Contract(this.contractAddress, SkillTokenAbi.abi, this.signer);
        } else {
            alert("Установите MetaMask!");
        }
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

    async getUserPoints(): Promise<number> {
        try {
            const points: ethers.BigNumber = await this.contract?.getMyPoints();

            return points.toNumber();
        } catch (err) {
            console.error('Ошибка при получении баллов:', err);
            return 0;
        }
    }

    async rewardUser(amount: number): Promise<void> {
        try {
            const address = await this.signer?.getAddress();

            const tx = await this.contract?.rewardUser(address, amount);
            await tx.wait();

            alert(`Начислено ${amount} токенов для ${address}`);
        } catch (err) {
            console.error('Ошибка при начислении токенов:', err);
        }
    }
}

export default new Ajax();
