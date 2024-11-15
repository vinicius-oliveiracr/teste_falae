import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.routes";
import { ProductRoutes } from "./routes/product.routes";

const app: FastifyInstance = fastify({
    logger: true,
});


app.addContentTypeParser('application/json', { parseAs: 'string' }, (req, body, done) => {
    try {
        const json = JSON.parse(body);
        done(null, json);
    } catch (error: string | any) {
        done(error);
    }
});

app.register(userRoutes, {
    prefix: '/api/auth'
})

app.register(ProductRoutes, {
    prefix: '/api/products'
})

app.listen({
    port: 3333,
},
() => console.log("Server is running on port 3333"))