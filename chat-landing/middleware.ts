import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next`, `/_vercel`, `/ingest`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    // - … the ones starting with public assets
    '/((?!api|_next|_vercel|ingest|.*\\..*|public|assets|images|icons|fonts).*)'
  ]
};
