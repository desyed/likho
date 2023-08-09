import { g, auth, config } from '@grafbase/sdk'

// Welcome to Grafbase!
// Define your data models, integrate auth, permission rules, custom resolvers, search, and more with Grafbase.
// Integrate Auth
// https://grafbase.com/docs/auth
//
// const authProvider = auth.OpenIDConnect({
//   issuer: process.env.ISSUER_URL ?? ''
// })
//
// Define Data Models
// https://grafbase.com/docs/database

const postTypeEnum = g.enum('Type', ['page', 'blog']);

// @ts-ignore
const post = g.model('Post', {
  name: g.string().default('Home Page'),
  slug: g.string().unique(),
  description: g.string().optional().default('Awesome Home Page: powered by Likho!'),
  thumbnail: g.url().optional(),
  content: g.string().optional(),
  type: g.enumRef(postTypeEnum).default('page'),
  published: g.boolean().default(true),
  // comments: g.relation(() => comment).optional().list().optional(),
  createdBy: g.relation(() => user).optional(),
  project: g.relation(() => project).optional()
}).search().auth((rules) => {
  rules.public().read()
})

// @ts-ignore
const project = g.model('Project', {
  name: g.string().length({ min: 3}).search(),
  code: g.string().length({ min: 6, max: 6}).unique(),
  liveSiteUrl: g.url().optional(),
  logo: g.url().optional(),
  description: g.string().optional(),
  subdomain: g.relation(() => Subdomain).optional(),
  posts: g.relation(post).optional().list().optional(),
  createdBy: g.relation(() => user),
}).search().auth((rules) => {
  rules.public().read()
  rules.private().create().delete().update()
})

// const comment = g.model('Comment', {
//   post: g.relation(post),
//   body: g.string(),
//   likes: g.int().default(0),
//   author: g.relation(() => user).optional()
// })
// @ts-ignore
const user = g.model('User', {
  name: g.string(),
  email: g.email().unique(),
  avatarUrl: g.url().optional(),
  description: g.string().optional(),
  projects: g.relation(project).optional().list().optional()
}).search().auth((rules) => {
  rules.public().read()
})

// @ts-ignore
const Subdomain = g.model('Subdomain', {
    name: g.string().unique(),
    projects: g.relation(project).optional().list().optional()
}).search().auth((rules) => {
    rules.public().read()
    rules.private().create().delete().update()
})


const jwt = auth.JWT({
  issuer: 'grafbase',
  secret:  g.env('NEXTAUTH_SECRET')
})

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private()
  },
})
