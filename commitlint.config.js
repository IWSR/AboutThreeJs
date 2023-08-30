export default {
  ignores: [(commit) => commit.includes("init")],
  extends: ["@commitlint/config-conventional"],
};
