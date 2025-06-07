class Ajax {
    backendUrl: string;

    constructor() {
        this.backendUrl = 'http://localhost:8000';
    }

    async getTask(type: string = 'frontend') {
        const url = `${this.backendUrl}/get-task?type=${type}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            return;
        }

        const data = await response.json();

        return data.result;
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

        if (!response.ok) {
            return;
        }

        const data = await response.json();

        return data.result;
    }
}

export default new Ajax();
