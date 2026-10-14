import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";

const isCloudflareDeploy = process.env.RANBANK_DEPLOY_TARGET === "cloudflare";
export default defineConfig(({ command }) => ({
  plugins: [
    vinext(),
    ...(isCloudflareDeploy || command === "build"
      ? [cloudflare({ viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] } })]
      : []),
  ],
}));
