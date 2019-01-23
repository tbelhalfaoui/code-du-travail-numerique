const Router = require("koa-router");
const API_BASE_URL = require("../api").BASE_URL;
const routeName = "/suggest";
const router = new Router({ prefix: API_BASE_URL });

const elasticsearchClient = require("../../conf/elasticsearch.js");
const getSuggestBody = require("./suggest.elastic");

const index =
  process.env.ELASTICSEARCH_DOCUMENT_INDEX || "code_du_travail_numerique";

/**
 * Return documents matching the given query.
 *
 * @example
 * http://localhost:1337/api/v1/suggest?q=incapacité%20travail
 *
 * @param {string} querystring.q A `q` querystring param containing the query to process.
 * @param {string} querystring.excludeSources A `excludeSources` querystring param containing the sources (comma separatied list) to exclude from the results
 * @returns {Object} Results.
 */
router.get(routeName, async ctx => {
  const query = ctx.request.query.q;

  const excludeSources = (ctx.request.query.excludeSources || "").split(",");
  const body = getSuggestBody({ query, excludeSources });
  ctx.body = await elasticsearchClient.search({ index, body });
});

module.exports = router;
module.exports.routeName = routeName;
