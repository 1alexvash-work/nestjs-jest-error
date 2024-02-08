import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}

// TODO:
// This is boilerplate
// Based on my current knowledge it looks like an injectable service
// 1) I need to properly set it up
// 2) Then figure out how to use dependency injection
