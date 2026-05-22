import { Injectable, OnModuleInit } from "@nestjs/common";

// Ensure the engine type is set before loading the generated Prisma client.
process.env.PRISMA_CLIENT_ENGINE_TYPE =
  process.env.PRISMA_CLIENT_ENGINE_TYPE || "binary";
const { PrismaClient } = require("@prisma/client");

// Try to load a Postgres adapter for Prisma's "client" engine mode.
// If it's not installed, throw a clear error explaining how to install it.
let PrismaPgAdapter: any = undefined;
try {
  const _adapter = require("@prisma/adapter-pg");
  PrismaPgAdapter = _adapter.PrismaPg || _adapter.default || _adapter;
} catch (err) {
  // Keep undefined; we will surface a clear message when constructing the client.
}

// Debug: indicate whether adapter was resolved at module load time.
// This helps determine why constructor validation still complains.
try {
  // eslint-disable-next-line no-console
  console.debug("[PrismaService] PrismaPgAdapter loaded:", !!PrismaPgAdapter);
} catch (e) {
  // ignore
}

@Injectable()
export class PrismaService
  extends (PrismaClient as any)
  implements OnModuleInit
{
  constructor() {
    // If the generated client expects a "client" engine it requires an
    // adapter (or accelerateUrl). Prefer passing the Postgres adapter when
    // available. If it's not installed, surface a helpful error so the
    // developer can run `npm install @prisma/adapter-pg`.
    if (PrismaPgAdapter) {
      try {
        const conn =
          process.env.DATABASE_URL || process.env.PRISMA_DATABASE_URL || "";
        const adapterInstance = new PrismaPgAdapter(conn);
        super({ adapter: adapterInstance });
        return;
      } catch (err) {
        // Fallthrough to attempt a plain construction and let runtime show
        // the original validation error if adapter usage fails for some reason.
      }
    }

    // Fallback: attempt empty construction to keep previous behavior.
    // Note: this may still throw a PrismaClientConstructorValidationError
    // if the generated client requires an adapter/accelerateUrl.
    try {
      super({});
    } catch (err) {
      if (!PrismaPgAdapter) {
        // Re-throw with an actionable message.
        throw new Error(
          "Prisma client construction failed. The generated client requires an adapter or accelerateUrl. Install the Postgres adapter with `npm install @prisma/adapter-pg` and restart.",
        );
      }
      throw err;
    }
  }

  async onModuleInit() {
    await this.$connect();
  }
}
