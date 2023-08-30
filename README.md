# Project to reproduce an issue with tsed/express

The issue is described in <https://github.com/tsedio/tsed/issues/2416>.

## When the Authorization header is not set, the ctx.request.route is OK

To reproduce it:

```shell
curl --request GET --url http://127.0.0.1:8080/ 
```

You will get a normal 401 HTTP error.

## When the Authorization header is set with wrong credentials, the ctx.request.route is undefined (but the ctx.request.url is OK)

To reproduce it:

```shell
curl --request GET --url http://127.0.0.1:8080/ --header 'Authorization: Basic ZmQ6ZmRzZmQ='
```

An exception is thrown because of the following code in `filters/ErrorFilter.ts` which fails due to undefined `route`:

```ts
console.log(ctx.request.route.toString());
```
