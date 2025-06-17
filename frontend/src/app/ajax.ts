import {ethers} from 'ethers';
import SkillTokenAbi from '../../public/SkillToken.json';

const IS_AUTH_USER_KEY = 'skill-token-is-auth';

class Ajax {
    backendUrl: string;

    provider?: ethers.providers.Web3Provider;
    signer?: ethers.Signer;
    contract?: ethers.Contract;
    contractAddress: string = '0x6132D269cA452ef8dB3545cb5b03f6C798D2D631';

    constructor() {
        this.backendUrl = 'http://localhost:8000';

        this.connectWallet();
    }

    isAuth() {
        return JSON.parse(localStorage.getItem(IS_AUTH_USER_KEY) || 'false');
    }

    signIn() {
        localStorage.setItem(IS_AUTH_USER_KEY, JSON.stringify(true));
    }

    signOut() {
        localStorage.setItem(IS_AUTH_USER_KEY, JSON.stringify(false));
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

    async deductFromUser(amount: number): Promise<void> {
        try {
            const address = await this.signer?.getAddress();

            const tx = await this.contract?.deductFromUser(address, amount);
            await tx.wait();

            alert(`Снято ${amount} токенов у ${address}`);
        } catch (err) {
            throw new Error(`Ошибка при снятии токенов: ${err}`);
        }
    }

    async getUserAddress() {
        console.log();
        if ((window as any).ethereum) {
            try {
                const provider = new ethers.providers.Web3Provider((window as any).ethereum);
                const signer = provider.getSigner();

                return await signer.getAddress();
            } catch (error) {
                console.error('Ошибка при получении адреса:', error);
                return 'кошелек не обнаружен';
            }
        } else {
            console.error('Ошибка при получении адреса:');
            return 'кошелек не обнаружен';
        }
    }
}

export default new Ajax();
