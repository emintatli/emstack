export const config = {
    be_url: `/api`,
    turnstile_site_key:
        process.env.NODE_ENV === 'development'
            ? '1x00000000000000000000AA'
            : process.env.TURNSTILE_SECRET_KEY,
    cms_api: process.env.CMS_API,
}
