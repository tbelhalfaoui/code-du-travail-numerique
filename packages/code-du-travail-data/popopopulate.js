import themes from "./dataset/datafiller/themes.data.json";

const NLP_HOST = `http://${process.env.NLP_URL}`;

async function main() {
  console.log({ NLP_HOST });
  const { title } = themes[0];
  const vector = await fetch(`${NLP_HOST}/api/search?q=${title}`);
  console.log({ vector });
}

main().catch(response => {
  console.error(response);
  process.exit(-1);
});
