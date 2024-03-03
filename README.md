# [jethromuller.co.za](https://jethromuller.co.za)

My personal website built with [Astro](https://astro.build) and TypeScript.

Adapted from the [Astrofy Astro template](https://github.com/manuelernestog/astrofy)
made by [Manuel Ernesto Garcia](https://github.com/manuelernestog) - [LICENSE](https://github.com/manuelernestog/astrofy/blob/main/LICENSE).

## Writing

### Install dependencies

```shell
pnpm install
```

### Run the plop script to add a new blog post

```shell
pnpm run new-blog-post
```

### Validate the writing

```shell
vale sync
vale ./src/content/blog/<new_arcticle_name>/
```

## Development

### Install dependencies

```shell
pnpm install
```

### Run development server

```shell
pnpm run astro dev
```

## Releasing

### Install dependencies

```shell
pnpm install
```

### Run checks

```shell
pnpm run astro check
```

### Build static site

```shell
pnpm run astro build
```

### Copy ./dist to remote server

```shell
scp ./dist/ user@remote.server:/www/dir/
```
