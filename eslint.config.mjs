import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypeScript,
  {
    ignores: [".next/**", ".next-leads-test/**", "node_modules/**", "next-env.d.ts"]
  }
];

export default eslintConfig;
