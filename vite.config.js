import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            { find: "@", replacement: "/src" },
            { find: "@routes", replacement: "/src/router/routes.jsx" },
            { find: "@components", replacement: "/src/components" },
            { find: "@img", replacement: "/src/assets/img" },
        ],
    },
});
