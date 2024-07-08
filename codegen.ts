import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8000/graphql",
  documents: ["src/**/*.{tsx,ts}"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
  verbose: true,
};

export default config;
