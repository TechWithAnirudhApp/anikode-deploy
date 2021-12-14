const querystring = require("querystring");
const { config, oauth } = require("./utils/auth");
const { getUser } = require("./utils/netlify-api");
const VALID_URLS = [
  // Check if it is anything from techwithanirudh.tech
  /^https:\/\/techwithanirudh\.tech\/.*$/,
  // Check if it is anything from techwithanirudh.repl.co
  /^https:\/\/techwithanirudh\.repl\.co\/.*$/,
];

/* Function to handle netlify auth callback */
exports.handler = async (event, context) => {
  /* Grant the grant code */
  const code = event.queryStringParameters.code;
  /* state helps mitigate CSRF attacks & Restore the previous state of your app */
  const state = querystring.parse(event.queryStringParameters.state);

  try {
    /* Take the grant code and exchange for an accessToken */
    const authorizationToken = await oauth.authorizationCode.getToken({
      code: code,
      redirect_uri: config.redirect_uri,
      client_id: config.clientId,
      client_secret: config.clientSecret,
    });

    const authResult = oauth.accessToken.create(authorizationToken);

    const token = authResult.token.access_token;

    const user = await getUser(token);

    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({
    //     user: user,
    //     authResult: authResult,
    //     state: state,
    //     encode: Buffer.from(token, 'binary').toString('base64')
    //   })
    // }

    const encodedUserData = querystring.stringify({
      email: user.email || "NA",
      full_name: user.full_name || "NA",
      avatar: user.avatar_url || "NA",
    });

    /* Check if the url contains any of the valid urls by matching the regex */
    const isValidUrl = VALID_URLS.some((url) => state.url.match(url));

    /* If the url is not valid, return an error */
    if (!isValidUrl) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          error: "Not authorized",
        }),
      };
    }

    const URI = `${state.url}#${encodedUserData}&csrf=${
      state.csrf
    }&token=${Buffer.from(token, "binary").toString("base64")}`;
    console.log("URI", URI);
    /* Redirect user to authorizationURI */
    return {
      statusCode: 302,
      headers: {
        Location: URI,
        "Cache-Control": "no-cache", // Disable caching of this response
      },
      body: "", // return body for local dev
    };
  } catch (e) {
    console.log("Access Token Error", e.message);
    console.log(e);
    return {
      statusCode: e.statusCode || 500,
      body: JSON.stringify({
        error: e.message,
      }),
    };
  }
};
