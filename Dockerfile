FROM node:18-alpine AS builder

ENV NODE_OPTIONS=--max_old_space_size=2048

RUN apk add --no-cache g++ make py3-pip libc6-compat
# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY .env.production* ./
COPY .yarnrc.yml package.json yarn.lock* tsconfig.json ./
COPY prisma ./prisma/
COPY .yarn ./.yarn

# Install app dependencies
RUN corepack enable && corepack prepare yarn@4.2.2 --activate
RUN yarn install --immutable

COPY . .

RUN yarn build

FROM node:18-alpine as production
WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.2.2 --activate

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json .
COPY --from=builder --chown=nextjs:nodejs /app/yarn.lock .  
COPY --from=builder --chown=nextjs:nodejs /app/.yarn ./.yarn
COPY --from=builder --chown=nextjs:nodejs /app/.yarnrc.yml ./
COPY --from=builder --chown=nextjs:nodejs /app/next.config.mjs ./
COPY --from=builder --chown=nextjs:nodejs /app/i18nconfig.mjs ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma/
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3090

ENV HOSTNAME="0.0.0.0"
CMD ["yarn", "start" ]