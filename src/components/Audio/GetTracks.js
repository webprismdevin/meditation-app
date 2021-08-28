import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'

const API_TOKEN = process.env.REACT_APP_WEB3_TOKEN;

const client = new Web3Storage({ token: API_TOKEN });

const getFiles = async () => {
    const uploadNames = []
    for await (const item of client.list()) {
        uploadNames.push({name: item.name, cid: item.cid})
    }

    return uploadNames;
}

export { getFiles }