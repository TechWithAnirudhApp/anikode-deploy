# Netlify OAuth

[![Netlify Status](https://api.netlify.com/api/v1/badges/df11b244-1c7c-40dd-85ce-8c186ec9b17a/deploy-status)](#)

Netlify OAuth serverless functions based on https://github.com/netlify-labs/oauth-example

[![Netlify Deploy](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/techwithanirudh/netlify-oauth)

## Use cases

Using Netlify OAuth you can create custom experiences using the [Netlify Open API](https://open-api.netlify.com/#/default).

**Here are some use cases:**

- Building a custom Netlify admin UI
- Building Netlify Desktop Applications
- Making an App that user's existing Netlify sites
- Manage Netlify sites, new deployments, & other things from inside your third party application

## Video

<a href="https://www.youtube.com/watch?v=LN8cL2yPR3c"><img src="https://user-images.githubusercontent.com/532272/54240254-c75f9480-44da-11e9-8d76-b79bc7323b59.png" /></a>

## How it works

![Netlify OAuth + Functions](https://user-images.githubusercontent.com/532272/54178445-106c0600-4453-11e9-998f-564a521dfc6b.png)

## Setup

1. **Create and Deploy a new Netlify site**

    You can use an [this repo](https://app.netlify.com/start/deploy?repository=https://github.com/techwithanirudh/netlify-oauth)

2. **[Create OAuth application](https://app.netlify.com/account/applications)**

    Create your OAuth application in the Netlify admin UI.

    Add in your callback URL. This can be changed later.

    ![image](https://user-images.githubusercontent.com/532272/53382433-3066da00-3929-11e9-978a-74d802c212db.png)

3. **After creating your OAuth app, Click on show credentials**

    Save these credentials for the next step

    ![image](https://user-images.githubusercontent.com/532272/53382437-3957ab80-3929-11e9-9cbf-b812cd04c2c7.png)

4. **Take your OAuth credentials and add them to your OAuth app site**

    Set `NETLIFY_OAUTH_CLIENT_ID` and `NETLIFY_OAUTH_CLIENT_SECRET` environment variables in your site

    ![image](https://user-images.githubusercontent.com/532272/53382472-53918980-3929-11e9-9d24-598247b5f2c6.png)

5. **Then trigger a new deploy**

    ![image](https://user-images.githubusercontent.com/532272/53382490-6015e200-3929-11e9-9f6b-92be59d78e59.png)


6. **Visit your site and verify the OAuth flow is working**

