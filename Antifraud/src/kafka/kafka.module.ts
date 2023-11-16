import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKER } from './kafka.constants';
import { KafkaService } from './kafka.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'transactions-validator',
            brokers: [KAFKA_BROKER],
          },
          consumer: {
            groupId: 'transactions-validator-consumer',
          },
          subscribe: {
            fromBeginning: true,
          },
        },
        
      },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
