import { verifyToken } from "./auth";

export function requireAuth(context) {
    const user = verifyToken(context.req);

    if (!user) {
        return {
            redirect: {
                destination: "/dashboard/login",
                permanent: false,
            },
        };
    }

    return { props: { user } };
}
