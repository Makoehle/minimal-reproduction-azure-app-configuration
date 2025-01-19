# Prerequisites

- **Node.js**<sup>\*</sup> (v22.13.0) 👉
  [[Download](https://nodejs.org/en/download/)]
- **pnpm**<sup>\*</sup> 👉 `npm install -g pnpm`
- **Azure App Configuration**<sup>\*</sup>
- **VPN**<sup>\*</sup> 👉 To simulate the issue
- **Azure Blob Storage** 👉 Optional its just to demonstrate the issue is with
  app config

# Azure App Configuration settings

- All networks, including the internet and private endpoints, can access this
  resource.
- Access keys is enabled
- Some configuration settings are added in order to read them

# GetStarted

1. `pnpm install`
2. Activate a VPN
3. `APP_CONFIG_ENDPOINT=https://REPLACE_ME.azconfig.io pnpm start` 👉 💥
4. `BLOB_PREFIX= BLOB_SRV_ENDPOINT=https://REPLACE_ME.blob.core.w
indows.net/ BLOB_CONTAINER=REPLACE_ME pnpm blobStorage`
   👉 🚀 Demonstrating the issue is with the `@azure/app-configuration`
5. Deactivate VPN
6. `APP_CONFIG_ENDPOINT=https://REPLACE_ME.azconfig.io pnpm start` 👉 🚀
7. `BLOB_PREFIX= BLOB_SRV_ENDPOINT=https://REPLACE_ME.blob.core.windows.net/
   BLOB_CONTAINER=REPLACE_ME pnpm blobStorage`
   👉 🚀

So as soon as a VPN is deactivated both the `@azure/app-configuration` and
`@azure/storage-blob` works as expected. But as soon as the VPN is activated
`@azure/app-configuration` fails to read the configuration settings.
