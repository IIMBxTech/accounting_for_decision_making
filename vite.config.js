import { defineConfig } from 'vite';

export default defineConfig({
  // This ensures all compiled assets (JS, CSS) use the correct absolute path
  // so the page won't break when hosted inside this specific catalog sub-directory.
  base: '/accounting_for_decision_making/',
});
