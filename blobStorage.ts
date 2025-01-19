import { DefaultAzureCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";

const PREFIX = process.env.BLOB_PREFIX || "";

if (!process.env.BLOB_SRV_ENDPOINT) {
    throw new Error("Missing environment variable BLOB_SRV_ENDPOINT");
}

if (!process.env.BLOB_CONTAINER) {
    throw new Error("Missing environment variable BLOB_CONTAINER");
}

const bsc = new BlobServiceClient(
    process.env.BLOB_SRV_ENDPOINT,
    new DefaultAzureCredential(),
  );
const cc = bsc.getContainerClient(process.env.BLOB_CONTAINER);
const blobList = cc.listBlobsFlat({prefix: PREFIX});

async function main() {
    for await (const blob of blobList) {
        const blobClient = cc.getBlobClient(blob.name);
        console.log(blobClient.name);
    }
}

main().catch(console.error);
