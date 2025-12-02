import { ClientProxyFactory, Transport } from "@nestjs/microservices";

async function bootstrap() {
    const client = ClientProxyFactory.create({
        transport: Transport.REDIS,
        options: {
            host: "localhost",
            port: 6379
        }
    })
    const result = await client.send('sum', [1, 2, 3, 10]).toPromise();
    console.log('Result:', result); // Output: 6
}
bootstrap()