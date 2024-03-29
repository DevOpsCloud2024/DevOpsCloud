const Ziggy = {
    url: "http://localhost",
    port: null,
    defaults: {},
    routes: {
        "sanctum.csrf-cookie": { uri: "sanctum/csrf-cookie", methods: ["GET", "HEAD"] },
        "ignition.healthCheck": { uri: "_ignition/health-check", methods: ["GET", "HEAD"] },
        "ignition.executeSolution": { uri: "_ignition/execute-solution", methods: ["POST"] },
        "ignition.updateConfig": { uri: "_ignition/update-config", methods: ["POST"] },
        dashboard: { uri: "dashboard", methods: ["GET", "HEAD"] },
        "posts.index": { uri: "posts", methods: ["GET", "HEAD"] },
        "posts.store": { uri: "posts", methods: ["POST"] },
        "posts.update": {
            uri: "posts/{post}",
            methods: ["PUT", "PATCH"],
            parameters: ["post"],
            bindings: { post: "id" },
        },
        "posts.destroy": {
            uri: "posts/{post}",
            methods: ["DELETE"],
            parameters: ["post"],
            bindings: { post: "id" },
        },
        "courses.index": { uri: "courses", methods: ["GET", "HEAD"] },
        "courses.store": { uri: "courses", methods: ["POST"] },
        "courses.update": {
            uri: "courses/{course}",
            methods: ["PUT", "PATCH"],
            parameters: ["course"],
            bindings: { course: "id" },
        },
        "courses.destroy": {
            uri: "courses/{course}",
            methods: ["DELETE"],
            parameters: ["course"],
            bindings: { course: "id" },
        },
        "profile.edit": { uri: "profile", methods: ["GET", "HEAD"] },
        "profile.update": { uri: "profile", methods: ["PATCH"] },
        "profile.destroy": { uri: "profile", methods: ["DELETE"] },
        register: { uri: "register", methods: ["GET", "HEAD"] },
        login: { uri: "login", methods: ["GET", "HEAD"] },
        "password.request": { uri: "forgot-password", methods: ["GET", "HEAD"] },
        "password.email": { uri: "forgot-password", methods: ["POST"] },
        "password.reset": {
            uri: "reset-password/{token}",
            methods: ["GET", "HEAD"],
            parameters: ["token"],
        },
        "password.store": { uri: "reset-password", methods: ["POST"] },
        "verification.notice": { uri: "verify-email", methods: ["GET", "HEAD"] },
        "verification.verify": {
            uri: "verify-email/{id}/{hash}",
            methods: ["GET", "HEAD"],
            parameters: ["id", "hash"],
        },
        "verification.send": { uri: "email/verification-notification", methods: ["POST"] },
        "password.confirm": { uri: "confirm-password", methods: ["GET", "HEAD"] },
        "password.update": { uri: "password", methods: ["PUT"] },
        logout: { uri: "logout", methods: ["POST"] },
    },
};

if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}

export { Ziggy };
