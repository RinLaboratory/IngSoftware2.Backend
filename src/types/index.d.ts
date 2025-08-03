import type { Request as ExpressRequest } from "express";
import type { IncomingMessage as HttpIncomingMessage } from "http";

/**
 * Since the ecosystem hasn't fully migrated to ESLint's new FlatConfig system yet,
 * we "need" to type some of the plugins manually :(
 */

declare module "@eslint/js" {
  // Why the hell doesn't eslint themselves export their types?
  import type { Linter } from "eslint";

  export const configs: {
    readonly recommended: { readonly rules: Readonly<Linter.RulesRecord> };
    readonly all: { readonly rules: Readonly<Linter.RulesRecord> };
  };
}

declare module "eslint-plugin-import" {
  import type { Linter, Rule } from "eslint";

  export const configs: {
    recommended: { rules: Linter.RulesRecord };
  };
  export const rules: Record<string, Rule.RuleModule>;
}

declare module "express" {
  interface Request extends ExpressRequest {
    session?: Session;
    user?: { id?: string; email?: string; role?: string };
  }
}

declare module "http" {
  interface IncomingMessage extends HttpIncomingMessage {
    session?: Session;
    user?: Session["user"];
  }
}
